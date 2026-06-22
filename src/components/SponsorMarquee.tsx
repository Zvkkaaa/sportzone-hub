import { useSponsors } from "@/hooks/useApi";
import { getImageUrl, pickImage } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";

const SponsorMarquee = () => {
  const { t } = useLanguage();
  const { data } = useSponsors();
  const list = data || [];
  if (list.length === 0) return null;
  const doubled = [...list, ...list];

  return (
    <section className="py-10 border-y border-border/60 bg-card/30 overflow-hidden">
      <p className="text-center text-foreground/30 text-[10px] font-bold uppercase tracking-[0.3em] mb-6">
        {t("Хамтрагч", "Official partners")}
      </p>
      <div className="relative">
        <div className="flex gap-16 items-center animate-marquee whitespace-nowrap">
          {doubled.map((s: any, i: number) => {
            const logo = pickImage(s.logo) || pickImage(s.image);
            return (
              <a key={`${s.id}-${i}`} href={s.url || "#"} target="_blank" rel="noreferrer" className="shrink-0 grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all">
                {logo ? (
                  <img src={getImageUrl(logo)} alt={s.name} className="h-10 object-contain" />
                ) : (
                  <span className="font-display text-xl text-foreground/40">{s.name}</span>
                )}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SponsorMarquee;
