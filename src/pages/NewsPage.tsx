import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useNews } from "@/hooks/useApi";
import { getImageUrl, pickImage } from "@/lib/api";
import { newsSlug } from "@/lib/teamHelpers";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ArrowUpRight, Calendar, Newspaper, Clock3 } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const NewsPage = () => {
  const { t } = useLanguage();
  const { data, isLoading } = useNews();
  const news = data || [];
  const latest = news[0];
  const latestDate = latest?.publishedDate || latest?.date || latest?.publishedAt?.slice(0, 10);

  return (
    <div className="min-h-screen bg-background">
      <section className="relative pt-28 pb-14 overflow-hidden">
        <div className="absolute inset-0 gradient-navy" />
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-overlay" />
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-stretch">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-10 shadow-[0_20px_60px_rgba(2,6,23,0.24)]">
              <p className="text-accent text-xs font-bold uppercase tracking-[0.35em] mb-3">{t("Сүүлийн", "Latest")}</p>
              <h1 className="font-display text-5xl md:text-[5.5rem] font-bold uppercase tracking-tighter leading-none text-white max-w-3xl">
                {t("Мэдээ", "News")}
              </h1>
              <p className="text-white/68 max-w-2xl mt-5 text-sm md:text-base leading-relaxed">
                {t(
                  "Тоглолтын тайлан, roster шинэчлэл, клубын мэдэгдэл, онцлох мөчүүдийг Strapi-ээс шууд харуулна.",
                  "Game recaps, roster updates, club announcements and highlighted moments, streamed straight from Strapi."
                )}
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link to="/teams" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full font-bold text-xs uppercase tracking-[0.3em] hover:bg-accent/90 transition-all">
                  {t("Багууд", "Teams")} <ArrowUpRight size={14} />
                </Link>
                <Link to="/gallery" className="inline-flex items-center gap-2 border border-white/12 bg-white/6 text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-[0.3em] hover:bg-white/10 transition-all backdrop-blur-sm">
                  {t("Галлерей", "Gallery")}
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 backdrop-blur-xl p-5 shadow-[0_20px_60px_rgba(2,6,23,0.28)]">
              <div className="rounded-[1.5rem] border border-white/8 bg-white/5 p-5 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="inline-flex items-center gap-2 text-white/60 text-[10px] font-bold uppercase tracking-[0.35em]">
                      <Newspaper size={14} className="text-accent" />
                      {t("Story room", "Story room")}
                    </div>
                    <span className="rounded-full bg-accent text-accent-foreground text-[10px] font-black uppercase tracking-[0.35em] px-3 py-1">
                      {news.length}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
                      <p className="text-[10px] uppercase tracking-[0.35em] text-white/40">{t("Articles", "Articles")}</p>
                      <p className="font-display text-4xl font-bold text-white mt-2">{news.length}</p>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
                      <p className="text-[10px] uppercase tracking-[0.35em] text-white/40">{t("Latest", "Latest")}</p>
                      <p className="font-display text-lg font-bold text-white mt-2 leading-tight">
                        {latestDate || t("Coming soon", "Coming soon")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 rounded-2xl border border-white/8 bg-white/5 p-4">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-white/40 mb-2">{t("Coverage", "Coverage")}</p>
                  <p className="text-sm text-white/72 leading-relaxed">
                    {t(
                      "Багийн амьдрал, тоглолтын өмнөх бэлтгэл, тайзны ард болсон мөчүүд, sponsor болон академийн шинэчлэлүүд.",
                      "Team life, game-day prep, behind-the-scenes moments, sponsor notes and academy updates."
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">
        {isLoading ? (
          <LoadingSpinner />
        ) : news.length === 0 ? (
          <div className="rounded-[2rem] border border-white/8 bg-card/80 p-10 text-center shadow-[0_20px_60px_rgba(2,6,23,0.18)]">
            <p className="text-foreground/40">{t("Мэдээ алга байна", "No news yet")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {news.map((item: any, i: number) => {
              const slug = newsSlug(item);
              const cover = pickImage(item.coverImage) || pickImage(item.image);
              const date = item.publishedDate || item.date || item.publishedAt?.slice(0, 10);
              return (
                <Link
                  key={item.id}
                  to={`/news/${encodeURIComponent(slug)}`}
                  className="group relative overflow-hidden rounded-[1.75rem] border border-white/8 bg-card/90 shadow-[0_18px_40px_rgba(2,6,23,0.12)] hover:border-accent/40 hover:-translate-y-1.5 transition-all duration-500 animate-fade-in"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="aspect-[4/3] bg-slate-950 overflow-hidden relative">
                    {cover ? (
                      <img
                        src={getImageUrl(cover)}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 gradient-navy" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                    <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-background/75 backdrop-blur px-3 py-1 text-[10px] font-bold uppercase tracking-[0.35em] text-white/70">
                      <Clock3 size={12} className="text-accent" />
                      {t("Read", "Read")}
                    </div>
                  </div>
                  <div className="p-5">
                    {date && (
                      <p className="text-xs text-foreground/40 inline-flex items-center gap-1.5 mb-2">
                        <Calendar size={12} className="text-accent" /> {date}
                      </p>
                    )}
                    <h3 className="font-bold text-xl text-foreground group-hover:text-accent transition-colors leading-snug mb-3">
                      {t(item.title_mn, item.title_en) || item.title}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-accent text-xs font-bold uppercase tracking-[0.3em] group-hover:gap-2 transition-all">
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
