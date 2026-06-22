const STRAPI_BASE = "https://colorquest.space";

export const getImageUrl = (url: string | undefined | null) => {
  if (!url) return "/placeholder.svg";
  if (url.startsWith("http")) return url;
  return `${STRAPI_BASE}${url}`;
};

export const pickImage = (field: any): string | undefined => {
  if (!field) return undefined;
  // Strapi v5 flat
  if (field.url) return field.url;
  // Strapi v4 wrapped
  if (field.data?.attributes?.url) return field.data.attributes.url;
  if (Array.isArray(field) && field[0]?.url) return field[0].url;
  if (field.data && Array.isArray(field.data) && field.data[0]?.attributes?.url)
    return field.data[0].attributes.url;
  return undefined;
};

export const pickImages = (field: any): string[] => {
  if (!field) return [];
  if (Array.isArray(field)) return field.map((f) => f.url).filter(Boolean);
  if (field.data && Array.isArray(field.data))
    return field.data.map((f: any) => f.attributes?.url || f.url).filter(Boolean);
  if (field.url) return [field.url];
  return [];
};

/** Normalize a Strapi entry so consumers can access `.<field>` directly. */
export const normalize = (entry: any): any => {
  if (!entry) return entry;
  if (entry.attributes) return { id: entry.id, ...entry.attributes };
  return entry;
};

async function fetchAPI<T = any>(endpoint: string, query = "populate=*"): Promise<T[]> {
  const res = await fetch(`${STRAPI_BASE}/api/${endpoint}?${query}`);
  if (!res.ok) {
    if (res.status === 404) return [];
    throw new Error(`Failed to fetch ${endpoint}`);
  }
  const json = await res.json();
  const arr = json.data || [];
  return arr.map(normalize);
}

async function fetchOne<T = any>(endpoint: string, slug: string): Promise<T | null> {
  // Try slug filter first
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
    } catch {
      // try next
    }
  }
  return null;
}

export const fetchPlayers = () => fetchAPI("players");
export const fetchCoaches = () => fetchAPI("coaches");
export const fetchMatches = () => fetchAPI("matches");
export const fetchGalleries = () => fetchAPI("galleries");
export const fetchMerchandises = () => fetchAPI("merchandises");
export const fetchStandings = () => fetchAPI("standings");
export const fetchNews = () => fetchAPI("newss");
export const fetchTeams = () => fetchAPI("teams");
export const fetchSponsors = () => fetchAPI("sponsors");

export const fetchTeam = (slug: string) => fetchOne("teams", slug);
export const fetchPlayer = (slug: string) => fetchOne("players", slug);
export const fetchNewsItem = (slug: string) => fetchOne("newss", slug);
