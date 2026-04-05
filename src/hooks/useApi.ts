import { useQuery } from "@tanstack/react-query";
import { fetchPlayers, fetchCoaches, fetchMatches, fetchGalleries, fetchMerchandises, fetchStandings } from "@/lib/api";

export const usePlayers = () => useQuery({ queryKey: ["players"], queryFn: fetchPlayers });
export const useCoaches = () => useQuery({ queryKey: ["coaches"], queryFn: fetchCoaches });
export const useMatches = () => useQuery({ queryKey: ["matches"], queryFn: fetchMatches });
export const useGalleries = () => useQuery({ queryKey: ["galleries"], queryFn: fetchGalleries });
export const useMerchandises = () => useQuery({ queryKey: ["merchandises"], queryFn: fetchMerchandises });
export const useStandings = () => useQuery({ queryKey: ["standings"], queryFn: fetchStandings });
