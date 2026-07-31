const RAW = (import.meta.env.VITE_STRAPI_URL as string | undefined) || "";
const STRAPI_BASE = RAW.replace(/\/$/, "");

const requireStrapiBase = () => {
  if (!STRAPI_BASE) {
    throw new Error("PI_URL is required. Point it at your Strapi instance.");
  }
  return STRAPI_BASE;
};

export const getImageUrl = (url: string | undefined | null) => {
  if (!url) return "/placeholder.svg";
  if (url.startsWith("http") || url.startsWith("data:")) return url;
  const base = STRAPI_BASE;
  return base ? `${base}${url}` : url;
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
  try {
    const res = await fetch(`${requireStrapiBase()}/api/${endpoint}?${query}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch ${endpoint} (${res.status})`);
    }
    const json = await res.json();
    const arr = json.data || [];
    return arr.map(normalize);
  } catch (error) {
    throw error instanceof Error ? error : new Error(`Failed to fetch ${endpoint}`);
  }
}

async function fetchOne<T = any>(endpoint: string, slug: string): Promise<T | null> {
  const base = requireStrapiBase();
  const tryUrls = [
    `${base}/api/${endpoint}?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`,
    `${base}/api/${endpoint}/${encodeURIComponent(slug)}?populate=*`,
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
  return null;
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
