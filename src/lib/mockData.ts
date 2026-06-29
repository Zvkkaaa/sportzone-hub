// Clean mock basketball data used when VITE_STRAPI_URL is empty or unreachable.
// Mirrors expected Strapi v5 shape (flat attributes, slug, documentId).

const img = (url: string) => ({ url });

const HERO_COURT = "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1600";
const PORTRAIT = (seed: number) =>
  `https://images.unsplash.com/photo-${[
    "1546519638-68e109498ffc",
    "1607082348824-0a96f2a4b9da",
    "1518614846891-7d4f5fdc3c2c",
    "1571019613454-1cb2f99b2d8b",
    "1574623452334-1e0ac2b3ccb4",
    "1521412644187-c49fa049e84d",
    "1542652694-40abf526446e",
    "1519861531473-9200262188bf",
  ][seed % 8]}?w=900`;

export const mockTeams = [
  { id: 1, documentId: "mens-team", slug: "mens-team", name: "Men's Team", category: "Men", gender: "Men", season: "2025-26", description: "The flagship Pirates Basketball Club senior men's squad competing at the top level.", primaryColor: "#ea580c", logo: img("https://images.unsplash.com/photo-1519861531473-9200262188bf?w=400"), bannerImage: img(HERO_COURT) },
  { id: 2, documentId: "womens-team", slug: "womens-team", name: "Women's Team", category: "Women", gender: "Women", season: "2025-26", description: "Senior women's roster — discipline, defense and championship pedigree.", primaryColor: "#dc2626", logo: img("https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=400"), bannerImage: img("https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=1600") },
  { id: 3, documentId: "u21", slug: "u21", name: "U21", category: "U21", gender: "Men", season: "2025-26", description: "Pathway squad bridging the academy to the senior roster.", logo: img("https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=400"), bannerImage: img("https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=1600") },
  { id: 4, documentId: "u19", slug: "u19", name: "U19", category: "U19", gender: "Men", season: "2025-26", description: "Under-19 development program.", logo: img("https://images.unsplash.com/photo-1518614846891-7d4f5fdc3c2c?w=400"), bannerImage: img("https://images.unsplash.com/photo-1505666287802-931dc83a0fe4?w=1600") },
  { id: 5, documentId: "u17", slug: "u17", name: "U17", category: "U17", gender: "Men", season: "2025-26", description: "Under-17 youth squad.", logo: img("https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400"), bannerImage: img("https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?w=1600") },
  { id: 6, documentId: "u15", slug: "u15", name: "U15", category: "U15", gender: "Men", season: "2025-26", description: "Under-15 youth squad.", logo: img("https://images.unsplash.com/photo-1542652694-40abf526446e?w=400"), bannerImage: img("https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=1600") },
  { id: 7, documentId: "academy", slug: "academy", name: "Academy", category: "Academy", gender: "Mixed", season: "2025-26", description: "Foundational basketball training for the next generation of Pirates.", logo: img("https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400"), bannerImage: img("https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1600") },
];

const POS = ["PG", "SG", "SF", "PF", "C"];

const makePlayer = (i: number, teamName: string, teamSlug: string) => ({
  id: i,
  documentId: `player-${i}`,
  slug: `player-${i}`,
  fullName: `Player ${i}`,
  name_mn: `Тоглогч ${i}`,
  name_en: `Player ${i}`,
  jerseyNumber: (i % 30) + 1,
  position: POS[i % POS.length],
  height: `${180 + (i % 20)} cm`,
  weight: `${75 + (i % 25)} kg`,
  age: 18 + (i % 14),
  birthDate: `199${i % 10}-0${(i % 9) + 1}-15`,
  nationality: "Mongolia",
  biography: `A dynamic ${POS[i % POS.length]} for the ${teamName} squad — known for tireless work on both ends of the court.`,
  statistics: {
    PPG: (8 + (i % 17)).toFixed(1),
    RPG: (2 + (i % 9)).toFixed(1),
    APG: (1 + (i % 7)).toFixed(1),
    SPG: (0.4 + (i % 3) * 0.3).toFixed(1),
    BPG: (0.2 + (i % 3) * 0.4).toFixed(1),
    "FG%": `${42 + (i % 15)}%`,
    "3PT%": `${30 + (i % 12)}%`,
    "FT%": `${65 + (i % 25)}%`,
  },
  achievements: i % 4 === 0 ? ["All-League First Team", "Defensive Player of the Year"] : [],
  photo: img(PORTRAIT(i)),
  team: { id: teamSlug, name: teamName, slug: teamSlug },
});

export const mockPlayers = mockTeams.flatMap((tm, ti) =>
  Array.from({ length: tm.category === "Academy" ? 6 : 10 }, (_, k) =>
    makePlayer(ti * 12 + k + 1, tm.name, tm.slug)
  )
);

