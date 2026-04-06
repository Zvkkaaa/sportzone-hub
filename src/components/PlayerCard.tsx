import { useLanguage } from "@/context/LanguageContext";
import { getImageUrl } from "@/lib/api";

interface Props {
  player: any;
}

const PlayerCard = ({ player }: Props) => {
  const { t } = useLanguage();
  return (
    <div className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-accent/30 transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-[3/4] overflow-hidden bg-muted relative">
        <img
          src={getImageUrl(player.image?.url)}
          alt={t(player.name_mn, player.name_en)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        {player.number && (
          <span className="absolute top-3 right-3 bg-accent text-accent-foreground text-lg font-black w-10 h-10 rounded-full flex items-center justify-center">
            {player.number}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-foreground text-lg">{t(player.name_mn, player.name_en)}</h3>
        <p className="text-accent text-sm font-medium">{t(player.position_mn, player.position_en)}</p>
      </div>
    </div>
  );
};

export default PlayerCard;
