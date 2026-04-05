import { useQuery } from "@tanstack/react-query";
import { fetchPlayers, fetchCoaches, fetchMatches, fetchGalleries } from "@/lib/api";

export const usePlayers = () => useQuery({ queryKey: ["players"], queryFn: fetchPlayers });
export const useCoaches = () => useQuery({ queryKey: ["coaches"], queryFn: fetchCoaches });
export const useMatches = () => useQuery({ queryKey: ["matches"], queryFn: fetchMatches });
export const useGalleries = () => useQuery({ queryKey: ["galleries"], queryFn: fetchGalleries });
