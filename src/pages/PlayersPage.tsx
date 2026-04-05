import { useLanguage } from "@/context/LanguageContext";
import { usePlayers } from "@/hooks/useApi";
import PlayerCard from "@/components/PlayerCard";
import SectionTitle from "@/components/SectionTitle";
import LoadingSpinner from "@/components/LoadingSpinner";

const PlayersPage = () => {
  const { t } = useLanguage();
  const { data, isLoading, error } = usePlayers();

  return (
    <div className="pt-16">
      <section className="gradient-navy py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-navy-foreground">{t("ТОГЛОГЧИД", "PLAYERS")}</h1>
        </div>
      </section>
      <div className="container mx-auto px-4 py-12">
        {isLoading ? <LoadingSpinner /> : error ? (
          <div className="bg-card rounded-xl border border-border p-12 text-center">
            <p className="text-muted-foreground">{t("Strapi серверээс мэдээлэл ачааллахад алдаа гарлаа", "Error loading data from Strapi server")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {(data || []).map((p: any) => <PlayerCard key={p.id} player={p} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayersPage;
