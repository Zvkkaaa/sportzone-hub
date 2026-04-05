const STRAPI_BASE = "http://35.220.201.97:1337";

// Use proxy in dev, direct URL otherwise
const getApiBase = () => {
  if (typeof window !== "undefined" && window.location.protocol === "https:") {
    // In production/preview on HTTPS, use proxy path
    return "/strapi";
  }
  return STRAPI_BASE;
};

export const getImageUrl = (url: string | undefined) => {
  if (!url) return "/placeholder.svg";
  if (url.startsWith("http")) return url;
  return `${STRAPI_BASE}${url}`;
};

async function fetchAPI<T>(endpoint: string): Promise<T[]> {
  const base = getApiBase();
  const res = await fetch(`${base}/api/${endpoint}?populate=*`);
  if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
  const json = await res.json();
  return json.data || [];
}

export const fetchPlayers = () => fetchAPI<any>("players");
export const fetchCoaches = () => fetchAPI<any>("coaches");
export const fetchMatches = () => fetchAPI<any>("matches");
export const fetchGalleries = () => fetchAPI<any>("galleries");
