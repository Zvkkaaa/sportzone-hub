import { useLanguage } from "@/context/LanguageContext";
import { getImageUrl } from "@/lib/api";

interface Props {
  item: any;
}

const GalleryCard = ({ item }: Props) => {
  const { t } = useLanguage();
  return (
    <div className="group relative rounded-xl overflow-hidden border border-border hover:border-sport-orange/30 transition-all duration-300">
      <div className="aspect-video overflow-hidden bg-muted">
        <img
          src={getImageUrl(item.image?.url)}
          alt={t(item.caption_mn, item.caption_en)}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <p className="text-foreground text-sm font-medium">{t(item.caption_mn, item.caption_en)}</p>
      </div>
    </div>
  );
};

export default GalleryCard;
