import { useLanguage } from "@/context/LanguageContext";
import { useSponsors } from "@/hooks/useApi";
import { getImageUrl, pickImage } from "@/lib/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Handshake, Shield, BadgeCheck } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const SponsorsPage = () => {
  const { t } = useLanguage();
  const { data, isLoading } = useSponsors();
  const sponsors = data || [];

  return (
    <div className="min-h-screen bg-background">
      <section className="relative pt-28 pb-14 overflow-hidden">
        <div className="absolute inset-0 gradient-navy" />
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-12 mix-blend-overlay" />
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-10 shadow-[0_20px_60px_rgba(2,6,23,0.22)]">
            <p className="text-accent text-xs font-bold uppercase tracking-[0.35em] mb-3">{t("Хамтрагч", "Partners")}</p>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div className="max-w-3xl">
                <h1 className="font-display text-5xl md:text-[5.5rem] font-bold uppercase tracking-tighter leading-none text-white">
                  {t("Спонсорууд", "Sponsors")}
                </h1>
                <p className="text-white/65 max-w-2xl mt-5 text-sm md:text-base leading-relaxed">
                  {t(
                    "Pirates Basketball Club-ийг талбай дээр ч, талбайн гадна ч дэмжиж буй брэндүүдийн premium wall.",
                    "A premium wall of brands supporting Pirates Basketball Club on and off the court."
                  )}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: t("Partners", "Partners"), value: sponsors.length, icon: Handshake },
                  { label: t("Coverage", "Coverage"), value: Math.max(sponsors.length * 2, 0), icon: Shield },
                  { label: t("Trusted", "Trusted"), value: sponsors.length > 0 ? "Yes" : "0", icon: BadgeCheck },
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="rounded-2xl border border-white/8 bg-white/5 backdrop-blur px-4 py-4 min-w-[120px]">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-[10px] uppercase tracking-[0.35em] text-white/40">{stat.label}</p>
                        <Icon size={14} className="text-accent" />
                      </div>
                      <p className="font-display text-3xl font-bold text-white">{stat.value}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-20">
        {isLoading ? (
          <LoadingSpinner />
        ) : sponsors.length === 0 ? (
          <div className="rounded-[2rem] border border-white/8 bg-card/80 p-10 text-center shadow-[0_18px_45px_rgba(2,6,23,0.12)]">
            <p className="text-foreground/40">{t("Спонсор алга", "No sponsors yet")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {sponsors.map((s: any, i: number) => {
              const logo = pickImage(s.logo) || pickImage(s.image);
              return (
                <a
                  key={s.id}
                  href={s.url || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative overflow-hidden rounded-[1.5rem] border border-white/8 bg-card/90 p-6 flex items-center justify-center min-h-[170px] hover:border-accent/35 hover:-translate-y-1.5 transition-all animate-fade-in shadow-[0_16px_40px_rgba(2,6,23,0.12)]"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {logo ? (
                    <img
                      src={getImageUrl(logo)}
                      alt={s.name}
                      className="max-h-16 object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all relative z-10"
                    />
                  ) : (
                    <span className="font-display text-xl uppercase text-foreground/60 group-hover:text-accent transition-colors relative z-10">
                      {s.name}
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SponsorsPage;
