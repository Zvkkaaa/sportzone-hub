import { useMemo } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { usePlayers, useCoaches, useTeams } from "@/hooks/useApi";
import { getImageUrl } from "@/lib/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ChevronLeft } from "lucide-react";

const getTeamKey = (p: any): string =>
  p?.team?.name || p?.team?.team_name || p?.team_name || p?.team_category || p?.category || "";

const TeamDetailPage = () => {
  const { teamId } = useParams();
  const location = useLocation();
  const { t } = useLanguage();
  const { data: teamsData } = useTeams();
  const { data: playersData, isLoading: pl } = usePlayers();
  const { data: coachesData, isLoading: cl } = useCoaches();

  const decodedId = decodeURIComponent(teamId || "");
  const stateName = (location.state as any)?.teamName as string | undefined;

  const team = useMemo(() => {
    return (teamsData || []).find((tm: any) =>
      String(tm.id) === decodedId || String(tm.documentId) === decodedId || (tm.name || tm.team_name) === decodedId
    );
  }, [teamsData, decodedId]);

  const teamName = team?.name || team?.team_name || stateName || decodedId;

  const players = useMemo(
    () => (playersData || []).filter((p: any) => getTeamKey(p) === teamName),
    [playersData, teamName]
  );
  const coaches = useMemo(
    () => (coachesData || []).filter((c: any) => getTeamKey(c) === teamName),
    [coachesData, teamName]
  );

  if (pl || cl) return <div className="pt-20"><LoadingSpinner /></div>;

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4">
        <Link to="/teams" className="inline-flex items-center gap-2 text-foreground/50 hover:text-accent text-xs font-semibold uppercase tracking-widest mb-8 transition-colors">
          <ChevronLeft size={16} /> {t("Багууд руу буцах", "Back to teams")}
        </Link>

        <div className="mb-12 animate-fade-in">
          <p className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-3">{t("Баг", "Team")}</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground">{teamName}</h1>
        </div>

        {/* Coaches */}
        <section className="mb-16">
          <h2 className="text-foreground/40 text-xs font-bold uppercase tracking-widest mb-6">
            {t("Дасгалжуулагчид", "Coaches")}
          </h2>
          {coaches.length === 0 ? (
            <p className="text-foreground/30 text-sm">{t("Дасгалжуулагч алга", "No coaches")}</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {coaches.map((c: any) => (
                <div key={c.id} className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-accent/30 transition-all duration-300 hover:-translate-y-1">
                  <div className="aspect-[3/4] overflow-hidden bg-muted">
                    <img src={getImageUrl(c.image?.url)} alt={t(c.name_mn, c.name_en)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-foreground">{t(c.name_mn, c.name_en)}</h3>
                    <p className="text-accent text-xs uppercase tracking-wider">{t(c.role_mn, c.role_en)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Players */}
        <section>
          <h2 className="text-foreground/40 text-xs font-bold uppercase tracking-widest mb-6">
            {t("Тоглогчид", "Players")}
          </h2>
          {players.length === 0 ? (
            <p className="text-foreground/30 text-sm">{t("Тоглогч алга", "No players")}</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {players.map((p: any) => (
                <div key={p.id} className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-accent/30 transition-all duration-300 hover:-translate-y-1">
                  <div className="aspect-[3/4] overflow-hidden bg-muted relative">
                    <img src={getImageUrl(p.image?.url)} alt={t(p.name_mn, p.name_en)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                    {p.number && (
                      <span className="absolute top-3 right-3 bg-accent text-accent-foreground text-sm font-black w-9 h-9 rounded-full flex items-center justify-center">{p.number}</span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-foreground">{t(p.name_mn, p.name_en)}</h3>
                    <p className="text-accent text-xs uppercase tracking-wider">{t(p.position_mn, p.position_en)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default TeamDetailPage;
