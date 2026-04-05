import { useLanguage } from "@/context/LanguageContext";
import { getImageUrl } from "@/lib/api";

interface Props {
  player: any;
}

const PlayerCard = ({ player }: Props) => {
  const { t } = useLanguage();
  return (
    <div className="group bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={getImageUrl(player.image?.url)}
          alt={t(player.name_mn, player.name_en)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4">
        {player.number && (
          <span className="inline-block bg-accent text-accent-foreground text-xs font-bold px-2 py-0.5 rounded mb-2">
            #{player.number}
          </span>
        )}
        <h3 className="font-bold text-foreground">{t(player.name_mn, player.name_en)}</h3>
        <p className="text-muted-foreground text-sm">{t(player.position_mn, player.position_en)}</p>
      </div>
    </div>
  );
};

export default PlayerCard;
