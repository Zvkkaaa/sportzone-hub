import { getImageUrl } from "@/lib/api";
import { format } from "date-fns";

interface Props {
  match: any;
}

const MatchCard = ({ match }: Props) => {
  const date = match.match_date ? format(new Date(match.match_date), "MMM dd, yyyy") : "";

  return (
    <div className="bg-card rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 flex items-center gap-4">
      <div className="flex items-center gap-3 flex-1 justify-end">
        <span className="font-bold text-foreground text-right">Pirates</span>
        <img src={getImageUrl(match.pirates_logo?.url)} alt="Pirates" className="w-10 h-10 rounded-full object-cover bg-muted" />
      </div>
      <div className="text-center min-w-[80px]">
        <div className="text-2xl font-extrabold text-foreground">
          {match.pirates_score} - {match.opponent_score}
        </div>
        <div className="text-xs text-muted-foreground mt-1">{date}</div>
        {match.location && <div className="text-xs text-muted-foreground">{match.location}</div>}
      </div>
      <div className="flex items-center gap-3 flex-1">
        <img src={getImageUrl(match.opponent_logo?.url)} alt={match.opponent_name} className="w-10 h-10 rounded-full object-cover bg-muted" />
        <span className="font-bold text-foreground">{match.opponent_name}</span>
      </div>
    </div>
  );
};

export default MatchCard;
