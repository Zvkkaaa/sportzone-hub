import { getImageUrl } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";
import { format } from "date-fns";

interface Props {
  match: any;
}

const MatchCard = ({ match }: Props) => {
  const { t } = useLanguage();
  const date = match.match_date ? format(new Date(match.match_date), "yyyy-MM-dd") : "";
  const piratesWon = match.pirates_score > match.opponent_score;
  const isHome = match.is_home !== false;

  return (
    <div className="bg-card rounded-2xl border border-border p-5 hover:border-accent/30 transition-all">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-foreground/40">
          {t("ҮР ДҮН", "RESULT")}
        </span>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
          isHome ? "bg-accent/10 text-accent" : "bg-foreground/10 text-foreground/60"
        }`}>
          {isHome ? t("Эзэн", "Home") : t("Зочин", "Away")}
        </span>
      </div>
      {match.location && (
        <p className="text-xs text-foreground/30 mb-3">{match.location}</p>
      )}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={getImageUrl(match.pirates_logo?.url)} alt="Pirates" className="w-8 h-8 rounded-full object-cover bg-muted" />
            <span className="font-bold text-foreground text-sm">PIRATES</span>
          </div>
          <span className={`text-2xl font-black ${piratesWon ? "text-accent" : "text-foreground/60"}`}>{match.pirates_score}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={getImageUrl(match.opponent_logo?.url)} alt={match.opponent_name} className="w-8 h-8 rounded-full object-cover bg-muted" />
            <span className="font-bold text-foreground text-sm">{match.opponent_name}</span>
          </div>
          <span className={`text-2xl font-black ${!piratesWon ? "text-accent" : "text-foreground/60"}`}>{match.opponent_score}</span>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-border text-xs text-foreground/30 text-center">
        {date}
      </div>
    </div>
  );
};

export default MatchCard;
