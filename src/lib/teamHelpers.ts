import { pickImage, pickImages } from "@/lib/api";

/** Slug used in URLs. Prefer real slug, fall back to documentId, then id. */
export const teamSlug = (t: any): string =>
  t?.slug || t?.documentId || String(t?.id || "");

export const playerSlug = (p: any): string =>
  p?.slug || p?.documentId || String(p?.id || "");

export const newsSlug = (n: any): string =>
  n?.slug || n?.documentId || String(n?.id || "");

/** Get a player's team name from many possible relation shapes. */
export const playerTeamName = (p: any): string => {
  const t = p?.team;
  if (!t) return p?.team_name || p?.team_category || p?.category || "";
  if (Array.isArray(t)) return t[0]?.name || t[0]?.team_name || "";
  if (t.data?.attributes) return t.data.attributes.name || t.data.attributes.team_name || "";
  return t.name || t.team_name || "";
};

export const coachTeamName = (c: any): string => playerTeamName(c);

/** Extract first team relation for a player as an object (or null). */
export const playerTeamRef = (p: any): any => {
  const t = p?.team;
  if (!t) return null;
  if (Array.isArray(t)) return t[0] || null;
  if (t.data?.attributes) return { id: t.data.id, ...t.data.attributes };
  return t;
};

export const teamName = (t: any): string =>
  t?.name || t?.team_name || t?.title || "Team";

export const teamCategory = (t: any): string =>
  t?.category || t?.age_category || t?.team_category || "";

export const teamGender = (t: any): string => t?.gender || "";

export const teamSeason = (t: any): string => t?.season || "";

export const teamDescription = (t: any): string =>
  t?.description || t?.description_en || t?.description_mn || t?.bio || "";

export const teamLogo = (t: any): string | undefined =>
  pickImage(t?.logo) || pickImage(t?.image);

export const teamBanner = (t: any): string | undefined =>
  pickImage(t?.bannerImage) || pickImage(t?.banner) || pickImage(t?.teamImage) || pickImage(t?.image);

export const teamPhoto = (t: any): string | undefined =>
  pickImage(t?.teamImage) || pickImage(t?.image) || pickImage(t?.bannerImage);

export const teamGalleryImages = (t: any): string[] => {
  return pickImages(t?.gallery) || pickImages(t?.galleryImages) || [];
};

export const teamPrimaryColor = (t: any): string | undefined =>
  t?.primaryColor || t?.primary_color || undefined;

export { pickImage, pickImages };
