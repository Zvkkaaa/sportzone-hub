const STRAPI_BASE = "http://35.220.201.97:1337";

// Use proxy in preview (HTTPS), direct in local dev (HTTP)
const getApiBase = () => {
  if (typeof window !== "undefined" && window.location.protocol === "https:") {
    return "/strapi";
  }
  return STRAPI_BASE;
};

export const getImageUrl = (url: string | undefined) => {
  if (!url) return "/placeholder.svg";
  if (url.startsWith("http")) return url;
  // Use proxy for images too
  const base = getApiBase();
  return `${base}${url}`;
};

async function fetchAPI<T>(endpoint: string): Promise<T[]> {
  const base = getApiBase();
  const res = await fetch(`${base}/api/${endpoint}?populate=*`);
  if (!res.ok) {
    if (res.status === 404) return [];
    throw new Error(`Failed to fetch ${endpoint}`);
  }
  const json = await res.json();
  return json.data || [];
}

export const fetchPlayers = () => fetchAPI<any>("players");
export const fetchCoaches = () => fetchAPI<any>("coaches");
export const fetchMatches = () => fetchAPI<any>("matches");
export const fetchGalleries = () => fetchAPI<any>("galleries");
export const fetchMerchandises = () => fetchAPI<any>("merchandises");
export const fetchStandings = () => fetchAPI<any>("standings");
