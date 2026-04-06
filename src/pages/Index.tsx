import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { usePlayers, useMatches } from "@/hooks/useApi";
import MatchCard from "@/components/MatchCard";
import StandingsTable from "@/components/StandingsTable";
import LoadingSpinner from "@/components/LoadingSpinner";
import heroBg from "@/assets/hero-bg.jpg";
import piratesLogo from "@/assets/pirates-logo.png";
import { ArrowRight, ShoppingBag, Send } from "lucide-react";

const Index = () => {
  const { t } = useLanguage();
  const matches = useMatches();

  return (
    <div>
      {/* Hero - Full Screen */}
      <section className="relative h-screen min-h-[700px] overflow-hidden flex items-center justify-center">
        <img src={heroBg} alt="Pirates Basketball" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative z-10 text-center px-4">
          <img src={piratesLogo} alt="Pirates" className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-6 object-contain drop-shadow-2xl" />
          <h1 className="text-6xl md:text-[110px] font-black tracking-tighter leading-none mb-2">
            <span className="text-foreground">PIRATES</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/50 font-medium tracking-[0.3em] uppercase mb-10">
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
              className="inline-flex items-center gap-2 border border-foreground/20 text-foreground px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-foreground/5 transition-all"
            >
              <ShoppingBag size={16} /> {t("Мерчант", "Shop Merch")}
            </Link>
          </div>
        </div>
      </section>

      {/* Match Results Carousel */}
      {!matches.isLoading && matches.data && matches.data.length > 0 && (
        <section className="gradient-section py-10">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-sm font-bold uppercase tracking-widest text-foreground/50">
                  {t("ҮР ДҮН", "RESULTS")}
                </span>
              </div>
              <Link to="/matches" className="text-accent text-sm font-semibold hover:underline flex items-center gap-1">
                {t("Бүгдийг үзэх", "View all")} <ArrowRight size={14} />
              </Link>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {matches.data.slice(0, 6).map((m: any) => (
                <div key={m.id} className="min-w-[320px] snap-start">
                  <MatchCard match={m} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Standings */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-8 text-foreground">
            {t("БАЙР ДҮН", "STANDINGS")}
          </h2>
          <StandingsTable />
        </div>
      </section>

      {/* News Preview */}
      <section className="gradient-section py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
              {t("МЭДЭЭ", "NEWS")}
            </h2>
            <Link to="/news" className="text-accent text-sm font-semibold hover:underline flex items-center gap-1">
              {t("Бүгдийг үзэх", "View all")} <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title_mn: "Pirates баг шинэ улирлын бэлтгэлээ эхлүүллээ",
                title_en: "Pirates begin new season preparation",
                date: "2026-03-28",
              },
              {
                title_mn: "Шинэ тоглогч багтай нэгдлээ",
                title_en: "New player joins the team",
                date: "2026-03-20",
              },
              {
                title_mn: "Pirates баг аваргын төлөө тэмцэнэ",
                title_en: "Pirates compete for the championship",
                date: "2026-03-15",
              },
            ].map((news, i) => (
              <div key={i} className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-accent/30 transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-video bg-muted/50 flex items-center justify-center">
                  <img src={heroBg} alt="" className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" />
                </div>
                <div className="p-5">
                  <p className="text-xs text-foreground/40 mb-2">{news.date}</p>
                  <h3 className="font-bold text-foreground group-hover:text-accent transition-colors">
                    {t(news.title_mn, news.title_en)}
                  </h3>
                </div>
                <div className="px-5 pb-5">
                  <div className="flex items-center gap-1 text-accent text-sm font-semibold">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative py-24 overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-background/80" />
        <div className="relative z-10 text-center px-4">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground mb-2">
            {t("Бидэнтэй хамтран", "Partner with us")}
          </h2>
          <p className="text-xl md:text-2xl font-bold text-accent mb-8">
            {t("ажиллах санал хүсэлт", "sponsorship & collaboration")}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-accent/90 transition-all glow-accent"
          >
            {t("Илгээх", "Send")} <Send size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
