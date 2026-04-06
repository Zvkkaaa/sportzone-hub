const STRAPI_BASE = "https://colorquest.space";

export const getImageUrl = (url: string | undefined) => {
  if (!url) return "/placeholder.svg";
  if (url.startsWith("http")) return url;
  // Use proxy for images too
  return `${STRAPI_BASE}${url}`;
};

async function fetchAPI<T>(endpoint: string): Promise<T[]> {
  const res = await fetch(`${STRAPI_BASE}/api/${endpoint}?populate=*`);
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
