import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useMatches, useNews, useTeams, usePlayers, useCoaches } from "@/hooks/useApi";
import { getImageUrl, pickImage } from "@/lib/api";
import { teamName, teamSlug, playerTeamName, coachTeamName, newsSlug } from "@/lib/teamHelpers";
import TeamCard from "@/components/TeamCard";
import PlayerCard from "@/components/PlayerCard";
import MatchRow from "@/components/MatchRow";
import SponsorMarquee from "@/components/SponsorMarquee";
import heroBg from "@/assets/hero-bg.jpg";
import piratesLogo from "@/assets/pirates-logo.png";
import { ArrowRight, ShoppingBag, Send, ArrowUpRight, Calendar } from "lucide-react";

const Index = () => {
  const { t } = useLanguage();
  const { data: matches } = useMatches();
  const { data: cmsNews } = useNews();
  const { data: teamsData } = useTeams();
  const { data: playersData } = usePlayers();
  const { data: coachesData } = useCoaches();

  const players = playersData || [];
  const coaches = coachesData || [];
  const teams = (teamsData || []).slice(0, 3);
  const upcoming = (matches || []).filter((m: any) =>
    (m.status || (m.pirates_score == null && m.scoreUs == null ? "upcoming" : "")) === "upcoming"
  ).slice(0, 3);
  const news = (cmsNews || []).slice(0, 3);
  const featuredPlayers = players.slice(0, 8);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-screen min-h-[700px] overflow-hidden flex items-center justify-center">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative z-10 text-center px-4 animate-slide-up">
          <img src={piratesLogo} alt="Pirates" className="w-28 h-28 md:w-40 md:h-40 mx-auto mb-6 object-contain drop-shadow-2xl animate-float" />
          <p className="text-accent text-xs md:text-sm font-bold uppercase tracking-[0.4em] mb-4">
            {t("Сагсан бөмбөгийн клуб", "Basketball Club")}
          </p>
          <h1 className="font-display text-6xl md:text-[140px] font-bold uppercase tracking-tighter leading-none mb-6 text-foreground">
            Pirates
          </h1>
          <p className="text-foreground/50 max-w-xl mx-auto mb-10 text-sm md:text-base">
            {t(
              "Эрэгтэй, эмэгтэй, U21, U19, U17, U15 болон академи — нэгдмэл нэрийн дор бэлтгэгдсэн.",
              "Men's, Women's, U21, U19, U17, U15 and Academy — competing as one club."
            )}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/teams" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/30 transition-all">
              {t("Багуудыг үзэх", "View Teams")} <ArrowRight size={14} />
            </Link>
            <Link to="/news" className="inline-flex items-center gap-2 border border-foreground/20 text-foreground px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-foreground/5 transition-all">
              {t("Сүүлийн мэдээ", "Latest News")}
            </Link>
            <Link to="/merch" className="inline-flex items-center gap-2 border border-foreground/20 text-foreground px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-foreground/5 transition-all">
              <ShoppingBag size={14} /> {t("Мерчант", "Shop")}
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-foreground/20 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-2.5 rounded-full bg-accent animate-pulse" />
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <SponsorMarquee />

      {/* Featured Teams */}
      {teams.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-2">{t("Манай", "Our")}</p>
                <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight">{t("Багууд", "Teams")}</h2>
              </div>
              <Link to="/teams" className="text-accent text-xs font-bold uppercase tracking-widest hover:gap-2 inline-flex items-center gap-1 transition-all">
                {t("Бүгд", "View all")} <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {teams.map((tm: any, i: number) => {
                const n = teamName(tm);
                const pc = players.filter((p: any) => playerTeamName(p) === n).length;
                const c = coaches.find((c: any) => coachTeamName(c) === n);
                return (
                  <TeamCard
                    key={tm.id}
                    team={tm}
                    playerCount={pc}
                    coachName={c?.name_mn || c?.name_en || c?.name}
                    index={i}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Games */}
      {upcoming.length > 0 && (
        <section className="gradient-section py-20">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-2">{t("Удахгүй", "Upcoming")}</p>
                <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight">{t("Тэмцээн", "Games")}</h2>
              </div>
              <Link to="/matches" className="text-accent text-xs font-bold uppercase tracking-widest hover:gap-2 inline-flex items-center gap-1 transition-all">
                {t("Хуваарь", "Schedule")} <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {upcoming.map((m: any) => <MatchRow key={m.id} match={m} />)}
            </div>
          </div>
        </section>
      )}

      {/* Featured Players */}
      {featuredPlayers.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-2">{t("Танилц", "Meet the")}</p>
                <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight">{t("Тоглогчид", "Roster")}</h2>
              </div>
              <Link to="/teams" className="text-accent text-xs font-bold uppercase tracking-widest hover:gap-2 inline-flex items-center gap-1 transition-all">
                {t("Бүх багууд", "All rosters")} <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {featuredPlayers.map((p: any, i: number) => <PlayerCard key={p.id} player={p} index={i} />)}
            </div>
          </div>
        </section>
      )}

      {/* Latest News */}
      {news.length > 0 && (
        <section className="gradient-section py-20">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-2">{t("Сүүлийн", "Latest")}</p>
                <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight">{t("Мэдээ", "News")}</h2>
              </div>
              <Link to="/news" className="text-accent text-xs font-bold uppercase tracking-widest hover:gap-2 inline-flex items-center gap-1 transition-all">
                {t("Бүгд", "View all")} <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {news.map((item: any, i: number) => {
                const cover = pickImage(item.coverImage) || pickImage(item.image);
                const date = item.publishedDate || item.date || item.publishedAt?.slice(0, 10);
                return (
                  <Link
                    key={item.id}
                    to={`/news/${encodeURIComponent(newsSlug(item))}`}
                    className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-accent/40 transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="aspect-video bg-muted overflow-hidden relative">
                      <img src={cover ? getImageUrl(cover) : heroBg} alt="" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                    </div>
                    <div className="p-5">
                      {date && (
                        <p className="text-xs text-foreground/40 inline-flex items-center gap-1.5 mb-2">
                          <Calendar size={12} className="text-accent" /> {date}
                        </p>
                      )}
                      <h3 className="font-bold text-foreground group-hover:text-accent transition-colors mb-3">
                        {t(item.title_mn, item.title_en) || item.title}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-accent text-xs font-bold uppercase tracking-widest">
                        {t("Дэлгэрэнгүй", "Read")} <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="relative py-24 overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-background/80" />
        <div className="relative z-10 text-center px-4">
          <p className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-4">{t("Хамтрагч", "Partner")}</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight text-foreground mb-3">
            {t("Бидэнтэй хамтран ажиллах", "Partner with us")}
          </h2>
          <p className="text-foreground/50 mb-8 max-w-lg mx-auto">
            {t("Спонсорчлол, хамтын ажиллагааны санал хүсэлтийг хүлээн авна.", "Sponsorship, collaboration and partnership inquiries.")}
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/30 transition-all">
            {t("Холбоо барих", "Contact us")} <Send size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
