import { useLanguage } from "@/context/LanguageContext";
import { getImageUrl, pickImage } from "@/lib/api";
import { format } from "date-fns";
import { MapPin, Calendar } from "lucide-react";

interface Props {
  match: any;
}

const statusBadge = (status: string) => {
  switch (status) {
    case "win": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
    case "loss": return "bg-red-500/10 text-red-400 border-red-500/30";
    case "draw": return "bg-foreground/10 text-foreground/60 border-foreground/20";
    default: return "bg-accent/10 text-accent border-accent/30";
  }
};

const MatchRow = ({ match }: Props) => {
  const { t } = useLanguage();
  const date = match.date || match.match_date;
  const dateStr = date ? format(new Date(date), "MMM d, yyyy") : "";
  const time = match.time || (date ? format(new Date(date), "HH:mm") : "");
  const us = match.scoreUs ?? match.pirates_score;
  const them = match.scoreThem ?? match.opponent_score;
  const hasScore = us !== undefined && us !== null && them !== undefined && them !== null;
  const status: string = match.status || (hasScore ? (us > them ? "win" : us < them ? "loss" : "draw") : "upcoming");
  const isHome = (match.homeAway || (match.is_home === false ? "away" : "home")) === "home";
  const piratesLogo = pickImage(match.pirates_logo) || pickImage(match.team?.logo);
  const oppLogo = pickImage(match.opponent_logo) || pickImage(match.opponentLogo);
  const opponent = match.opponent_name || match.opponentName || "TBD";

  return (
    <div className="bg-card rounded-2xl border border-border hover:border-accent/40 transition-all p-5 group">
      <div className="flex items-center justify-between mb-3">
        <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${statusBadge(status)}`}>
          {status === "upcoming" ? t("Удахгүй", "Upcoming") : status === "win" ? t("Хожсон", "Win") : status === "loss" ? t("Хожигдсон", "Loss") : t("Тэнцсэн", "Draw")}
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">
          {isHome ? t("Эзэн", "Home") : t("Зочин", "Away")}
        </span>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-3">
        <div className="flex items-center gap-3">
          <img src={getImageUrl(piratesLogo)} alt="" className="w-12 h-12 rounded-full object-cover bg-muted" />
          <span className="font-display text-lg font-bold uppercase">Pirates</span>
        </div>
        <div className="text-center">
          {hasScore ? (
            <div className="font-display text-3xl font-bold">
              <span className={us >= them ? "text-foreground" : "text-foreground/50"}>{us}</span>
              <span className="text-foreground/30 mx-2">—</span>
              <span className={them >= us ? "text-foreground" : "text-foreground/50"}>{them}</span>
            </div>
          ) : (
            <div className="font-display text-xl font-bold text-foreground/40">VS</div>
          )}
        </div>
        <div className="flex items-center gap-3 justify-end">
          <span className="font-display text-lg font-bold uppercase text-right">{opponent}</span>
          <img src={getImageUrl(oppLogo)} alt="" className="w-12 h-12 rounded-full object-cover bg-muted" />
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-foreground/40">
        <span className="inline-flex items-center gap-1.5">
          <Calendar size={12} /> {dateStr} {time && `· ${time}`}
        </span>
        {match.location && (
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={12} /> {match.location}
          </span>
        )}
      </div>
    </div>
  );
};

export default MatchRow;
