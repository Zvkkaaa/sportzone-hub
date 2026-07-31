import { useLanguage } from "@/context/LanguageContext";
import { useStandings } from "@/hooks/useApi";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Trophy } from "lucide-react";

const StandingsTable = () => {
  const { t } = useLanguage();
  const { data: cmsData, isLoading } = useStandings();

  const standings = cmsData && cmsData.length > 0
    ? cmsData.map((item: any, i: number) => ({
        pos: item.position || i + 1,
        team: item.team_name || item.team || "",
        played: item.played || 0,
        wins: item.wins || 0,
        losses: item.losses || 0,
        points: item.points || 0,
      }))
    : [];

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card/80 backdrop-blur-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border/80">
            <th className="px-4 py-4 text-left text-foreground/30 font-semibold text-xs uppercase tracking-wider">#</th>
            <th className="px-4 py-4 text-left text-foreground/30 font-semibold text-xs uppercase tracking-wider">{t("Баг", "Team")}</th>
            <th className="px-4 py-4 text-center text-foreground/30 font-semibold text-xs uppercase tracking-wider">{t("Тоглосон", "P")}</th>
            <th className="px-4 py-4 text-center text-foreground/30 font-semibold text-xs uppercase tracking-wider">{t("Хожил", "W")}</th>
            <th className="px-4 py-4 text-center text-foreground/30 font-semibold text-xs uppercase tracking-wider">{t("Хожигдсон", "L")}</th>
            <th className="px-4 py-4 text-center text-foreground/30 font-semibold text-xs uppercase tracking-wider">{t("Оноо", "Pts")}</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team: any) => (
            <tr
              key={team.pos}
              className={`border-t border-border/30 transition-all duration-300 hover:bg-accent/5 ${
                team.team === "Pirates" ? "bg-accent/8" : ""
              }`}
            >
              <td className="px-4 py-3.5">
                {team.pos <= 3 ? (
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-accent text-accent-foreground text-xs font-black">
                    {team.pos === 1 ? <Trophy size={14} /> : team.pos}
                  </span>
                ) : (
                  <span className="text-foreground/40 pl-2">{team.pos}</span>
                )}
              </td>
              <td className={`px-4 py-3.5 font-bold ${team.team === "Pirates" ? "text-accent" : "text-foreground"}`}>
                {team.team}
              </td>
              <td className="px-4 py-3.5 text-center text-foreground/50">{team.played}</td>
              <td className="px-4 py-3.5 text-center text-foreground font-semibold">{team.wins}</td>
              <td className="px-4 py-3.5 text-center text-foreground/50">{team.losses}</td>
              <td className="px-4 py-3.5 text-center font-black text-foreground">{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {standings.length === 0 && (
        <p className="px-4 py-8 text-center text-foreground/40 text-sm">
          {t("Одоогоор Strapi дээр standings өгөгдөл алга", "No standings data is available in Strapi yet")}
        </p>
      )}
    </div>
  );
};

export default StandingsTable;
