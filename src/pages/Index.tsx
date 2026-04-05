import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { usePlayers, useMatches, useGalleries } from "@/hooks/useApi";
import PlayerCard from "@/components/PlayerCard";
import MatchCard from "@/components/MatchCard";
import GalleryCard from "@/components/GalleryCard";
import StandingsTable from "@/components/StandingsTable";
import SectionTitle from "@/components/SectionTitle";
import LoadingSpinner from "@/components/LoadingSpinner";
import heroBg from "@/assets/hero-bg.jpg";
import { ArrowRight, ShoppingBag } from "lucide-react";

const Index = () => {
  const { t } = useLanguage();
  const players = usePlayers();
  const matches = useMatches();
  const galleries = useGalleries();

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
        <img src={heroBg} alt="Pirates Basketball" className="absolute inset-0 w-full h-full object-cover" width={1920} height={900} />
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 relative z-10">
            <h1 className="text-7xl md:text-[120px] font-black tracking-tighter leading-none mb-2">
              <span className="text-navy-foreground">PIRATES</span>
            </h1>
            <p className="text-xl md:text-2xl text-navy-foreground/70 font-medium tracking-widest uppercase mb-8">
              {t("Сагсан бөмбөгийн баг", "Basketball Team")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/players"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-accent/90 transition-all glow-accent"
              >
                {t("Тоглогчдыг үзэх", "Meet the Team")} <ArrowRight size={16} />
              </Link>
              <Link
                to="/merch"
                className="inline-flex items-center gap-2 border border-navy-foreground/30 text-navy-foreground px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-navy-foreground/10 transition-all"
              >
                <ShoppingBag size={16} /> {t("Мерчант", "Shop Merch")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Match Results Banner */}
      {!matches.isLoading && matches.data && matches.data.length > 0 && (
        <section className="bg-card border-y border-border">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-sport-red animate-pulse" />
                <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  {t("ҮР ДҮН", "RESULTS")}
                </span>
              </div>
              <Link to="/matches" className="text-accent text-sm font-semibold hover:underline flex items-center gap-1">
                {t("Бүгдийг үзэх", "View all")} <ArrowRight size={14} />
              </Link>
            </div>
            <div className="space-y-3">
              {(matches.data).slice(0, 3).map((m: any) => (
                <MatchCard key={m.id} match={m} />
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="container mx-auto px-4 py-16 space-y-20">
        {/* Standings */}
        <section className="animate-fade-in-up">
          <SectionTitle>{t("Байр дүн", "Standings")}</SectionTitle>
          <StandingsTable />
        </section>

        {/* Players */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <SectionTitle className="mb-0">{t("Тоглогчид", "Players")}</SectionTitle>
            <Link to="/players" className="text-accent font-semibold text-sm hover:underline flex items-center gap-1 uppercase tracking-wider">
              {t("Бүгдийг үзэх", "View all")} <ArrowRight size={14} />
            </Link>
          </div>
          {players.isLoading ? <LoadingSpinner /> : players.error ? (
            <div className="bg-card rounded-xl border border-border p-8 text-center">
              <p className="text-muted-foreground">{t("Мэдээлэл ачааллахад алдаа гарлаа. Strapi серверийг шалгана уу.", "Failed to load data. Please check the Strapi server.")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(players.data || []).slice(0, 4).map((p: any) => (
                <PlayerCard key={p.id} player={p} />
              ))}
            </div>
          )}
        </section>

        {/* Gallery */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <SectionTitle className="mb-0">{t("Зургийн цомог", "Gallery")}</SectionTitle>
            <Link to="/gallery" className="text-accent font-semibold text-sm hover:underline flex items-center gap-1 uppercase tracking-wider">
              {t("Бүгдийг үзэх", "View all")} <ArrowRight size={14} />
            </Link>
          </div>
          {galleries.isLoading ? <LoadingSpinner /> : galleries.error ? (
            <div className="bg-card rounded-xl border border-border p-8 text-center">
              <p className="text-muted-foreground">{t("Мэдээлэл ачааллахад алдаа гарлаа", "Failed to load data")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(galleries.data || []).slice(0, 6).map((g: any) => (
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
