import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { getImageUrl } from "@/lib/api";
import {
  teamName, teamSlug, teamCategory, teamGender, teamBanner, teamLogo, teamDescription,
} from "@/lib/teamHelpers";
import { ArrowUpRight, Users } from "lucide-react";

interface Props {
  team: any;
  playerCount?: number;
  coachName?: string;
  index?: number;
}

const TeamCard = ({ team, playerCount, coachName, index = 0 }: Props) => {
  const { t } = useLanguage();
  const name = teamName(team);
  const slug = teamSlug(team);
  const banner = teamBanner(team);
  const logo = teamLogo(team);
  const category = teamCategory(team);
  const gender = teamGender(team);
  const desc = teamDescription(team);

  return (
    <Link
      to={`/teams/${encodeURIComponent(slug)}`}
      state={{ teamName: name }}
      className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-accent/50 transition-all duration-500 hover:-translate-y-1.5 animate-slide-up flex flex-col shadow-[0_18px_45px_rgba(15,23,42,0.06)]"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-amber-400 to-accent opacity-90 z-10" />
      <div className="aspect-[4/3] overflow-hidden bg-muted relative">
        {banner ? (
          <img
            src={getImageUrl(banner)}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 gradient-navy" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/45 to-transparent" />
        {logo && (
          <img
            src={getImageUrl(logo)}
            alt=""
            className="absolute top-4 left-4 w-12 h-12 object-contain drop-shadow-xl"
          />
        )}
        {(category || gender) && (
          <div className="absolute top-4 right-4 flex gap-1.5">
            {category && (
              <span className="bg-accent text-accent-foreground text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                {category}
              </span>
            )}
            {gender && (
              <span className="bg-foreground/10 backdrop-blur text-foreground text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                {gender}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-2xl font-bold uppercase text-foreground group-hover:text-accent transition-colors tracking-tight">
          {name}
        </h3>
        {coachName && (
          <p className="text-foreground/40 text-xs uppercase tracking-widest mt-1">
            {t("Дасгалжуулагч", "Coach")}: <span className="text-foreground/70">{coachName}</span>
          </p>
        )}
        {desc && (
          <p className="text-foreground/50 text-sm mt-3 line-clamp-2">{desc}</p>
        )}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/60">
          <span className="inline-flex items-center gap-1.5 text-foreground/40 text-xs uppercase tracking-widest">
            <Users size={12} /> {playerCount ?? 0} {t("тоглогч", "players")}
          </span>
          <span className="inline-flex items-center gap-1 text-accent text-xs font-bold uppercase tracking-widest group-hover:gap-2 transition-all">
            {t("Үзэх", "View")} <ArrowUpRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default TeamCard;
