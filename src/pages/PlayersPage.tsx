import { useLanguage } from "@/context/LanguageContext";
import { usePlayers } from "@/hooks/useApi";
import PlayerCard from "@/components/PlayerCard";
import SectionTitle from "@/components/SectionTitle";
import LoadingSpinner from "@/components/LoadingSpinner";

const PlayersPage = () => {
  const { t } = useLanguage();
  const { data, isLoading, error } = usePlayers();

  return (
    <div className="container mx-auto px-4 py-12">
      <SectionTitle>{t("Тоглогчид", "Players")}</SectionTitle>
      {isLoading ? <LoadingSpinner /> : error ? (
        <p className="text-accent">{t("Алдаа гарлаа", "Error loading data")}</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {(data || []).map((p: any) => <PlayerCard key={p.id} player={p} />)}
        </div>
      )}
    </div>
  );
};

export default PlayersPage;
