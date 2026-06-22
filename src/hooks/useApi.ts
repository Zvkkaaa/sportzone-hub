import { useQuery } from "@tanstack/react-query";
import {
  fetchPlayers, fetchCoaches, fetchMatches, fetchGalleries, fetchMerchandises,
  fetchStandings, fetchNews, fetchTeams, fetchSponsors,
  fetchTeam, fetchPlayer, fetchNewsItem,
} from "@/lib/api";

export const usePlayers = () => useQuery({ queryKey: ["players"], queryFn: fetchPlayers });
export const useCoaches = () => useQuery({ queryKey: ["coaches"], queryFn: fetchCoaches });
export const useMatches = () => useQuery({ queryKey: ["matches"], queryFn: fetchMatches });
export const useGalleries = () => useQuery({ queryKey: ["galleries"], queryFn: fetchGalleries });
export const useMerchandises = () => useQuery({ queryKey: ["merchandises"], queryFn: fetchMerchandises });
export const useStandings = () => useQuery({ queryKey: ["standings"], queryFn: fetchStandings });
export const useNews = () => useQuery({ queryKey: ["news"], queryFn: fetchNews });
export const useTeams = () => useQuery({ queryKey: ["teams"], queryFn: fetchTeams });
export const useSponsors = () => useQuery({ queryKey: ["sponsors"], queryFn: fetchSponsors });

export const useTeam = (slug: string) =>
  useQuery({ queryKey: ["team", slug], queryFn: () => fetchTeam(slug), enabled: !!slug });
export const usePlayer = (slug: string) =>
  useQuery({ queryKey: ["player", slug], queryFn: () => fetchPlayer(slug), enabled: !!slug });
export const useNewsItem = (slug: string) =>
  useQuery({ queryKey: ["newsItem", slug], queryFn: () => fetchNewsItem(slug), enabled: !!slug });
