import { useLanguage } from "@/context/LanguageContext";
import { useNews } from "@/hooks/useApi";
import { getImageUrl } from "@/lib/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import heroBg from "@/assets/hero-bg.jpg";
import { ArrowUpRight, Calendar } from "lucide-react";

const fallbackNews = [
  { id: 1, title_mn: "Pirates баг шинэ улирлын бэлтгэлээ эхлүүллээ", title_en: "Pirates begin new season preparation", date: "2026-03-28", description_mn: "Шинэ улирлын бэлтгэл ажил эхэлсэн бөгөөд баг бүрэн бүрэлдэхүүнээрээ бэлтгэл хийж байна.", description_en: "Pre-season preparation has begun with the full squad training together." },
  { id: 2, title_mn: "Шинэ тоглогч багтай нэгдлээ", title_en: "New player joins the team", date: "2026-03-20", description_mn: "Pirates баг шинэ тоглогчтой гэрээ байгууллаа.", description_en: "Pirates have signed a new player to strengthen the roster." },
  { id: 3, title_mn: "Pirates баг аваргын төлөө тэмцэнэ", title_en: "Pirates compete for the championship", date: "2026-03-15", description_mn: "Улирлын шилдэг тоглолтоо үзүүлж буй баг аваргын төлөө тэмцэнэ.", description_en: "The team is in top form and competing for the championship title." },
  { id: 4, title_mn: "Сагсан бөмбөгийн лигийн шинэ улирал эхэллээ", title_en: "New basketball league season begins", date: "2026-03-10", description_mn: "Шинэ улирал эхэлж байгаа бөгөөд бүх баг бэлэн байна.", description_en: "The new season kicks off with all teams ready to compete." },
  { id: 5, title_mn: "Pirates багийн тоглогчид шагнал хүртлээ", title_en: "Pirates players receive awards", date: "2026-03-05", description_mn: "Өнгөрсөн улирлын шилдэг тоглогчид шагнал хүртлээ.", description_en: "Outstanding players from last season received their awards." },
  { id: 6, title_mn: "Залуучуудын хөгжлийн хөтөлбөр зарлагдлаа", title_en: "Youth development program announced", date: "2026-02-28", description_mn: "Залуу авьяаслаг тоглогчдод зориулсан хөгжлийн хөтөлбөр зарлагдлаа.", description_en: "A new development program for talented young players has been announced." },
];

const NewsPage = () => {
  const { t } = useLanguage();
  const { data: cmsNews, isLoading } = useNews();

  const news = cmsNews && cmsNews.length > 0
    ? cmsNews.map((n: any) => ({
        id: n.id,
        title_mn: n.title_mn || "Мэдээ",
        title_en: n.title_en || "News",
        description_mn: n.description_mn || "",
        description_en: n.description_en || "",
        date: n.date || n.publishedAt?.slice(0, 10) || "2026-01-01",
        image: n.image?.url,
      }))
    : fallbackNews;

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative z-10 container mx-auto px-4">
          <p className="text-accent text-sm font-bold uppercase tracking-widest mb-3 animate-fade-in">
            {t("МЭДЭЭ & МЭДЭЭЛЭЛ", "NEWS & UPDATES")}
          </p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground animate-slide-up">
            {t("МЭДЭЭ", "NEWS")}
          </h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {isLoading ? <LoadingSpinner /> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item: any, i: number) => (
              <article
                key={item.id}
                className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-accent/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-accent/5 animate-fade-in"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="aspect-video overflow-hidden bg-muted relative">
                  <img
                    src={item.image ? getImageUrl(item.image) : heroBg}
                    alt=""
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
                </div>
                <div className="p-6 flex flex-col justify-between min-h-[160px]">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar size={12} className="text-accent" />
                      <p className="text-xs text-foreground/40 font-medium">{item.date}</p>
                    </div>
                    <h3 className="font-bold text-lg text-foreground group-hover:text-accent transition-colors duration-300 leading-snug mb-2">
                      {t(item.title_mn, item.title_en)}
                    </h3>
                    {(item.description_mn || item.description_en) && (
                      <p className="text-foreground/40 text-sm line-clamp-2">
                        {t(item.description_mn, item.description_en)}
                      </p>
                    )}
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-accent text-sm font-semibold group-hover:gap-2 transition-all duration-300">
                    <span>{t("Дэлгэрэнгүй", "Read more")}</span>
                    <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;