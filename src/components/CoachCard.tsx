import { useLanguage } from "@/context/LanguageContext";
import { getImageUrl, pickImage } from "@/lib/api";

interface Props {
  coach: any;
  index?: number;
}

const CoachCard = ({ coach, index = 0 }: Props) => {
  const { t } = useLanguage();
  const photo = pickImage(coach.photo) || pickImage(coach.image);
  const name = t(coach.name_mn, coach.name_en) || coach.name || "Coach";
  const role = t(coach.role_mn, coach.role_en) || coach.role || "";

  return (
    <div
      className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-accent/40 transition-all duration-500 hover:-translate-y-1 animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={getImageUrl(photo)}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg font-bold uppercase text-foreground">{name}</h3>
        {role && (
          <p className="text-accent text-[10px] uppercase tracking-widest mt-1 font-bold">{role}</p>
        )}
      </div>
    </div>
  );
};

export default CoachCard;
