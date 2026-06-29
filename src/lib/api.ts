import { mockData } from "./mockData";

const RAW = (import.meta.env.VITE_STRAPI_URL as string | undefined) || "";
const STRAPI_BASE = RAW.replace(/\/$/, "");
const USE_MOCK = !STRAPI_BASE;

export const getImageUrl = (url: string | undefined | null) => {
  if (!url) return "/placeholder.svg";
  if (url.startsWith("http") || url.startsWith("data:")) return url;
  if (!STRAPI_BASE) return url;
  return `${STRAPI_BASE}${url}`;
};

export const pickImage = (field: any): string | undefined => {
  if (!field) return undefined;
  if (typeof field === "string") return field;
  if (field.url) return field.url;
  if (field.data?.attributes?.url) return field.data.attributes.url;
  if (Array.isArray(field) && field[0]?.url) return field[0].url;
  if (field.data && Array.isArray(field.data) && field.data[0]?.attributes?.url)
    return field.data[0].attributes.url;
  return undefined;
};

export const pickImages = (field: any): string[] => {
  if (!field) return [];
  if (Array.isArray(field)) return field.map((f: any) => f.url || f).filter(Boolean);
  if (field.data && Array.isArray(field.data))
    return field.data.map((f: any) => f.attributes?.url || f.url).filter(Boolean);
  if (field.url) return [field.url];
  return [];
};

export const normalize = (entry: any): any => {
  if (!entry) return entry;
  if (entry.attributes) return { id: entry.id, ...entry.attributes };
  return entry;
};

async function fetchAPI<T = any>(endpoint: string, query = "populate=*"): Promise<T[]> {
  if (USE_MOCK) return (mockData[endpoint] || []) as T[];
  try {
    const res = await fetch(`${STRAPI_BASE}/api/${endpoint}?${query}`);
    if (!res.ok) {
      if (res.status === 404) return (mockData[endpoint] || []) as T[];
      throw new Error(`Failed to fetch ${endpoint}`);
    }
    const json = await res.json();
    const arr = json.data || [];
    if (!arr.length && mockData[endpoint]?.length) return mockData[endpoint] as T[];
    return arr.map(normalize);
  } catch {
    return (mockData[endpoint] || []) as T[];
  }
}

async function fetchOne<T = any>(endpoint: string, slug: string): Promise<T | null> {
  if (USE_MOCK) {
    const list = mockData[endpoint] || [];
    return (list.find((x: any) => x.slug === slug || String(x.id) === slug || x.documentId === slug) as T) || null;
  }
  const tryUrls = [
    `${STRAPI_BASE}/api/${endpoint}?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`,
    `${STRAPI_BASE}/api/${endpoint}/${encodeURIComponent(slug)}?populate=*`,
  ];
  for (const url of tryUrls) {
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const json = await res.json();
      const data = Array.isArray(json.data) ? json.data[0] : json.data;
      if (data) return normalize(data);
    } catch {/* try next */}
  }
  // Fallback to mock
  const list = mockData[endpoint] || [];
  return (list.find((x: any) => x.slug === slug || String(x.id) === slug || x.documentId === slug) as T) || null;
}

export const fetchTeams = () => fetchAPI("teams");
export const fetchTeamBySlug = (slug: string) => fetchOne("teams", slug);
export const fetchPlayers = () => fetchAPI("players");
export const fetchPlayerBySlug = (slug: string) => fetchOne("players", slug);
export const fetchCoaches = () => fetchAPI("coaches");
export const fetchGames = () => fetchAPI("games");
export const fetchNews = () => fetchAPI("news");
export const fetchNewsBySlug = (slug: string) => fetchOne("news", slug);
export const fetchSponsors = () => fetchAPI("sponsors");
export const fetchGalleries = () => fetchAPI("galleries");
export const fetchMerchandises = () => fetchAPI("merchandises");
export const fetchStandings = () => fetchAPI("standings");

// Back-compat aliases for existing call sites
export const fetchMatches = fetchGames;
export const fetchTeam = fetchTeamBySlug;
export const fetchPlayer = fetchPlayerBySlug;
export const fetchNewsItem = fetchNewsBySlug;
