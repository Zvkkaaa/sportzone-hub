import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCoaches } from "@/hooks/useApi";
import { getImageUrl } from "@/lib/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import piratesLogo from "@/assets/pirates-logo.png";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CoachesPage = () => {
  const { t } = useLanguage();
  const { data, isLoading, error } = useCoaches();
  const [currentIndex, setCurrentIndex] = useState(0);

  const coaches = data || [];
  const coach = coaches[currentIndex];

  const prev = () => setCurrentIndex((i) => (i > 0 ? i - 1 : coaches.length - 1));
  const next = () => setCurrentIndex((i) => (i < coaches.length - 1 ? i + 1 : 0));

  if (isLoading) return <div className="pt-20"><LoadingSpinner /></div>;
  if (error || coaches.length === 0) {
    return (
      <div className="pt-20 text-center py-20">
        <p className="text-muted-foreground">{t("Дасгалжуулагчийн мэдээлэл олдсонгүй", "No coach data found")}</p>
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
        {/* Coach Image */}
        <div className="flex-1 flex justify-center animate-fade-in">
          <div className="relative w-64 md:w-80 lg:w-96">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden border-2 border-border bg-card shadow-2xl shadow-accent/5">
              <img
                src={getImageUrl(coach.image?.url)}
                alt={t(coach.name_mn, coach.name_en)}
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>
          </div>
        </div>

        {/* Coach Info */}
        <div className="flex-1 text-center lg:text-left animate-slide-up">
          <p className="text-accent text-sm font-bold uppercase tracking-widest mb-2">
            {t(coach.role_mn, coach.role_en) || t("Дасгалжуулагч", "Coach")}
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground mb-4">
            {t(coach.name_mn, coach.name_en)}
          </h1>
          {(coach.bio_mn || coach.bio_en) && (
            <p className="text-foreground/60 text-sm leading-relaxed mb-6 max-w-lg">
              {t(coach.bio_mn, coach.bio_en)}
            </p>
          )}
          {coach.experience && (
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              <div>
                <span className="text-foreground/40 text-xs uppercase tracking-wider">{t("Туршлага", "Experience")}:</span>
                <span className="text-accent font-bold ml-2">{coach.experience}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="relative z-10 flex items-center justify-center gap-4 pb-12">
        <button onClick={prev} className="flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground/60 hover:text-foreground hover:border-accent/30 transition-all duration-300">
          <ChevronLeft size={18} /> {t("Өмнөх", "Prev")}
        </button>
        <img src={piratesLogo} alt="" className="w-10 h-10 object-contain opacity-40" />
        <button onClick={next} className="flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground/60 hover:text-foreground hover:border-accent/30 transition-all duration-300">
          {t("Дараах", "Next")} <ChevronRight size={18} />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="relative z-10 container mx-auto px-4 pb-12">
        <div className="flex gap-2 overflow-x-auto pb-4 justify-center">
          {coaches.map((c: any, i: number) => (
            <button
              key={c.id}
              onClick={() => setCurrentIndex(i)}
              className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 flex-shrink-0 ${
                i === currentIndex ? "border-accent scale-110 shadow-lg shadow-accent/20" : "border-border/50 opacity-50 hover:opacity-80"
              }`}
            >
              <img src={getImageUrl(c.image?.url)} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoachesPage;