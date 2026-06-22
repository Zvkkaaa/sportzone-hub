import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { getImageUrl, pickImage } from "@/lib/api";
import { playerSlug } from "@/lib/teamHelpers";

interface Props {
  player: any;
  index?: number;
}

const PlayerCard = ({ player, index = 0 }: Props) => {
  const { t } = useLanguage();
  const slug = playerSlug(player);
  const photo = pickImage(player.photo) || pickImage(player.image);
  const name = t(player.name_mn, player.name_en) || player.fullName || player.full_name || "Player";
  const position = t(player.position_mn, player.position_en) || player.position || "";
  const number = player.jerseyNumber ?? player.jersey_number ?? player.number;

  return (
    <Link
      to={`/players/${encodeURIComponent(slug)}`}
      className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-accent/50 transition-all duration-500 hover:-translate-y-1.5 animate-fade-in flex flex-col"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="aspect-[3/4] overflow-hidden bg-muted relative">
        <img
          src={getImageUrl(photo)}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent opacity-90" />
        {number !== undefined && number !== null && number !== "" && (
          <span className="absolute top-3 left-3 font-display text-5xl font-bold text-accent leading-none drop-shadow-lg">
            {number}
          </span>
        )}
        {position && (
          <span className="absolute top-4 right-3 bg-foreground/10 backdrop-blur text-foreground text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded">
            {position}
          </span>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-display text-xl font-bold uppercase text-foreground leading-tight">
            {name}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default PlayerCard;
