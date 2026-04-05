import { useLanguage } from "@/context/LanguageContext";
import { useMatches } from "@/hooks/useApi";
import MatchCard from "@/components/MatchCard";
import LoadingSpinner from "@/components/LoadingSpinner";

const MatchesPage = () => {
  const { t } = useLanguage();
  const { data, isLoading, error } = useMatches();

  return (
    <div className="pt-16">
      <section className="gradient-navy py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-navy-foreground">{t("ТЭМЦЭЭНҮҮД", "MATCHES")}</h1>
        </div>
      </section>
      <div className="container mx-auto px-4 py-12">
        {isLoading ? <LoadingSpinner /> : error ? (
          <div className="bg-card rounded-xl border border-border p-12 text-center">
            <p className="text-muted-foreground">{t("Алдаа гарлаа", "Error loading data")}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {(data || []).map((m: any) => <MatchCard key={m.id} match={m} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchesPage;
