import { useState, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { usePlayers, useTeams } from "@/hooks/useApi";
import { getImageUrl, pickImage } from "@/lib/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import piratesLogo from "@/assets/pirates-logo.png";
import { ChevronLeft, ChevronRight } from "lucide-react";

const getTeamKey = (p: any): string => {
  return (
    p?.team?.name ||
    p?.team?.team_name ||
    p?.team_name ||
    p?.team_category ||
    p?.category ||
    ""
  );
};

const PlayersPage = () => {
  const { t } = useLanguage();
  const { data: playersData, isLoading, error } = usePlayers();
  const { data: teamsData } = useTeams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTeam, setActiveTeam] = useState<string>("all");

  const players = playersData || [];

  // Build team list: prefer CMS teams, else derive from players
  const teams = useMemo(() => {
    if (teamsData && teamsData.length > 0) {
      return teamsData.map((tm: any) => tm.name || tm.team_name).filter(Boolean);
    }
    const set = new Set<string>();
    players.forEach((p: any) => {
      const k = getTeamKey(p);
      if (k) set.add(k);
    });
    return Array.from(set);
  }, [teamsData, players]);

  const filtered = useMemo(() => {
    if (activeTeam === "all") return players;
    return players.filter((p: any) => getTeamKey(p) === activeTeam);
  }, [players, activeTeam]);

  const player = filtered[currentIndex];

  const prev = () => setCurrentIndex((i) => (i > 0 ? i - 1 : filtered.length - 1));
  const next = () => setCurrentIndex((i) => (i < filtered.length - 1 ? i + 1 : 0));

  const switchTeam = (key: string) => {
    setActiveTeam(key);
    setCurrentIndex(0);
  };

  if (isLoading) return <div className="pt-20"><LoadingSpinner /></div>;
  if (error || players.length === 0) {
    return (
      <div className="pt-20 text-center py-20">
        <p className="text-muted-foreground">{t("Тоглогчдын мэдээлэл олдсонгүй", "No player data found")}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
        <img src={piratesLogo} alt="" className="w-[600px] h-[600px] object-contain" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-8">
        <div className="rounded-[2rem] border border-white/8 bg-gradient-to-br from-card via-card to-background p-6 md:p-8 shadow-[0_20px_60px_rgba(2,6,23,0.22)]">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-6">
            <div className="max-w-2xl">
              <p className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-3">
                {t("Roster", "Roster")}
              </p>
              <h1 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tight text-foreground">
                {t("Тоглогчид", "Players")}
              </h1>
              <p className="text-foreground/60 max-w-xl mt-4">
                {t(
                  "Jersey number, position, height, age and nationality-ийг ашиглан roster-ээ хурдан шүүж үзнэ.",
                  "Filter the roster quickly by jersey number, position, height, age and nationality."
                )}
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 backdrop-blur">
                <p className="text-[10px] uppercase tracking-[0.35em] text-foreground/40">Players</p>
                <p className="font-display text-2xl font-bold text-foreground">{players.length}</p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 backdrop-blur">
                <p className="text-[10px] uppercase tracking-[0.35em] text-foreground/40">Teams</p>
                <p className="font-display text-2xl font-bold text-foreground">{teams.length}</p>
              </div>
            </div>
          </div>

          {teams.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button
                  onClick={() => switchTeam("all")}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest transition-all ${
                    activeTeam === "all"
                      ? "bg-accent text-accent-foreground"
                      : "border border-white/8 text-foreground/55 hover:text-foreground hover:border-white/18 bg-white/5 backdrop-blur"
                  }`}
                >
                  {t("Бүгд", "All")}
                </button>
              {teams.map((name: string) => (
                <button
                  key={name}
                  onClick={() => switchTeam(name)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest transition-all ${
                    activeTeam === name
                      ? "bg-accent text-accent-foreground"
                      : "border border-white/8 text-foreground/55 hover:text-foreground hover:border-white/18 bg-white/5 backdrop-blur"
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {filtered.length === 0 || !player ? (
        <div className="relative z-10 text-center py-32 text-foreground/40">
          {t("Энэ багт тоглогч алга", "No players in this team")}
        </div>
      ) : (
        <>
          <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col lg:flex-row items-center gap-8 min-h-[calc(100vh-12rem)]">
            <div className="flex-1 flex justify-center">
              <div className="relative w-64 md:w-80 lg:w-96">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-border bg-card">
                  <img
                    src={getImageUrl(pickImage(player.photo) || pickImage(player.image))}
                    alt={t(player.name_mn, player.name_en)}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 text-center lg:text-left">
              {getTeamKey(player) && (
                <p className="text-accent text-xs font-bold uppercase tracking-widest mb-2">
                  {getTeamKey(player)}
                </p>
              )}
              <p className="text-foreground/40 text-sm uppercase tracking-widest mb-1">
                {t(player.position_mn, player.position_en)}
              </p>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground mb-4">
                {t(player.name_mn, player.name_en)}
              </h1>
              {(player.bio_mn || player.bio_en) && (
                <p className="text-foreground/60 text-sm leading-relaxed mb-6 max-w-lg">
                  {t(player.bio_mn, player.bio_en)}
                </p>
              )}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
                {player.height && (
                  <div>
                    <span className="text-foreground/40 text-xs uppercase tracking-wider">{t("Өндөр", "Height")}:</span>
                    <span className="text-accent font-bold ml-2">{player.height}</span>
                  </div>
                )}
                {player.weight && (
                  <div>
                    <span className="text-foreground/40 text-xs uppercase tracking-wider">{t("Жин", "Weight")}:</span>
                    <span className="text-accent font-bold ml-2">{player.weight}</span>
                  </div>
                )}
              </div>

              {player.number && (
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <span className="text-foreground/20 text-6xl font-black">#</span>
                  <span className="text-accent text-7xl font-black">{player.number}</span>
                </div>
              )}
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-center gap-4 pb-8">
            <button onClick={prev} className="flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground/60 hover:text-foreground hover:border-foreground/30 transition-all">
              <ChevronLeft size={18} /> {t("Өмнөх", "Prev")}
            </button>
            <span className="text-foreground/40 text-sm font-mono">{currentIndex + 1} / {filtered.length}</span>
            <button onClick={next} className="flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground/60 hover:text-foreground hover:border-foreground/30 transition-all">
              {t("Дараах", "Next")} <ChevronRight size={18} />
            </button>
          </div>

          <div className="relative z-10 container mx-auto px-4 pb-12">
            <div className="flex gap-2 overflow-x-auto pb-4 justify-center">
              {filtered.map((p: any, i: number) => (
                <button
                  key={p.id}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                    i === currentIndex ? "border-accent scale-110" : "border-border/50 opacity-50 hover:opacity-80"
                  }`}
                >
                  <img src={getImageUrl(pickImage(p.photo) || pickImage(p.image))} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PlayersPage;
