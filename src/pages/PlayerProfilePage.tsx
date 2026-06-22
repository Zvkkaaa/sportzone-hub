import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { usePlayers } from "@/hooks/useApi";
import { getImageUrl, pickImage, pickImages } from "@/lib/api";
import { playerSlug, playerTeamName, teamSlug } from "@/lib/teamHelpers";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ChevronLeft } from "lucide-react";

const PlayerProfilePage = () => {
  const { slug } = useParams();
  const { t } = useLanguage();
  const { data, isLoading } = usePlayers();

  const decoded = decodeURIComponent(slug || "");
  const player = useMemo(
    () => (data || []).find((p: any) =>
      playerSlug(p) === decoded || String(p.id) === decoded || String(p.documentId) === decoded
    ),
    [data, decoded]
  );

  if (isLoading) return <div className="pt-20"><LoadingSpinner /></div>;
  if (!player) {
    return (
      <div className="pt-32 container mx-auto px-4 text-center">
        <p className="text-foreground/40 mb-4">{t("Тоглогч олдсонгүй", "Player not found")}</p>
        <Link to="/teams" className="text-accent text-sm font-bold uppercase tracking-widest">
          {t("Багууд руу буцах", "Back to teams")}
        </Link>
      </div>
    );
  }

  const photo = pickImage(player.photo) || pickImage(player.image);
  const name = t(player.name_mn, player.name_en) || player.fullName || player.full_name || "Player";
  const position = t(player.position_mn, player.position_en) || player.position || "";
  const number = player.jerseyNumber ?? player.jersey_number ?? player.number;
  const team = playerTeamName(player);
  const bio = t(player.bio_mn, player.bio_en) || player.biography || "";
  const stats = player.statistics || player.stats;
  const achievements: any[] = player.achievements || [];
  const gallery = pickImages(player.gallery);

  const vitals = [
    { label: t("Өндөр", "Height"), v: player.height },
    { label: t("Жин", "Weight"), v: player.weight },
    { label: t("Нас", "Age"), v: player.age },
    { label: t("Төрсөн", "Born"), v: player.birthDate || player.birth_date },
    { label: t("Иргэн", "Nationality"), v: player.nationality },
    { label: t("Байр", "Position"), v: position },
  ].filter((x) => x.v);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-24 pb-12 overflow-hidden gradient-team-hero">
        <div className="container mx-auto px-4">
          {team && (
            <Link to="/teams" className="inline-flex items-center gap-2 text-foreground/50 hover:text-accent text-xs font-bold uppercase tracking-widest mb-6 transition-colors">
              <ChevronLeft size={16} /> {team}
            </Link>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 items-end">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-muted border border-border max-w-md">
              <img src={getImageUrl(photo)} alt={name} className="w-full h-full object-cover" />
            </div>
            <div>
              {team && (
                <p className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-3">{team}</p>
              )}
              <div className="flex items-start gap-6 mb-4">
                {number != null && (
                  <span className="font-display text-7xl md:text-9xl font-bold text-accent leading-none">
                    {number}
                  </span>
                )}
                <div className="pt-2">
                  <h1 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight text-foreground">
                    {name}
                  </h1>
                  {position && (
                    <p className="text-foreground/60 text-sm uppercase tracking-widest mt-2 font-bold">{position}</p>
                  )}
                </div>
              </div>

              {vitals.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 mt-6 max-w-lg">
                  {vitals.map((v) => (
                    <div key={v.label}>
                      <p className="text-foreground/40 text-[10px] uppercase tracking-widest">{v.label}</p>
                      <p className="text-foreground font-bold">{v.v}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 space-y-12">
        {bio && (
          <section>
            <h2 className="text-foreground/40 text-xs font-bold uppercase tracking-widest mb-4">{t("Намтар", "Biography")}</h2>
            <p className="text-foreground/70 leading-relaxed max-w-3xl">{bio}</p>
          </section>
        )}

        {stats && typeof stats === "object" && Object.keys(stats).length > 0 && (
          <section>
            <h2 className="text-foreground/40 text-xs font-bold uppercase tracking-widest mb-4">{t("Статистик", "Season Statistics")}</h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {Object.entries(stats).map(([k, v]) => (
                <div key={k} className="bg-card border border-border rounded-2xl p-4 text-center">
                  <div className="font-display text-3xl font-bold text-foreground">{String(v)}</div>
                  <div className="text-[10px] uppercase tracking-widest text-foreground/40 mt-1">{k}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {achievements.length > 0 && (
          <section>
            <h2 className="text-foreground/40 text-xs font-bold uppercase tracking-widest mb-4">{t("Амжилт", "Achievements")}</h2>
            <ul className="space-y-2">
              {achievements.map((a: any, i: number) => (
                <li key={i} className="bg-card border border-border rounded-xl px-4 py-3 text-foreground/80 text-sm">
                  {typeof a === "string" ? a : a.title || a.name}
                </li>
              ))}
            </ul>
          </section>
        )}

        {gallery.length > 0 && (
          <section>
            <h2 className="text-foreground/40 text-xs font-bold uppercase tracking-widest mb-4">{t("Зураг", "Gallery")}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {gallery.map((url, i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden bg-muted">
                  <img src={getImageUrl(url)} alt="" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" loading="lazy" />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default PlayerProfilePage;
