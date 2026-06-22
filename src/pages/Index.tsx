import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useMatches, useNews, useTeams, usePlayers, useCoaches } from "@/hooks/useApi";
import { getImageUrl, pickImage } from "@/lib/api";
import { teamName, teamSlug, playerTeamName, coachTeamName, newsSlug } from "@/lib/teamHelpers";
import TeamCard from "@/components/TeamCard";
import PlayerCard from "@/components/PlayerCard";
import MatchRow from "@/components/MatchRow";
import SponsorMarquee from "@/components/SponsorMarquee";
import heroBg from "@/assets/hero-bg-light.jpg";
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
      <section className="relative min-h-[760px] overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-slate-100" />
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-multiply brightness-110 saturate-75" />
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute -top-24 -right-20 w-96 h-96 rounded-full bg-accent/8 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 w-96 h-96 rounded-full bg-slate-300/20 blur-3xl" />
        <div className="relative z-10 container mx-auto px-4 py-24">
          <div className="max-w-5xl mx-auto grid gap-10 lg:grid-cols-[1.25fr_0.75fr] items-center">
            <div className="text-center lg:text-left animate-slide-up">
              <div className="inline-flex items-center gap-3 rounded-full border border-border bg-white/80 backdrop-blur px-4 py-2 mb-4 shadow-sm">
                <img src={piratesLogo} alt="Pirates" className="w-8 h-8 object-contain" />
                <p className="text-accent text-[10px] md:text-xs font-bold uppercase tracking-[0.35em]">
                  {t("Сагсан бөмбөгийн клуб", "Basketball Club")}
                </p>
              </div>
              <h1 className="font-display text-5xl md:text-[120px] font-bold uppercase tracking-tighter leading-none mb-6 text-foreground">
                Pirates
              </h1>
              <p className="text-foreground/60 max-w-xl mx-auto lg:mx-0 mb-10 text-sm md:text-base">
                {t(
                  "Эрэгтэй, эмэгтэй, U21, U19, U17, U15 болон академи — нэгдмэл нэрийн дор бэлтгэгдсэн.",
                  "Men's, Women's, U21, U19, U17, U15 and Academy — competing as one club."
                )}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <Link to="/teams" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20 transition-all">
                  {t("Багуудыг үзэх", "View Teams")} <ArrowRight size={14} />
                </Link>
                <Link to="/news" className="inline-flex items-center gap-2 border border-border bg-white/80 text-foreground px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white transition-all shadow-sm">
                  {t("Сүүлийн мэдээ", "Latest News")}
                </Link>
                <Link to="/merch" className="inline-flex items-center gap-2 border border-border bg-white/80 text-foreground px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white transition-all shadow-sm">
                  <ShoppingBag size={14} /> {t("Мерчант", "Shop")}
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[2rem] border border-border bg-white/75 backdrop-blur p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
                <div className="rounded-[1.5rem] overflow-hidden bg-slate-100 aspect-[4/5] relative">
                  <img src={heroBg} alt="" className="w-full h-full object-cover opacity-80 mix-blend-multiply brightness-105 saturate-90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/15 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-foreground/45 mb-2">
                      {t("Клубын уур амьсгал", "Club atmosphere")}
                    </p>
                    <p className="text-sm text-foreground/70 max-w-xs">
                      {t(
                        "Тод, цэвэр, хөдөлгөөнтэй дүрслэлтэй шинэ эхлэл.",
                        "A brighter, cleaner, more minimal first impression."
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
                      <img src={cover ? getImageUrl(cover) : heroBg} alt="" className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
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
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-multiply" />
        <div className="absolute inset-0 bg-background/88" />
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
