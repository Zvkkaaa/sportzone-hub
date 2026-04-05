import { useLanguage } from "@/context/LanguageContext";
import { useCoaches } from "@/hooks/useApi";
import CoachCard from "@/components/CoachCard";
import LoadingSpinner from "@/components/LoadingSpinner";

const CoachesPage = () => {
  const { t } = useLanguage();
  const { data, isLoading, error } = useCoaches();

  return (
    <div className="pt-16">
      <section className="bg-card border-b border-border py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground">{t("ДАСГАЛЖУУЛАГЧИД", "COACHES")}</h1>
        </div>
      </section>
      <div className="container mx-auto px-4 py-12">
        {isLoading ? <LoadingSpinner /> : error ? (
          <div className="bg-card rounded-xl border border-border p-12 text-center">
            <p className="text-muted-foreground">{t("Алдаа гарлаа", "Error loading data")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {(data || []).map((c: any) => <CoachCard key={c.id} coach={c} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoachesPage;
