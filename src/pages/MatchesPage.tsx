import { useMemo, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useMatches, useTeams } from "@/hooks/useApi";
import { teamName } from "@/lib/teamHelpers";
import MatchRow from "@/components/MatchRow";
import LoadingSpinner from "@/components/LoadingSpinner";

const MatchesPage = () => {
  const { t } = useLanguage();
  const { data, isLoading } = useMatches();
  const { data: teamsData } = useTeams();
  const [filter, setFilter] = useState<string>("all");
  const [view, setView] = useState<"upcoming" | "results">("upcoming");

  const matches = useMemo(() => {
    const list = data || [];
    return filter === "all"
      ? list
      : list.filter((m: any) => (m.team?.name || m.team?.team_name || "") === filter);
  }, [data, filter]);

  const upcoming = matches.filter((m: any) => (m.status || (m.pirates_score == null && m.scoreUs == null ? "upcoming" : "")) === "upcoming");
  const results = matches.filter((m: any) => m.status !== "upcoming" && (m.pirates_score != null || m.scoreUs != null));
  const list = view === "upcoming" ? upcoming : results;

  return (
    <div className="pt-24 min-h-screen">
      <div className="container mx-auto px-4 mb-10">
        <p className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-3">{t("Тэмцээн", "Games")}</p>
        <h1 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tight text-foreground">{t("Хуваарь & Үр дүн", "Schedule & Results")}</h1>
      </div>

      <div className="container mx-auto px-4 mb-8 flex flex-wrap items-center gap-4 justify-between">
        <div className="flex gap-1 bg-card border border-border rounded-full p-1">
          {(["upcoming", "results"] as const).map((v) => (
            <button key={v} onClick={() => setView(v)} className={`text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full transition-all ${
              view === v ? "bg-accent text-accent-foreground" : "text-foreground/50 hover:text-foreground"
            }`}>
              {v === "upcoming" ? t("Удахгүй", "Upcoming") : t("Үр дүн", "Results")}
            </button>
          ))}
        </div>

        {(teamsData || []).length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setFilter("all")} className={`text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full transition-all ${
              filter === "all" ? "bg-accent text-accent-foreground" : "border border-border text-foreground/50 hover:text-foreground"
            }`}>
              {t("Бүгд", "All")}
            </button>
            {(teamsData || []).map((tm: any) => {
              const n = teamName(tm);
              return (
                <button key={tm.id} onClick={() => setFilter(n)} className={`text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full transition-all ${
                  filter === n ? "bg-accent text-accent-foreground" : "border border-border text-foreground/50 hover:text-foreground"
                }`}>
                  {n}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 pb-16">
        {isLoading ? <LoadingSpinner /> : list.length === 0 ? (
          <p className="text-center text-foreground/40 py-20">{t("Мэдээлэл алга", "Nothing here yet")}</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {list.map((m: any) => <MatchRow key={m.id} match={m} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchesPage;
