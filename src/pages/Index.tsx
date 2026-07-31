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
import { ArrowRight, Send, ArrowUpRight, Calendar, Shield, Star, Trophy } from "lucide-react";

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
  const franchiseStats = [
    { label: t("Багууд", "Teams"), value: String(teamsData?.length || 0) },
    { label: t("Тоглогчид", "Players"), value: String(playersData?.length || 0) },
    { label: t("Дасгалжуулагч", "Coaches"), value: String(coachesData?.length || 0) },
    { label: t("Удахгүй тоглолт", "Upcoming"), value: String(upcoming.length) },
  ];
  const hasCMSContent = Boolean((teamsData?.length || 0) || (playersData?.length || 0) || (coachesData?.length || 0) || (matches?.length || 0) || (cmsNews?.length || 0));
  const heroFacts = [
    { label: t("Home Court", "Home Court"), value: t("Pirates Arena", "Pirates Arena") },
    { label: t("Season", "Season"), value: "2025-26" },
    { label: t("Identity", "Identity"), value: t("Basketball First", "Basketball First") },
  ];
  const identityPoints = [
    { icon: Shield, label: t("Defensive edge", "Defensive edge"), text: t("Pressure defense and smart rotations.", "Pressure defense and smart rotations.") },
    { icon: Trophy, label: t("Winning culture", "Winning culture"), text: t("Built for playoff-style intensity.", "Built for playoff-style intensity.") },
    { icon: Star, label: t("Franchise look", "Franchise look"), text: t("Dark premium visuals with bold orange accents.", "Dark premium visuals with bold orange accents.") },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[780px] overflow-hidden flex items-center">
        <div className="absolute inset-0 gradient-navy" />
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-18 mix-blend-overlay brightness-75 saturate-90" />
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute -top-24 -right-20 w-96 h-96 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
        <div className="relative z-10 container mx-auto px-4 py-24">
          <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div className="text-center lg:text-left animate-slide-up">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/8 backdrop-blur px-4 py-2 mb-5 shadow-lg shadow-black/10">
                <img src={piratesLogo} alt="Pirates" className="w-8 h-8 object-contain" />
                <p className="text-amber-300 text-[10px] md:text-xs font-bold uppercase tracking-[0.35em]">
                  {t("Сагсан бөмбөгийн клуб", "Basketball Club")}
                </p>
              </div>
              <h1 className="font-display text-5xl md:text-[120px] font-bold uppercase tracking-tighter leading-none mb-6 text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.28)]">
                Pirates
              </h1>
              <p className="text-white/72 max-w-xl mx-auto lg:mx-0 mb-10 text-sm md:text-base">
                {t(
                  "Эрэгтэй, эмэгтэй, U21, U19, U17, U15 болон академи — нэгдмэл нэрийн дор бэлтгэгдсэн.",
                  "Men's, Women's, U21, U19, U17, U15 and Academy — competing as one club."
                )}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <Link to="/teams" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20 transition-all shadow-lg shadow-accent/20">
                  {t("Багуудыг үзэх", "View Teams")} <ArrowRight size={14} />
                </Link>
                <Link to="/news" className="inline-flex items-center gap-2 border border-white/15 bg-white/8 text-white px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white/12 transition-all backdrop-blur-sm">
                  {t("Сүүлийн мэдээ", "Latest News")}
                </Link>
              </div>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl">
                {heroFacts.map((fact) => (
                  <div key={fact.label} className="rounded-2xl border border-white/10 bg-white/8 backdrop-blur-sm px-4 py-3 text-left">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-white/45 mb-1">{fact.label}</p>
                    <p className="text-lg font-bold text-white">{fact.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[2rem] border border-white/12 bg-white/8 backdrop-blur-xl p-5 shadow-[0_20px_60px_rgba(2,6,23,0.35)]">
                <div className="rounded-[1.5rem] overflow-hidden bg-slate-950 aspect-[4/5] relative">
                  <img src={heroBg} alt="" className="w-full h-full object-cover opacity-55 mix-blend-screen brightness-90 saturate-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-90" />
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/55">
                      {t("Franchise mode", "Franchise mode")}
                    </span>
                    <span className="rounded-full bg-accent text-accent-foreground text-[10px] font-black uppercase tracking-[0.35em] px-3 py-1 shadow-lg shadow-accent/30">
                      {hasCMSContent ? t("Live CMS", "Live CMS") : t("Build roster", "Build roster")}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 space-y-4">
                    <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/82 backdrop-blur-sm p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.35em] text-white/45 mb-1">
                            {t("Pirates Basketball Club", "Pirates Basketball Club")}
                          </p>
                          <h3 className="font-display text-2xl font-bold uppercase text-white tracking-tight">
                            {t("Premium Team Hub", "Premium Team Hub")}
                          </h3>
                        </div>
                        <div className="w-14 h-14 rounded-full bg-white/8 border border-white/10 flex items-center justify-center">
                          <img src={piratesLogo} alt="" className="w-8 h-8 object-contain" />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {heroFacts.map((item) => (
                          <div key={item.label} className="rounded-2xl border border-white/10 bg-white/6 px-3 py-4">
                            <p className="text-[10px] uppercase tracking-[0.3em] text-white/45 mb-2">{item.label}</p>
                            <p className="font-display text-lg md:text-xl font-bold text-white leading-tight">{item.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {identityPoints.map(({ icon: Icon, label, text }) => (
                        <div key={label} className="rounded-2xl border border-white/10 bg-white/7 backdrop-blur-sm p-4 flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                            <Icon size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">{label}</p>
                            <p className="text-xs text-white/65 mt-1 leading-relaxed">{text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
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
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
              <div className="max-w-2xl">
                <p className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-2">{t("Манай", "Our")}</p>
                <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight">{t("Багууд", "Teams")}</h2>
                <p className="text-foreground/50 mt-3 max-w-xl">
                  {t(
                    "Pirates Basketball Club-ийн бүх багуудыг нэг дороос үзэж, roster, coach, season мэдээллийг хурдан шалгаарай.",
                    "Explore every Pirates Basketball Club roster in one place with coach, season and team detail."
                  )}
                </p>
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
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
              <div className="max-w-2xl">
                <p className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-2">{t("Удахгүй", "Upcoming")}</p>
                <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight">{t("Тэмцээн", "Games")}</h2>
                <p className="text-foreground/50 mt-3">
                  {t(
                    "Айлчлал, гэрийн тоглолт, live score, arena information зэрэг мэдээллүүдийг Strapi-ээс харуулна.",
                    "Show home and away fixtures, live scores and arena details powered by Strapi."
                  )}
                </p>
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
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
              <div className="max-w-2xl">
                <p className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-2">{t("Танилц", "Meet the")}</p>
                <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight">{t("Тоглогчид", "Roster")}</h2>
                <p className="text-foreground/50 mt-3">
                  {t(
                    "Jersey number, position, height, age and nationality-ийг нэг дор харуулсан roster хэсэг.",
                    "A roster section that highlights jersey number, position, height, age and nationality."
                  )}
                </p>
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
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
              <div className="max-w-2xl">
                <p className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-2">{t("Сүүлийн", "Latest")}</p>
                <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight">{t("Мэдээ", "News")}</h2>
                <p className="text-foreground/50 mt-3">
                  {t(
                    "Клубын мэдээ, тоглолтын тайлан, roster шинэчлэл, gallery highlights-ийг эндээс авна.",
                    "Catch club news, game recaps, roster updates and gallery highlights here."
                  )}
                </p>
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

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="rounded-[2rem] border border-border bg-card overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-[360px] bg-slate-950">
                <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-45 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/70 to-accent/25" />
                <div className="relative z-10 p-8 md:p-10 h-full flex flex-col justify-between text-white">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/45 mb-3">{t("Club Identity", "Club Identity")}</p>
                    <h2 className="font-display text-4xl md:text-5xl font-bold uppercase leading-tight max-w-md">
                      {t("A modern basketball franchise experience.", "A modern basketball franchise experience.")}
                    </h2>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-8">
                    {[
                      { label: t("Teams", "Teams"), value: teamsData?.length || 0 },
                      { label: t("Players", "Players"), value: playersData?.length || 0 },
                      { label: t("Games", "Games"), value: matches?.length || 0 },
                    ].map((item) => (
                      <div key={item.label} className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm">
                        <p className="text-[10px] uppercase tracking-[0.35em] text-white/45">{item.label}</p>
                        <p className="font-display text-3xl font-bold mt-2">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-8 md:p-10 bg-card">
                <p className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-3">{t("What makes it feel premium", "What makes it feel premium")}</p>
                <div className="space-y-4">
                  {[
                    t("Large roster visuals with player cards that look like a real team profile.", "Large roster visuals with player cards that look like a real team profile."),
                    t("Dark arena colors, orange accents, and cleaner whitespace for a true sports-fan vibe.", "Dark arena colors, orange accents, and cleaner whitespace for a true sports-fan vibe."),
                    t("All content is ready for Strapi so you can swap mock content for live content anytime.", "All content is ready for Strapi so you can swap mock content for live content anytime."),
                  ].map((item, i) => (
                    <div key={i} className="rounded-2xl border border-border/70 bg-background/40 backdrop-blur-sm p-4">
                      <p className="text-sm text-foreground/70 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
