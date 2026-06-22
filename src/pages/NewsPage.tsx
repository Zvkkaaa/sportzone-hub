import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useNews } from "@/hooks/useApi";
import { getImageUrl, pickImage } from "@/lib/api";
import { newsSlug } from "@/lib/teamHelpers";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ArrowUpRight, Calendar } from "lucide-react";

const NewsPage = () => {
  const { t } = useLanguage();
  const { data, isLoading } = useNews();
  const news = data || [];

  return (
    <div className="pt-24 min-h-screen">
      <div className="container mx-auto px-4 mb-10">
        <p className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-3">{t("Сүүлийн", "Latest")}</p>
        <h1 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tight text-foreground">{t("Мэдээ", "News")}</h1>
      </div>

      <div className="container mx-auto px-4 pb-16">
        {isLoading ? <LoadingSpinner /> : news.length === 0 ? (
          <p className="text-center text-foreground/40 py-20">{t("Мэдээ алга байна", "No news yet")}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item: any, i: number) => {
              const slug = newsSlug(item);
              const cover = pickImage(item.coverImage) || pickImage(item.image);
              const date = item.publishedDate || item.date || item.publishedAt?.slice(0, 10);
              return (
                <Link
                  key={item.id}
                  to={`/news/${encodeURIComponent(slug)}`}
                  className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-accent/40 transition-all duration-500 hover:-translate-y-2 animate-fade-in"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="aspect-video overflow-hidden bg-muted">
                    {cover && (
                      <img src={getImageUrl(cover)} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                    )}
                  </div>
                  <div className="p-5">
                    {date && (
                      <p className="text-xs text-foreground/40 inline-flex items-center gap-1.5 mb-2">
                        <Calendar size={12} className="text-accent" /> {date}
                      </p>
                    )}
                    <h3 className="font-bold text-lg text-foreground group-hover:text-accent transition-colors leading-snug mb-3">
                      {t(item.title_mn, item.title_en) || item.title}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-accent text-xs font-bold uppercase tracking-widest group-hover:gap-2 transition-all">
                      {t("Дэлгэрэнгүй", "Read more")} <ArrowUpRight size={14} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
