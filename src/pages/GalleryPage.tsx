import { useState, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useGalleries } from "@/hooks/useApi";
import { getImageUrl, pickImages } from "@/lib/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import { X } from "lucide-react";

const GalleryPage = () => {
  const { t } = useLanguage();
  const { data, isLoading } = useGalleries();
  const [open, setOpen] = useState<string | null>(null);

  const images: string[] = useMemo(() => {
    const all: string[] = [];
    (data || []).forEach((g: any) => {
      pickImages(g.images || g.photos).forEach((u) => all.push(u));
    });
    return all;
  }, [data]);

  return (
    <div className="pt-24 min-h-screen">
      <div className="container mx-auto px-4 mb-10">
        <p className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-3">{t("Хадгалагдсан мөч", "Moments")}</p>
        <h1 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tight text-foreground">{t("Зургийн цомог", "Gallery")}</h1>
      </div>

      <div className="container mx-auto px-4 pb-16">
        {isLoading ? <LoadingSpinner /> : images.length === 0 ? (
          <p className="text-center text-foreground/40 py-20">{t("Зураг алга", "No photos yet")}</p>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            {images.map((url, i) => (
              <button
                key={i}
                onClick={() => setOpen(url)}
                className="block w-full overflow-hidden rounded-xl bg-muted break-inside-avoid group"
              >
                <img src={getImageUrl(url)} alt="" className="w-full h-auto group-hover:scale-105 transition-transform duration-700" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-6" onClick={() => setOpen(null)}>
          <button className="absolute top-6 right-6 text-foreground/70 hover:text-foreground" onClick={() => setOpen(null)}>
            <X size={32} />
          </button>
          <img src={getImageUrl(open)} alt="" className="max-w-full max-h-full rounded-2xl object-contain" />
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
