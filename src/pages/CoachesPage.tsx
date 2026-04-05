import { useLanguage } from "@/context/LanguageContext";
import { useCoaches } from "@/hooks/useApi";
import CoachCard from "@/components/CoachCard";
import SectionTitle from "@/components/SectionTitle";
import LoadingSpinner from "@/components/LoadingSpinner";

const CoachesPage = () => {
  const { t } = useLanguage();
  const { data, isLoading, error } = useCoaches();

  return (
    <div className="container mx-auto px-4 py-12">
      <SectionTitle>{t("Дасгалжуулагчид", "Coaches")}</SectionTitle>
      {isLoading ? <LoadingSpinner /> : error ? (
        <p className="text-accent">{t("Алдаа гарлаа", "Error loading data")}</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {(data || []).map((c: any) => <CoachCard key={c.id} coach={c} />)}
        </div>
      )}
    </div>
  );
};

export default CoachesPage;
