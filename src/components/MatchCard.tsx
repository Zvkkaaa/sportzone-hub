import { getImageUrl } from "@/lib/api";
import { format } from "date-fns";

interface Props {
  match: any;
}

const MatchCard = ({ match }: Props) => {
  const date = match.match_date ? format(new Date(match.match_date), "yyyy-MM-dd") : "";
  const piratesWon = match.pirates_score > match.opponent_score;

  return (
    <div className="bg-card rounded-xl border border-border p-6 flex items-center gap-4 hover:border-sport-orange/30 transition-all">
      <div className="flex items-center gap-3 flex-1 justify-end">
        <span className="font-bold text-foreground text-right text-sm md:text-base">PIRATES</span>
        <img src={getImageUrl(match.pirates_logo?.url)} alt="Pirates" className="w-12 h-12 rounded-full object-cover bg-muted border-2 border-border" />
      </div>
      <div className="text-center min-w-[100px]">
        <div className="flex items-center justify-center gap-2">
          <span className={`text-3xl font-black ${piratesWon ? "text-sport-orange" : "text-foreground"}`}>{match.pirates_score}</span>
          <span className="text-muted-foreground text-lg">-</span>
          <span className={`text-3xl font-black ${!piratesWon ? "text-sport-orange" : "text-foreground"}`}>{match.opponent_score}</span>
        </div>
        <div className="text-xs text-muted-foreground mt-1">{date}</div>
        {match.location && <div className="text-xs text-muted-foreground">{match.location}</div>}
      </div>
      <div className="flex items-center gap-3 flex-1">
        <img src={getImageUrl(match.opponent_logo?.url)} alt={match.opponent_name} className="w-12 h-12 rounded-full object-cover bg-muted border-2 border-border" />
        <span className="font-bold text-foreground text-sm md:text-base">{match.opponent_name}</span>
      </div>
    </div>
  );
};

export default MatchCard;
