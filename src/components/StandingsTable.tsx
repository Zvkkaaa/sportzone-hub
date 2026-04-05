import { useLanguage } from "@/context/LanguageContext";
import { useStandings } from "@/hooks/useApi";

const fallbackStandings = [
  { pos: 1, team: "Pirates", played: 20, wins: 16, draws: 2, losses: 2, points: 50 },
  { pos: 2, team: "Thunder United", played: 20, wins: 14, draws: 4, losses: 2, points: 46 },
  { pos: 3, team: "Storm City", played: 20, wins: 13, draws: 3, losses: 4, points: 42 },
  { pos: 4, team: "Eagle Warriors", played: 20, wins: 11, draws: 5, losses: 4, points: 38 },
  { pos: 5, team: "Blue Wolves", played: 20, wins: 10, draws: 4, losses: 6, points: 34 },
  { pos: 6, team: "Golden Stars", played: 20, wins: 8, draws: 6, losses: 6, points: 30 },
  { pos: 7, team: "Red Dragons", played: 20, wins: 6, draws: 5, losses: 9, points: 23 },
  { pos: 8, team: "Silver Falcons", played: 20, wins: 4, draws: 3, losses: 13, points: 15 },
];

const StandingsTable = () => {
  const { t } = useLanguage();
  const { data: cmsData } = useStandings();

  // Map CMS data if available, otherwise use fallback
  const standings = cmsData && cmsData.length > 0
    ? cmsData.map((item: any, i: number) => ({
        pos: item.position || i + 1,
        team: item.team_name || item.team || "",
        played: item.played || 0,
        wins: item.wins || 0,
        draws: item.draws || 0,
        losses: item.losses || 0,
        points: item.points || 0,
      }))
    : fallbackStandings;

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted">
            <th className="px-4 py-3 text-left text-muted-foreground font-semibold text-xs uppercase tracking-wider">#</th>
            <th className="px-4 py-3 text-left text-muted-foreground font-semibold text-xs uppercase tracking-wider">{t("Баг", "Team")}</th>
            <th className="px-4 py-3 text-center text-muted-foreground font-semibold text-xs uppercase tracking-wider">{t("Тоглосон", "P")}</th>
            <th className="px-4 py-3 text-center text-muted-foreground font-semibold text-xs uppercase tracking-wider">{t("Хожил", "W")}</th>
            <th className="px-4 py-3 text-center text-muted-foreground font-semibold text-xs uppercase tracking-wider">{t("Тэнцсэн", "D")}</th>
            <th className="px-4 py-3 text-center text-muted-foreground font-semibold text-xs uppercase tracking-wider">{t("Хожигдсон", "L")}</th>
            <th className="px-4 py-3 text-center text-muted-foreground font-semibold text-xs uppercase tracking-wider">{t("Оноо", "Pts")}</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team: any) => (
            <tr
              key={team.pos}
              className={`border-t border-border transition-colors hover:bg-muted/50 ${
                team.pos <= 3 ? "bg-accent/5" : ""
              }`}
            >
              <td className="px-4 py-3">
                {team.pos <= 3 ? (
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-accent text-accent-foreground text-xs font-black">
                    {team.pos}
                  </span>
                ) : (
                  <span className="text-muted-foreground">{team.pos}</span>
                )}
              </td>
              <td className={`px-4 py-3 font-semibold ${team.team === "Pirates" ? "text-accent" : "text-foreground"}`}>
                {team.team}
              </td>
              <td className="px-4 py-3 text-center text-muted-foreground">{team.played}</td>
              <td className="px-4 py-3 text-center text-foreground">{team.wins}</td>
              <td className="px-4 py-3 text-center text-muted-foreground">{team.draws}</td>
              <td className="px-4 py-3 text-center text-muted-foreground">{team.losses}</td>
              <td className="px-4 py-3 text-center font-bold text-foreground">{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StandingsTable;
