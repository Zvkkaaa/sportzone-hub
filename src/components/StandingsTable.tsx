import { useLanguage } from "@/context/LanguageContext";

const standings = [
  { pos: 1, team: "Pirates FC", played: 20, wins: 16, draws: 2, losses: 2, points: 50 },
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

  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-navy text-navy-foreground">
            <th className="px-4 py-3 text-left">#</th>
            <th className="px-4 py-3 text-left">{t("Баг", "Team")}</th>
            <th className="px-4 py-3 text-center">{t("Тоглосон", "P")}</th>
            <th className="px-4 py-3 text-center">{t("Хожил", "W")}</th>
            <th className="px-4 py-3 text-center">{t("Тэнцсэн", "D")}</th>
            <th className="px-4 py-3 text-center">{t("Хожигдсон", "L")}</th>
            <th className="px-4 py-3 text-center font-bold">{t("Оноо", "Pts")}</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team, i) => (
            <tr
              key={team.pos}
              className={`border-b border-border transition-colors hover:bg-muted ${
                i % 2 === 0 ? "bg-card" : "bg-secondary"
              } ${team.pos <= 3 ? "font-semibold" : ""}`}
            >
              <td className="px-4 py-3">
                {team.pos <= 3 ? (
                  <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                    team.pos === 1 ? "bg-sport-gold text-foreground" :
                    team.pos === 2 ? "bg-muted-foreground/30 text-foreground" :
                    "bg-sport-red/20 text-sport-red"
                  }`}>
                    {team.pos}
                  </span>
                ) : team.pos}
              </td>
              <td className="px-4 py-3">{team.team}</td>
              <td className="px-4 py-3 text-center">{team.played}</td>
              <td className="px-4 py-3 text-center">{team.wins}</td>
              <td className="px-4 py-3 text-center">{team.draws}</td>
              <td className="px-4 py-3 text-center">{team.losses}</td>
              <td className="px-4 py-3 text-center font-bold">{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StandingsTable;
