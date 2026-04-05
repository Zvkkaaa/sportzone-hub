import { useLanguage } from "@/context/LanguageContext";
import { getImageUrl } from "@/lib/api";

interface Props {
  coach: any;
}

const CoachCard = ({ coach }: Props) => {
  const { t } = useLanguage();
  return (
    <div className="group bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={getImageUrl(coach.image?.url)}
          alt={t(coach.name_mn, coach.name_en)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-foreground">{t(coach.name_mn, coach.name_en)}</h3>
        <p className="text-muted-foreground text-sm">{t(coach.role_mn, coach.role_en)}</p>
        {(coach.bio_mn || coach.bio_en) && (
          <p className="text-muted-foreground text-xs mt-2 line-clamp-3">{t(coach.bio_mn, coach.bio_en)}</p>
        )}
      </div>
    </div>
  );
};

export default CoachCard;
