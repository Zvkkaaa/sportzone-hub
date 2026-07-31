import { useMemo, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useMatches, useTeams } from "@/hooks/useApi";
import { teamName } from "@/lib/teamHelpers";
import MatchRow from "@/components/MatchRow";
import LoadingSpinner from "@/components/LoadingSpinner";
import { CalendarClock, Trophy, Ticket, ShieldCheck } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

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

  const stats = [
    { label: t("Upcoming", "Upcoming"), value: upcoming.length, icon: CalendarClock },
    { label: t("Results", "Results"), value: results.length, icon: Trophy },
    { label: t("Teams", "Teams"), value: (teamsData || []).length, icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="relative pt-28 pb-14 overflow-hidden">
        <div className="absolute inset-0 gradient-navy" />
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-overlay" />
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-10 shadow-[0_20px_60px_rgba(2,6,23,0.24)]">
            <p className="text-accent text-xs font-bold uppercase tracking-[0.35em] mb-3">{t("Тэмцээн", "Games")}</p>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div className="max-w-3xl">
                <h1 className="font-display text-5xl md:text-[5.5rem] font-bold uppercase tracking-tighter leading-none text-white">
                  {t("Хуваарь & Үр дүн", "Schedule & Results")}
                </h1>
                <p className="text-white/65 max-w-2xl mt-5 text-sm md:text-base leading-relaxed">
                  {t(
                    "Arena-ready fixtures, final scores and home/away labels built for a modern basketball club site.",
                    "Arena-ready fixtures, final scores and home/away labels built for a modern basketball club site."
                  )}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {stats.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="rounded-2xl border border-white/8 bg-white/5 backdrop-blur px-4 py-4 min-w-[120px]">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-[10px] uppercase tracking-[0.35em] text-white/40">{item.label}</p>
                        <Icon size={14} className="text-accent" />
                      </div>
                      <p className="font-display text-3xl font-bold text-white">{item.value}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 mb-8">
        <div className="rounded-[1.75rem] border border-white/8 bg-card/85 backdrop-blur-xl p-4 md:p-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between shadow-[0_18px_45px_rgba(2,6,23,0.12)]">
          <div className="flex gap-1 bg-white/5 border border-white/8 rounded-full p-1 self-start">
            {(["upcoming", "results"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`text-xs font-bold uppercase tracking-[0.3em] px-4 py-2 rounded-full transition-all ${
                  view === v ? "bg-accent text-accent-foreground" : "text-foreground/55 hover:text-foreground"
                }`}
              >
                {v === "upcoming" ? t("Удахгүй", "Upcoming") : t("Үр дүн", "Results")}
              </button>
            ))}
          </div>

          {(teamsData || []).length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setFilter("all")} className={`text-xs font-bold uppercase tracking-[0.28em] px-3 py-1.5 rounded-full transition-all ${
                filter === "all" ? "bg-accent text-accent-foreground" : "border border-white/8 text-foreground/55 hover:text-foreground bg-white/5"
              }`}>
                {t("Бүгд", "All")}
              </button>
              {(teamsData || []).map((tm: any) => {
                const n = teamName(tm);
                return (
                  <button key={tm.id} onClick={() => setFilter(n)} className={`text-xs font-bold uppercase tracking-[0.28em] px-3 py-1.5 rounded-full transition-all ${
                    filter === n ? "bg-accent text-accent-foreground" : "border border-white/8 text-foreground/55 hover:text-foreground bg-white/5"
                  }`}>
                    {n}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        {isLoading ? (
          <LoadingSpinner />
        ) : list.length === 0 ? (
          <div className="rounded-[2rem] border border-white/8 bg-card/80 p-10 text-center shadow-[0_18px_45px_rgba(2,6,23,0.12)]">
            <Ticket size={30} className="mx-auto text-accent mb-3" />
            <p className="text-foreground/45">{t("Мэдээлэл алга", "Nothing here yet")}</p>
          </div>
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
