import { useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTeams, usePlayers, useCoaches } from "@/hooks/useApi";
import { teamName, playerTeamName, coachTeamName } from "@/lib/teamHelpers";
import TeamCard from "@/components/TeamCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ChevronRight } from "lucide-react";

const TeamsPage = () => {
  const { t } = useLanguage();
  const { data: teamsData, isLoading } = useTeams();
  const { data: playersData } = usePlayers();
  const { data: coachesData } = useCoaches();

  const players = playersData || [];
  const coaches = coachesData || [];

  // Build list of teams. If CMS empty, derive from players.
  const teams = useMemo(() => {
    if (teamsData && teamsData.length > 0) return teamsData;
    const map = new Map<string, any>();
    players.forEach((p: any) => {
      const k = playerTeamName(p);
      if (k && !map.has(k)) map.set(k, { id: k, name: k });
    });
    return Array.from(map.values());
  }, [teamsData, players]);

  const enriched = useMemo(() => {
    return teams.map((tm: any) => {
      const n = teamName(tm);
      const playerCount = players.filter((p: any) => playerTeamName(p) === n).length;
      const headCoach = coaches.find((c: any) => coachTeamName(c) === n);
      const coachName = headCoach ? (headCoach.name_mn || headCoach.name_en || headCoach.name || "") : "";
      return { team: tm, playerCount, coachName };
    });
  }, [teams, players, coaches]);

  if (isLoading) return <div className="pt-20"><LoadingSpinner /></div>;

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="rounded-[2rem] border border-white/8 bg-gradient-to-br from-card via-card to-background p-6 md:p-10 mb-12 shadow-[0_20px_60px_rgba(2,6,23,0.22)] animate-fade-in">
          <p className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-3">
            {t("Манай", "Our")}
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              <h1 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tight text-foreground">
                {t("Багууд", "Teams")}
              </h1>
              <p className="text-foreground/60 max-w-xl mt-4">
                {t(
                  "Эрэгтэй, эмэгтэй, U21, U19, U17, U15 болон академийн бүх багууд — нэг дороос.",
                  "Men's, Women's, U21, U19, U17, U15 and Academy squads — all in one place."
                )}
              </p>
            </div>
            <Link to="/players" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent hover:gap-3 transition-all">
              {t("Тоглогчид", "Players")} <ChevronRight size={14} />
            </Link>
          </div>
        </div>

        {enriched.length === 0 ? (
          <p className="text-center text-foreground/40 py-20">
            {t("Багийн мэдээлэл олдсонгүй", "No teams found")}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {enriched.map(({ team, playerCount, coachName }, i) => (
              <TeamCard key={team.id || i} team={team} playerCount={playerCount} coachName={coachName} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamsPage;
