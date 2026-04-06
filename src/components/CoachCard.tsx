import { useLanguage } from "@/context/LanguageContext";
import { getImageUrl } from "@/lib/api";

interface Props {
  coach: any;
}

const CoachCard = ({ coach }: Props) => {
  const { t } = useLanguage();
  return (
    <div className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-accent/30 transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-[3/4] overflow-hidden bg-muted relative">
        <img
          src={getImageUrl(coach.image?.url)}
          alt={t(coach.name_mn, coach.name_en)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-foreground text-lg">{t(coach.name_mn, coach.name_en)}</h3>
        <p className="text-accent text-sm font-medium">{t(coach.role_mn, coach.role_en)}</p>
        {(coach.bio_mn || coach.bio_en) && (
          <p className="text-foreground/40 text-xs mt-2 line-clamp-2">{t(coach.bio_mn, coach.bio_en)}</p>
        )}
      </div>
    </div>
  );
};

export default CoachCard;
