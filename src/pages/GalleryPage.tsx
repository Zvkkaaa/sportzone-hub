import { useLanguage } from "@/context/LanguageContext";
import { useGalleries } from "@/hooks/useApi";
import GalleryCard from "@/components/GalleryCard";
import SectionTitle from "@/components/SectionTitle";
import LoadingSpinner from "@/components/LoadingSpinner";

const GalleryPage = () => {
  const { t } = useLanguage();
  const { data, isLoading, error } = useGalleries();

  return (
    <div className="container mx-auto px-4 py-12">
      <SectionTitle>{t("Зургийн цомог", "Gallery")}</SectionTitle>
      {isLoading ? <LoadingSpinner /> : error ? (
        <p className="text-accent">{t("Алдаа гарлаа", "Error loading data")}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(data || []).map((g: any) => <GalleryCard key={g.id} item={g} />)}
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
