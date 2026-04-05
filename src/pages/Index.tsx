import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import heroBg from "@/assets/hero-bg.jpg";
import { usePlayers, useMatches, useGalleries } from "@/hooks/useApi";
import PlayerCard from "@/components/PlayerCard";
import MatchCard from "@/components/MatchCard";
import GalleryCard from "@/components/GalleryCard";
import StandingsTable from "@/components/StandingsTable";
import SectionTitle from "@/components/SectionTitle";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const { t } = useLanguage();
  const players = usePlayers();
  const matches = useMatches();
  const galleries = useGalleries();

  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero text-navy-foreground py-24 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('/placeholder.svg')", backgroundSize: "cover" }} />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4">
            PIRATES <span className="text-gradient">FC</span>
          </h1>
          <p className="text-lg md:text-xl text-navy-foreground/80 max-w-xl mx-auto mb-8">
            {t("Хамгийн шилдэг хөлбөмбөгийн клуб", "The Ultimate Football Club")}
          </p>
          <Link
            to="/players"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3 rounded-lg font-bold hover:bg-accent/90 transition-colors"
          >
            {t("Тоглогчдыг үзэх", "Meet the Team")} <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Standings */}
        <section>
          <SectionTitle>{t("Байр дүн", "Standings")}</SectionTitle>
          <StandingsTable />
        </section>

        {/* Featured Players */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <SectionTitle className="mb-0">{t("Тоглогчид", "Players")}</SectionTitle>
            <Link to="/players" className="text-accent font-semibold text-sm hover:underline flex items-center gap-1">
              {t("Бүгдийг үзэх", "View all")} <ArrowRight size={14} />
            </Link>
          </div>
          {players.isLoading ? <LoadingSpinner /> : players.error ? (
            <p className="text-accent text-sm">{t("Мэдээлэл ачааллахад алдаа гарлаа", "Failed to load data")}</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(players.data || []).slice(0, 4).map((p: any) => (
                <PlayerCard key={p.id} player={p} />
              ))}
            </div>
          )}
        </section>

        {/* Latest Matches */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <SectionTitle className="mb-0">{t("Тэмцээнүүд", "Matches")}</SectionTitle>
            <Link to="/matches" className="text-accent font-semibold text-sm hover:underline flex items-center gap-1">
              {t("Бүгдийг үзэх", "View all")} <ArrowRight size={14} />
            </Link>
          </div>
          {matches.isLoading ? <LoadingSpinner /> : matches.error ? (
            <p className="text-accent text-sm">{t("Мэдээлэл ачааллахад алдаа гарлаа", "Failed to load data")}</p>
          ) : (
            <div className="space-y-3">
              {(matches.data || []).slice(0, 3).map((m: any) => (
                <MatchCard key={m.id} match={m} />
              ))}
            </div>
          )}
        </section>

        {/* Gallery Preview */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <SectionTitle className="mb-0">{t("Зургийн цомог", "Gallery")}</SectionTitle>
            <Link to="/gallery" className="text-accent font-semibold text-sm hover:underline flex items-center gap-1">
              {t("Бүгдийг үзэх", "View all")} <ArrowRight size={14} />
            </Link>
          </div>
          {galleries.isLoading ? <LoadingSpinner /> : galleries.error ? (
            <p className="text-accent text-sm">{t("Мэдээлэл ачааллахад алдаа гарлаа", "Failed to load data")}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(galleries.data || []).slice(0, 3).map((g: any) => (
                <GalleryCard key={g.id} item={g} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Index;
