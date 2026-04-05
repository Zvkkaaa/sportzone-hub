const API_BASE = "http://35.220.201.97:1337";

export const getImageUrl = (url: string | undefined) => {
  if (!url) return "/placeholder.svg";
  if (url.startsWith("http")) return url;
  return `${API_BASE}${url}`;
};

async function fetchAPI<T>(endpoint: string): Promise<T[]> {
  const res = await fetch(`${API_BASE}/api/${endpoint}?populate=*`);
  if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
  const json = await res.json();
  return json.data || [];
}

export const fetchPlayers = () => fetchAPI<any>("players");
export const fetchCoaches = () => fetchAPI<any>("coaches");
export const fetchMatches = () => fetchAPI<any>("matches");
export const fetchGalleries = () => fetchAPI<any>("galleries");
