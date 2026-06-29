import { useLanguage } from "@/context/LanguageContext";
import { useSponsors } from "@/hooks/useApi";
import { getImageUrl, pickImage } from "@/lib/api";
import LoadingSpinner from "@/components/LoadingSpinner";

const SponsorsPage = () => {
  const { t } = useLanguage();
  const { data, isLoading } = useSponsors();
  const sponsors = data || [];

  return (
    <div className="pt-24 min-h-screen">
      <div className="container mx-auto px-4 mb-12">
        <p className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-3">{t("Хамтрагч", "Partners")}</p>
        <h1 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tight text-foreground">
          {t("Спонсорууд", "Sponsors")}
        </h1>
        <p className="text-foreground/50 max-w-xl mt-4">
          {t(
            "Pirates сагсан бөмбөгийн клубыг дэмжиж буй хамтрагч брэндүүд.",
            "The brands powering Pirates Basketball Club on and off the court."
          )}
        </p>
      </div>

      <div className="container mx-auto px-4 pb-20">
        {isLoading ? <LoadingSpinner /> : sponsors.length === 0 ? (
          <p className="text-center text-foreground/40 py-20">{t("Спонсор алга", "No sponsors yet")}</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sponsors.map((s: any, i: number) => {
              const logo = pickImage(s.logo) || pickImage(s.image);
              return (
                <a
                  key={s.id}
                  href={s.url || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="group bg-card rounded-2xl border border-border p-8 flex items-center justify-center min-h-[160px] hover:border-accent/40 hover:-translate-y-1 transition-all animate-fade-in"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  {logo ? (
                    <img
                      src={getImageUrl(logo)}
                      alt={s.name}
                      className="max-h-16 object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                    />
                  ) : (
                    <span className="font-display text-xl uppercase text-foreground/60 group-hover:text-accent transition-colors">
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
