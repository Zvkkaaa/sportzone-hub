import { useLanguage } from "@/context/LanguageContext";
import { useGalleries } from "@/hooks/useApi";
import { getImageUrl } from "@/lib/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import heroBg from "@/assets/hero-bg.jpg";
import { ArrowUpRight } from "lucide-react";

const fallbackNews = [
  { id: 1, title_mn: "Pirates баг шинэ улирлын бэлтгэлээ эхлүүллээ", title_en: "Pirates begin new season preparation", date: "2026-03-28" },
  { id: 2, title_mn: "Шинэ тоглогч багтай нэгдлээ", title_en: "New player joins the team", date: "2026-03-20" },
  { id: 3, title_mn: "Pirates баг аваргын төлөө тэмцэнэ", title_en: "Pirates compete for the championship", date: "2026-03-15" },
  { id: 4, title_mn: "Сагсан бөмбөгийн лигийн шинэ улирал эхэллээ", title_en: "New basketball league season begins", date: "2026-03-10" },
  { id: 5, title_mn: "Pirates багийн тоглогчид шагнал хүртлээ", title_en: "Pirates players receive awards", date: "2026-03-05" },
  { id: 6, title_mn: "Залуучуудын хөгжлийн хөтөлбөр зарлагдлаа", title_en: "Youth development program announced", date: "2026-02-28" },
];

const NewsPage = () => {
  const { t } = useLanguage();
  const { data: galleries, isLoading } = useGalleries();

  const news = galleries && galleries.length > 0
    ? galleries.map((g: any) => ({
        id: g.id,
        title_mn: g.caption_mn || "Мэдээ",
        title_en: g.caption_en || "News",
        date: g.date || "2026-01-01",
        image: g.image?.url,
      }))
    : fallbackNews;

  return (
    <div className="pt-16">
      <section className="gradient-navy py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground">{t("МЭДЭЭ", "NEWS")}</h1>
        </div>
      </section>
      <div className="container mx-auto px-4 py-12">
        {isLoading ? <LoadingSpinner /> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item: any) => (
              <div key={item.id} className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-accent/30 transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-video overflow-hidden bg-muted">
                  <img
                    src={item.image ? getImageUrl(item.image) : heroBg}
                    alt=""
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                  />
                </div>
                <div className="p-5 flex flex-col justify-between min-h-[120px]">
                  <div>
                    <p className="text-xs text-foreground/30 mb-2">{item.date}</p>
                    <h3 className="font-bold text-foreground group-hover:text-accent transition-colors leading-snug">
                      {t(item.title_mn, item.title_en)}
                    </h3>
                  </div>
                  <div className="mt-4">
                    <ArrowUpRight size={18} className="text-accent" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
