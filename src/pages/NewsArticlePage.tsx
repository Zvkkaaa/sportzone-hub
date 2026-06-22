import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useNews } from "@/hooks/useApi";
import { getImageUrl, pickImage } from "@/lib/api";
import { newsSlug } from "@/lib/teamHelpers";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ChevronLeft, Calendar } from "lucide-react";

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
        <Link to="/news" className="text-accent text-sm font-bold uppercase tracking-widest">
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
      <section className="relative pt-24 pb-10 overflow-hidden">
        {cover && (
          <img src={getImageUrl(cover)} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        )}
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative z-10 container mx-auto px-4 max-w-3xl">
          <Link to="/news" className="inline-flex items-center gap-2 text-foreground/50 hover:text-accent text-xs font-bold uppercase tracking-widest mb-6 transition-colors">
            <ChevronLeft size={16} /> {t("Бүх мэдээ", "All news")}
          </Link>
          {date && (
            <p className="text-foreground/40 text-xs inline-flex items-center gap-1.5 mb-4">
              <Calendar size={12} className="text-accent" /> {date}
            </p>
          )}
          <h1 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight text-foreground">
            {title}
          </h1>
        </div>
      </section>

      {cover && (
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="aspect-video rounded-2xl overflow-hidden bg-muted border border-border">
            <img src={getImageUrl(cover)} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 max-w-3xl py-12">
        <div className="prose prose-invert max-w-none text-foreground/80 leading-relaxed whitespace-pre-wrap">
          {typeof content === "string" ? content : JSON.stringify(content)}
        </div>
      </div>
    </article>
  );
};

export default NewsArticlePage;
