import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { usePlayers } from "@/hooks/useApi";
import { getImageUrl } from "@/lib/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import piratesLogo from "@/assets/pirates-logo.png";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PlayersPage = () => {
  const { t } = useLanguage();
  const { data, isLoading, error } = usePlayers();
  const [currentIndex, setCurrentIndex] = useState(0);

  const players = data || [];
  const player = players[currentIndex];

  const prev = () => setCurrentIndex((i) => (i > 0 ? i - 1 : players.length - 1));
  const next = () => setCurrentIndex((i) => (i < players.length - 1 ? i + 1 : 0));

  if (isLoading) return <div className="pt-20"><LoadingSpinner /></div>;
  if (error || players.length === 0) {
    return (
      <div className="pt-20 text-center py-20">
        <p className="text-muted-foreground">{t("Тоглогчдын мэдээлэл олдсонгүй", "No player data found")}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-navy pt-16">
      {/* Background logo watermark */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none opacity-5">
        <img src={piratesLogo} alt="" className="w-[600px] h-[600px] object-contain" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col lg:flex-row items-center gap-8 min-h-[calc(100vh-4rem)]">
        {/* Player Image */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-64 md:w-80 lg:w-96">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden border-2 border-border bg-card">
              <img
                src={getImageUrl(player.image?.url)}
                alt={t(player.name_mn, player.name_en)}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Player Info */}
        <div className="flex-1 text-center lg:text-left">
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

      {/* Navigation */}
      <div className="relative z-10 flex items-center justify-center gap-4 pb-12">
        <button onClick={prev} className="flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground/60 hover:text-foreground hover:border-foreground/30 transition-all">
          <ChevronLeft size={18} /> {t("Өмнөх", "Prev")}
        </button>
        <img src={piratesLogo} alt="" className="w-10 h-10 object-contain opacity-40" />
        <button onClick={next} className="flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground/60 hover:text-foreground hover:border-foreground/30 transition-all">
          {t("Дараах", "Next")} <ChevronRight size={18} />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="relative z-10 container mx-auto px-4 pb-12">
        <div className="flex gap-2 overflow-x-auto pb-4 justify-center">
          {players.map((p: any, i: number) => (
            <button
              key={p.id}
              onClick={() => setCurrentIndex(i)}
              className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                i === currentIndex ? "border-accent scale-110" : "border-border/50 opacity-50 hover:opacity-80"
              }`}
            >
              <img src={getImageUrl(p.image?.url)} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayersPage;
