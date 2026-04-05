import { useLanguage } from "@/context/LanguageContext";
import { useMatches } from "@/hooks/useApi";
import MatchCard from "@/components/MatchCard";
import SectionTitle from "@/components/SectionTitle";
import LoadingSpinner from "@/components/LoadingSpinner";

const MatchesPage = () => {
  const { t } = useLanguage();
  const { data, isLoading, error } = useMatches();

  return (
    <div className="container mx-auto px-4 py-12">
      <SectionTitle>{t("Тэмцээнүүд", "Matches")}</SectionTitle>
      {isLoading ? <LoadingSpinner /> : error ? (
        <p className="text-accent">{t("Алдаа гарлаа", "Error loading data")}</p>
      ) : (
        <div className="space-y-4">
          {(data || []).map((m: any) => <MatchCard key={m.id} match={m} />)}
        </div>
      )}
    </div>
  );
};

export default MatchesPage;