export const mockCoaches = mockTeams.map((tm, i) => ({
  id: 100 + i,
  documentId: `coach-${tm.slug}`,
  slug: `coach-${tm.slug}`,
  name: ["A. Bold", "B. Erdene", "C. Munkh", "D. Gantulga", "E. Sukh", "F. Ulzii", "G. Tuvshin"][i],
  name_mn: ["А. Болд", "Б. Эрдэнэ", "Ч. Мөнх", "Д. Гантулга", "Э. Сүх", "Ф. Үлзий", "Г. Түвшин"][i],
  name_en: ["A. Bold", "B. Erdene", "C. Munkh", "D. Gantulga", "E. Sukh", "F. Ulzii", "G. Tuvshin"][i],
  role: "Head Coach",
  role_mn: "Ахлах дасгалжуулагч",
  role_en: "Head Coach",
  biography: `Head coach of the ${tm.name} program with over a decade of basketball coaching experience.`,
  photo: img(PORTRAIT(i + 3)),
  team: { id: tm.slug, name: tm.name, slug: tm.slug },
}));

const OPPONENTS = ["Eagles BC", "Lions Hoops", "Wolves", "Sharks", "Phoenix", "Titans", "Falcons"];

export const mockGames = mockTeams.flatMap((tm, ti) =>
  Array.from({ length: 4 }, (_, k) => {
    const idx = ti * 4 + k;
    const isPast = k < 2;
    const us = isPast ? 70 + (idx % 30) : null;
    const them = isPast ? 65 + ((idx + 3) % 28) : null;
    return {
      id: 200 + idx,
      documentId: `game-${idx}`,
      team: { id: tm.slug, name: tm.name, slug: tm.slug },
      opponentName: OPPONENTS[idx % OPPONENTS.length],
      opponentLogo: img(`https://images.unsplash.com/photo-1505666287802-931dc83a0fe4?w=200&sig=${idx}`),
      date: new Date(Date.now() + (isPast ? -1 : 1) * (k + 1) * 4 * 86400000).toISOString(),
      time: "19:00",
      location: isPast ? "Away Arena" : "Pirates Arena",
      homeAway: k % 2 === 0 ? "home" : "away",
      scoreUs: us,
      scoreThem: them,
      status: isPast ? (us! > them! ? "win" : "loss") : "upcoming",
    };
  })
);

export const mockNews = Array.from({ length: 6 }, (_, i) => ({
  id: 300 + i,
  documentId: `news-${i + 1}`,
  slug: `news-${i + 1}`,
  title: `Pirates Basketball — Update ${i + 1}`,
  title_mn: `Pirates Сагсан бөмбөг — Мэдээ ${i + 1}`,
  title_en: `Pirates Basketball — Update ${i + 1}`,
  publishedDate: new Date(Date.now() - i * 86400000 * 3).toISOString().slice(0, 10),
  coverImage: img(`https://images.unsplash.com/photo-${["1546519638-68e109498ffc","1574623452334-1e0ac2b3ccb4","1518614846891-7d4f5fdc3c2c","1577471488278-16eec37ffcc2","1505666287802-931dc83a0fe4","1518609878373-06d740f60d8b"][i]}?w=1200`),
  content: `Pirates Basketball Club announces another strong week on the court. The roster continues to develop, with standout performances in points, rebounds and assists across all teams.\n\nFull recap from the coaching staff and player interviews available soon.`,
}));

export const mockSponsors = [
  { id: 1, name: "Hoops Co.", url: "#", logo: img("https://dummyimage.com/200x80/0f172a/ffffff&text=HOOPS+CO") },
  { id: 2, name: "Court Energy", url: "#", logo: img("https://dummyimage.com/200x80/ea580c/ffffff&text=COURT+ENERGY") },
  { id: 3, name: "Arena Bank", url: "#", logo: img("https://dummyimage.com/200x80/1e293b/ffffff&text=ARENA+BANK") },
  { id: 4, name: "Slam Apparel", url: "#", logo: img("https://dummyimage.com/200x80/dc2626/ffffff&text=SLAM") },
  { id: 5, name: "Pivot Media", url: "#", logo: img("https://dummyimage.com/200x80/0f172a/ffffff&text=PIVOT") },
  { id: 6, name: "Triple Threat", url: "#", logo: img("https://dummyimage.com/200x80/ea580c/ffffff&text=3X+THREAT") },
];

export const mockGalleries = [
  {
    id: 1, documentId: "gallery-1", title: "Season Tip-Off",
    images: Array.from({ length: 8 }, (_, i) => img(`https://images.unsplash.com/photo-${["1546519638-68e109498ffc","1574623452334-1e0ac2b3ccb4","1518614846891-7d4f5fdc3c2c","1577471488278-16eec37ffcc2","1505666287802-931dc83a0fe4","1518609878373-06d740f60d8b","1607082348824-0a96f2a4b9da","1571019613454-1cb2f99b2d8b"][i]}?w=900`)),
  },
];

export const mockData: Record<string, any[]> = {
  teams: mockTeams,
  players: mockPlayers,
  coaches: mockCoaches,
  games: mockGames,
  matches: mockGames,
  news: mockNews,
  newss: mockNews,
  sponsors: mockSponsors,
  galleries: mockGalleries,
  merchandises: [],
  standings: [],
};
