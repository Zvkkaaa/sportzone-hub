import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useTeams, usePlayers } from "@/hooks/useApi";
import { getImageUrl } from "@/lib/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import piratesLogo from "@/assets/pirates-logo.png";

const getTeamKey = (p: any): string =>
  p?.team?.name || p?.team?.team_name || p?.team_name || p?.team_category || p?.category || "";

const TeamsPage = () => {
  const { t } = useLanguage();
  const { data: teamsData, isLoading } = useTeams();
  const { data: playersData } = usePlayers();

  const players = playersData || [];
  let teams: any[] = teamsData || [];

  // Fallback: derive teams from players if CMS has none
  if (teams.length === 0 && players.length > 0) {
    const map = new Map<string, any>();
    players.forEach((p: any) => {
      const k = getTeamKey(p);
      if (k && !map.has(k)) map.set(k, { id: k, name: k, image: p.image });
    });
    teams = Array.from(map.values());
  }

  if (isLoading) return <div className="pt-20"><LoadingSpinner /></div>;

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <p className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-3">
            {t("Манай", "Our")}
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground">
            {t("Багууд", "Teams")}
          </h1>
        </div>

        {teams.length === 0 ? (
          <p className="text-center text-foreground/40 py-20">
            {t("Багийн мэдээлэл олдсонгүй", "No teams found")}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team: any, i: number) => {
              const name = team.name || team.team_name || team.title || `Team ${i + 1}`;
              const id = team.id || team.documentId || name;
              const img = team.image?.url || team.logo?.url;
              return (
                <Link
                  key={id}
                  to={`/teams/${encodeURIComponent(id)}`}
                  state={{ teamName: name }}
                  className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-accent/40 transition-all duration-500 hover:-translate-y-1 animate-slide-up"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                    <img
                      src={img ? getImageUrl(img) : piratesLogo}
                      alt={name}
                      className={`w-full h-full ${img ? "object-cover" : "object-contain p-12 opacity-70"} group-hover:scale-105 transition-transform duration-700`}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  </div>
                  <div className="p-5 flex items-center justify-between">
                    <div>
                      <p className="text-foreground/40 text-[10px] uppercase tracking-widest">{t("Баг", "Team")}</p>
                      <h3 className="text-foreground text-xl font-black tracking-tight">{name}</h3>
                    </div>
                    <span className="text-accent text-sm font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamsPage;
