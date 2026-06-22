import { useMemo, useState, CSSProperties } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { usePlayers, useCoaches, useTeams, useMatches, useNews, useGalleries } from "@/hooks/useApi";
import { getImageUrl } from "@/lib/api";
import {
  teamName, teamSlug, teamCategory, teamSeason, teamDescription, teamBanner,
  teamLogo, teamPrimaryColor, playerTeamName, coachTeamName, newsSlug,
} from "@/lib/teamHelpers";
import PlayerCard from "@/components/PlayerCard";
import CoachCard from "@/components/CoachCard";
import MatchRow from "@/components/MatchRow";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChevronLeft, Calendar, Trophy, Users } from "lucide-react";

const hexToHsl = (hex: string): string | null => {
  const m = hex.replace("#", "").match(/.{1,2}/g);
  if (!m || m.length < 3) return null;
  const [r, g, b] = m.map((x) => parseInt(x, 16) / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0; const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
};

const TeamDetailPage = () => {
  const { teamId } = useParams();
  const location = useLocation();
  const { t } = useLanguage();
  const { data: teamsData } = useTeams();
  const { data: playersData, isLoading: pl } = usePlayers();
  const { data: coachesData, isLoading: cl } = useCoaches();
  const { data: matchesData } = useMatches();
  const { data: newsData } = useNews();
  const { data: galleriesData } = useGalleries();

  const decoded = decodeURIComponent(teamId || "");
  const stateName = (location.state as any)?.teamName as string | undefined;

  const team = useMemo(() => {
    return (teamsData || []).find((tm: any) =>
      teamSlug(tm) === decoded ||
      String(tm.id) === decoded ||
      String(tm.documentId) === decoded ||
      teamName(tm) === decoded
    );
  }, [teamsData, decoded]);

  const name = team ? teamName(team) : (stateName || decoded);
  const banner = team ? teamBanner(team) : undefined;
  const logo = team ? teamLogo(team) : undefined;
  const category = team ? teamCategory(team) : "";
  const season = team ? teamSeason(team) : "";
  const desc = team ? teamDescription(team) : "";
  const primary = team ? teamPrimaryColor(team) : undefined;
  const hsl = primary ? hexToHsl(primary) : null;
  const style = hsl ? ({ "--team-accent": hsl } as CSSProperties) : undefined;

  const players = useMemo(
    () => (playersData || []).filter((p: any) => playerTeamName(p) === name),
    [playersData, name]
  );
  const coaches = useMemo(
    () => (coachesData || []).filter((c: any) => coachTeamName(c) === name),
    [coachesData, name]
  );
  const matches = useMemo(
    () => (matchesData || []).filter((m: any) => {
      const tn = m.team?.name || m.team?.team_name || m.team_name || "";
      return !tn || tn === name;
    }),
    [matchesData, name]
  );
  const upcoming = matches.filter((m: any) => (m.status || (m.pirates_score == null ? "upcoming" : "")) === "upcoming");
  const results = matches.filter((m: any) => m.status !== "upcoming" && (m.pirates_score != null || m.scoreUs != null));
  const news = useMemo(
    () => (newsData || []).filter((n: any) => {
      const tn = n.relatedTeam?.name || n.related_team?.name || "";
      return !tn || tn === name;
    }),
    [newsData, name]
  );
  const galleryImages = useMemo(() => {
    const arr: string[] = [];
    (galleriesData || []).forEach((g: any) => {
      const tn = g.team?.name || g.team?.team_name || "";
      if (tn && tn !== name) return;
      const imgs = g.images || g.photos || [];
      const list = Array.isArray(imgs) ? imgs : imgs?.data || [];
      list.forEach((img: any) => {
        const url = img.url || img.attributes?.url;
        if (url) arr.push(url);
      });
    });
    return arr;
  }, [galleriesData, name]);

  const wins = results.filter((m: any) => (m.scoreUs ?? m.pirates_score) > (m.scoreThem ?? m.opponent_score)).length;
  const losses = results.filter((m: any) => (m.scoreUs ?? m.pirates_score) < (m.scoreThem ?? m.opponent_score)).length;

  if (pl || cl) return <div className="pt-20"><LoadingSpinner /></div>;

  return (
    <div className="min-h-screen bg-background" style={style}>
      {/* Hero banner */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        {banner && (
          <img
            src={getImageUrl(banner)}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
        )}
        <div className="absolute inset-0 gradient-team-hero" />
        <div className="relative z-10 container mx-auto px-4">
          <Link to="/teams" className="inline-flex items-center gap-2 text-foreground/50 hover:text-team text-xs font-bold uppercase tracking-widest mb-8 transition-colors">
            <ChevronLeft size={16} /> {t("Багууд", "Teams")}
          </Link>

          <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
            {logo && (
              <img src={getImageUrl(logo)} alt="" className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-2xl" />
            )}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                {category && (
                  <span className="bg-team text-accent-foreground text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                    {category}
                  </span>
                )}
                {season && (
                  <span className="border border-foreground/20 text-foreground/60 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    {season}
                  </span>
                )}
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tight text-foreground">
                {name}
              </h1>
              {desc && (
                <p className="text-foreground/60 max-w-2xl mt-4">{desc}</p>
              )}
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3 md:gap-6">
              <div className="text-center">
                <div className="font-display text-3xl md:text-4xl font-bold text-team">{players.length}</div>
                <div className="text-[10px] uppercase tracking-widest text-foreground/40 mt-1 inline-flex items-center gap-1"><Users size={10}/> {t("Тоглогч", "Players")}</div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl md:text-4xl font-bold text-foreground">{wins}<span className="text-foreground/30">-</span>{losses}</div>
                <div className="text-[10px] uppercase tracking-widest text-foreground/40 mt-1 inline-flex items-center gap-1"><Trophy size={10}/> W-L</div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl md:text-4xl font-bold text-foreground">{upcoming.length}</div>
                <div className="text-[10px] uppercase tracking-widest text-foreground/40 mt-1 inline-flex items-center gap-1"><Calendar size={10}/> {t("Тэмцээн", "Games")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="container mx-auto px-4 py-10">
        <Tabs defaultValue="roster" className="w-full">
          <TabsList className="bg-card border border-border rounded-full p-1 mb-8 flex flex-wrap h-auto">
            {[
              { v: "roster", l: t("Тоглогчид", "Roster") },
              { v: "coaches", l: t("Дасгалжуулагчид", "Coaches") },
              { v: "schedule", l: t("Хуваарь", "Schedule") },
              { v: "results", l: t("Үр дүн", "Results") },
              { v: "news", l: t("Мэдээ", "News") },
              { v: "gallery", l: t("Зураг", "Gallery") },
            ].map((tab) => (
              <TabsTrigger
                key={tab.v}
                value={tab.v}
                className="text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full data-[state=active]:bg-team data-[state=active]:text-accent-foreground"
              >
                {tab.l}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="roster">
            {players.length === 0 ? (
              <p className="text-foreground/40 text-center py-12">{t("Тоглогч алга", "No players yet")}</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {players.map((p: any, i: number) => <PlayerCard key={p.id} player={p} index={i} />)}
              </div>
            )}
          </TabsContent>

          <TabsContent value="coaches">
            {coaches.length === 0 ? (
              <p className="text-foreground/40 text-center py-12">{t("Дасгалжуулагч алга", "No coaches yet")}</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {coaches.map((c: any, i: number) => <CoachCard key={c.id} coach={c} index={i} />)}
              </div>
            )}
          </TabsContent>

          <TabsContent value="schedule">
            {upcoming.length === 0 ? (
              <p className="text-foreground/40 text-center py-12">{t("Тэмцээний хуваарь алга", "No upcoming games")}</p>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {upcoming.map((m: any) => <MatchRow key={m.id} match={m} />)}
              </div>
            )}
          </TabsContent>

          <TabsContent value="results">
            {results.length === 0 ? (
              <p className="text-foreground/40 text-center py-12">{t("Үр дүн алга", "No results yet")}</p>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {results.map((m: any) => <MatchRow key={m.id} match={m} />)}
              </div>
            )}
          </TabsContent>

          <TabsContent value="news">
            {news.length === 0 ? (
              <p className="text-foreground/40 text-center py-12">{t("Мэдээ алга", "No news yet")}</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((n: any) => {
                  const img = n.coverImage?.url || n.image?.url;
                  return (
                    <Link key={n.id} to={`/news/${encodeURIComponent(newsSlug(n))}`} className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-accent/40 transition-all">
                      <div className="aspect-video bg-muted overflow-hidden">
                        {img && <img src={getImageUrl(img)} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />}
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-foreground group-hover:text-accent transition-colors">
                          {t(n.title_mn, n.title_en) || n.title}
                        </h3>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="gallery">
            {galleryImages.length === 0 ? (
              <p className="text-foreground/40 text-center py-12">{t("Зураг алга", "No photos yet")}</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {galleryImages.map((url, i) => (
                  <div key={i} className="aspect-square overflow-hidden rounded-xl bg-muted">
                    <img src={getImageUrl(url)} alt="" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" loading="lazy" />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default TeamDetailPage;
