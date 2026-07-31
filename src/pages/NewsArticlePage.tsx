import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useNews } from "@/hooks/useApi";
import { getImageUrl, pickImage } from "@/lib/api";
import { newsSlug } from "@/lib/teamHelpers";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ChevronLeft, Calendar, Clock3, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const NewsArticlePage = () => {
  const { slug } = useParams();
  const { t } = useLanguage();
  const { data, isLoading } = useNews();

  const decoded = decodeURIComponent(slug || "");
  const item = useMemo(
    () => (data || []).find((n: any) =>
      newsSlug(n) === decoded || String(n.id) === decoded || String(n.documentId) === decoded
    ),
    [data, decoded]
  );

  if (isLoading) return <div className="pt-20"><LoadingSpinner /></div>;
  if (!item) {
    return (
      <div className="pt-32 container mx-auto px-4 text-center">
        <p className="text-foreground/40 mb-4">{t("Мэдээ олдсонгүй", "Article not found")}</p>
        <Link to="/news" className="text-accent text-sm font-bold uppercase tracking-[0.3em]">
          {t("Бүх мэдээ", "All news")}
        </Link>
      </div>
    );
  }

  const cover = pickImage(item.coverImage) || pickImage(item.image);
  const title = t(item.title_mn, item.title_en) || item.title || "";
  const date = item.publishedDate || item.date || item.publishedAt?.slice(0, 10);
  const content = item.content || t(item.description_mn, item.description_en) || "";

  return (
    <article className="min-h-screen bg-background">
      <section className="relative pt-28 pb-10 overflow-hidden">
        <div className="absolute inset-0 gradient-navy" />
        <img src={cover ? getImageUrl(cover) : heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative z-10 container mx-auto px-4 max-w-5xl">
          <Link to="/news" className="inline-flex items-center gap-2 text-foreground/50 hover:text-accent text-xs font-bold uppercase tracking-[0.35em] mb-6 transition-colors">
            <ChevronLeft size={16} /> {t("Бүх мэдээ", "All news")}
          </Link>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-10 shadow-[0_20px_60px_rgba(2,6,23,0.25)]">
            {date && (
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-background/60 px-3 py-1.5 mb-5 text-[10px] font-bold uppercase tracking-[0.35em] text-white/65">
                <Calendar size={12} className="text-accent" /> {date}
              </div>
            )}
            <h1 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter text-white leading-tight max-w-4xl">
              {title}
            </h1>
            <p className="text-white/65 max-w-3xl mt-5 text-sm md:text-base leading-relaxed">
              {t(
                "Basketball-first storytelling for club fans, families and partners.",
                "Basketball-first storytelling for club fans, families and partners."
              )}
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.42fr] gap-8">
          <div className="space-y-8">
            {cover && (
              <div className="rounded-[2rem] overflow-hidden border border-white/8 bg-card/80 shadow-[0_18px_45px_rgba(2,6,23,0.14)]">
                <img src={getImageUrl(cover)} alt="" className="w-full h-full object-cover" />
              </div>
            )}

            <div className="rounded-[2rem] border border-white/8 bg-card/90 p-6 md:p-10 shadow-[0_18px_45px_rgba(2,6,23,0.12)]">
              <div className="flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-[0.35em] mb-6">
                <Sparkles size={14} /> {t("Article", "Article")}
              </div>
              <div className="prose prose-invert max-w-none text-foreground/80 leading-relaxed whitespace-pre-wrap">
                {typeof content === "string" ? content : JSON.stringify(content)}
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-[2rem] border border-white/8 bg-card/90 p-6 shadow-[0_18px_45px_rgba(2,6,23,0.12)] sticky top-24">
              <div className="inline-flex items-center gap-2 text-white/55 text-[10px] font-bold uppercase tracking-[0.35em] mb-3">
                <Clock3 size={12} className="text-accent" /> {t("Quick info", "Quick info")}
              </div>
              <p className="text-sm text-foreground/65 leading-relaxed">
                {t(
                  "This page is designed like an editorial feature, so the title, imagery and body copy feel closer to a real club news story.",
                  "This page is designed like an editorial feature, so the title, imagery and body copy feel closer to a real club news story."
                )}
              </p>
              <div className="mt-6 rounded-2xl border border-white/8 bg-white/5 p-4">
                <p className="text-[10px] uppercase tracking-[0.35em] text-foreground/40 mb-2">{t("Share", "Share")}</p>
                <div className="text-sm text-foreground/70">
                  {t("Designed for sponsors, fans and journalists.", "Designed for sponsors, fans and journalists.")}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
};

export default NewsArticlePage;
