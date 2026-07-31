import { useState, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useGalleries } from "@/hooks/useApi";
import { getImageUrl, pickImages } from "@/lib/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import { X, ImagePlay } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

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
    <div className="min-h-screen bg-background">
      <section className="relative pt-28 pb-14 overflow-hidden">
        <div className="absolute inset-0 gradient-navy" />
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-12 mix-blend-overlay" />
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-10 shadow-[0_20px_60px_rgba(2,6,23,0.22)]">
            <p className="text-accent text-xs font-bold uppercase tracking-[0.35em] mb-3">{t("Хадгалагдсан мөч", "Moments")}</p>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div className="max-w-3xl">
                <h1 className="font-display text-5xl md:text-[5.5rem] font-bold uppercase tracking-tighter leading-none text-white">
                  {t("Зургийн цомог", "Gallery")}
                </h1>
                <p className="text-white/65 max-w-2xl mt-5 text-sm md:text-base leading-relaxed">
                  {t(
                    "Гэрэлтүүлэг, сэтгэл хөдлөл, ялалтын мөчүүдийг premium masonry wall хэлбэрээр харуулна.",
                    "Show the light, emotion and victory moments in a premium masonry wall."
                  )}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: t("Photos", "Photos"), value: images.length },
                  { label: t("Sets", "Sets"), value: data?.length || 0 },
                  { label: t("Shots", "Shots"), value: Math.max(images.length - 3, 0) },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/8 bg-white/5 backdrop-blur px-4 py-3 min-w-[110px]">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-white/40">{stat.label}</p>
                    <p className="font-display text-3xl font-bold text-white mt-2">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">
        {isLoading ? (
          <LoadingSpinner />
        ) : images.length === 0 ? (
          <div className="rounded-[2rem] border border-white/8 bg-card/80 p-10 text-center shadow-[0_18px_45px_rgba(2,6,23,0.12)]">
            <ImagePlay size={32} className="mx-auto text-accent mb-3" />
            <p className="text-foreground/45">{t("Зураг алга", "No photos yet")}</p>
          </div>
        ) : (
          <div className="columns-2 md:columns-3 xl:columns-4 gap-4 space-y-4">
            {images.map((url, i) => (
              <button
                key={i}
                onClick={() => setOpen(url)}
                className="group block w-full overflow-hidden rounded-[1.5rem] border border-white/8 bg-card/90 break-inside-avoid shadow-[0_16px_35px_rgba(2,6,23,0.12)] hover:border-accent/35 transition-all"
              >
                <div className="relative overflow-hidden">
                  <img src={getImageUrl(url)} alt="" className="w-full h-auto group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-6" onClick={() => setOpen(null)}>
          <button className="absolute top-6 right-6 text-foreground/70 hover:text-foreground transition-colors" onClick={() => setOpen(null)}>
            <X size={32} />
          </button>
          <div className="max-w-6xl max-h-full rounded-[2rem] border border-white/10 bg-card/95 p-3 shadow-[0_20px_60px_rgba(2,6,23,0.3)]">
            <img src={getImageUrl(open)} alt="" className="max-w-full max-h-[85vh] rounded-[1.5rem] object-contain" />
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
