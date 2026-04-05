import { useLanguage } from "@/context/LanguageContext";
import { useGalleries } from "@/hooks/useApi";
import GalleryCard from "@/components/GalleryCard";
import LoadingSpinner from "@/components/LoadingSpinner";

const GalleryPage = () => {
  const { t } = useLanguage();
  const { data, isLoading, error } = useGalleries();

  return (
    <div className="pt-16">
      <section className="gradient-navy py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-navy-foreground">{t("ЗУРГИЙН ЦОМОГ", "GALLERY")}</h1>
        </div>
      </section>
      <div className="container mx-auto px-4 py-12">
        {isLoading ? <LoadingSpinner /> : error ? (
          <div className="bg-card rounded-xl border border-border p-12 text-center">
            <p className="text-muted-foreground">{t("Алдаа гарлаа", "Error loading data")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(data || []).map((g: any) => <GalleryCard key={g.id} item={g} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;
