# Pirates Basketball Club — NBA-Style Redesign

Goal: rebuild the site as a professional, fully CMS-driven basketball club. Nothing about teams/players/coaches/matches/news/gallery is hardcoded — Strapi is the source of truth.

## 1. Strapi content model (you create these in Strapi)

You'll need these collection types in Strapi. The frontend will read them dynamically and any new entry shows up automatically.

- **team** — name, slug, category (Men/Women/U21/U19/U17/U15/Academy), gender, logo, bannerImage, teamImage, description, season, primaryColor, players (relation), coaches (relation), matches (relation), news (relation), gallery (relation)
- **player** — fullName, slug, jerseyNumber, position, photo, team (relation), height, weight, age, birthDate, nationality, biography, statistics (JSON: ppg/rpg/apg/spg/bpg/gp), achievements (JSON list), gallery (media)
- **coach** — name, slug, photo, role, biography, team (relation)
- **match** — team (relation), opponentName, opponentLogo, date, time, location, homeAway (enum), scoreUs, scoreThem, status (upcoming/win/loss/draw)
- **news** — title, slug, coverImage, content (rich text), publishedDate, relatedTeam (relation), relatedPlayer (relation)
- **gallery** — title, images (media), team (relation), player (relation)
- **sponsor** — name, logo, url
- **standing** — teamName, played, wins, losses, points, position, league

Set Public role permissions to `find` + `findOne` for all of the above.

## 2. Frontend architecture

### Routes
```text
/                       Home
/teams                  All teams (cards)
/teams/:slug            Team detail (NBA-style, tabbed)
/players                All players (filterable)
/players/:slug          Player profile (NBA-style)
/matches                Schedule + results
/news                   News index
/news/:slug             News article
/gallery                Combined gallery
/merch                  (existing)
/contact                (existing)
```

### Data layer (`src/lib/api.ts`, `src/hooks/useApi.ts`)
- Generic `fetchAPI(endpoint, query?)` already exists — extend to support `filters` and `findOne(endpoint, slug)`.
- Add hooks: `useTeam(slug)`, `usePlayer(slug)`, `useNewsItem(slug)`, `useTeamPlayers(teamId)`, `useTeamMatches(teamId)`, `useTeamNews(teamId)`, `useTeamGallery(teamId)`, `useSponsors()`.
- Normalize Strapi v4/v5 attribute shape with a small `normalize(entry)` helper so components don't care about `.attributes` vs flat.

### Pages to build/rewrite
- **Home** — hero with club brand, featured news strip, featured teams grid (first 3 from CMS), next 3 upcoming matches, featured players carousel, sponsors marquee, CTAs.
- **TeamsPage** — full card grid: logo, team image, name, category badge, gender, head coach name, player count, short description, "View Team" CTA. All from CMS.
- **TeamDetailPage** — hero banner (team's bannerImage + logo overlay), name, season, head coach, description, quick stats (W-L, players, next game). Tabs: Roster · Coaches · Schedule · Results · News · Gallery. Tabs read from team's relations.
- **PlayerProfilePage** (new) — large hero photo, jersey number, name, team, vitals (pos/height/weight/age/DOB/nationality), bio, season stat table, achievements list, gallery.
- **MatchesPage** — schedule (upcoming) + results, filter by team, status badges.
- **NewsPage** + **NewsArticlePage** (new) — index cards + full article page with rich content, related team/player links.
- **GalleryPage** — masonry grid, lightbox, filterable by team/player.

### Components (new/refactored)
- `TeamCard`, `TeamHero`, `TeamTabs`
- `PlayerCard` (NBA card style), `PlayerStatTable`, `PlayerHero`
- `MatchRow` (schedule), `MatchResultCard`
- `NewsCard`, `NewsArticle`
- `SponsorMarquee`
- `Tabs` (use existing shadcn `tabs`)
- `Lightbox` for gallery

### Design system (`src/index.css`)
- Dark sports theme: deep navy/black base, accent red, subtle team-color accent via CSS var `--team-accent` set per team page from `team.primaryColor`.
- Bold display typography (Anton/Bebas-style via Google font) for headings, Inter for body.
- Large imagery, tight tracking, uppercase eyebrows, semantic tokens only (no hardcoded colors in components).
- Smooth hover: image zoom, card lift, accent underline.

## 3. Build order

1. Extend `api.ts`/`useApi.ts`: `findOne`, filtered queries, normalizer, new hooks (sponsors, single team/player/news).
2. Refresh design tokens in `index.css` + `tailwind.config.ts` (typography scale, team-accent var, refined dark palette).
3. Rebuild `TeamsPage` cards with full CMS fields.
4. Rebuild `TeamDetailPage` with banner + tabs (Roster/Coaches/Schedule/Results/News/Gallery).
5. New `PlayerProfilePage` + route `/players/:slug`; update `PlayerCard` to link there.
6. New `NewsArticlePage` + route `/news/:slug`; update `NewsPage` cards to link there.
7. Rebuild `MatchesPage` (schedule + results, team filter).
8. Rewrite `GalleryPage` (masonry + lightbox, team/player filter).
9. Rewrite `Index` (home) with all CMS-driven sections + sponsor marquee.
10. Polish: animations, mobile pass, empty states for missing CMS data.

## 4. Notes
- Everything tolerates empty Strapi collections — graceful empty states, no crashes (current `newss`/`standings` 404 already handled).
- Keep Mongolian/English `t()` calls; team/player names come from CMS as-is.
- No backend code added — Strapi remains the only backend.

Approve to proceed, or tell me which sections to drop/reorder.
