import { useLanguage } from "@/context/LanguageContext";
import { useMerchandises } from "@/hooks/useApi";
import { getImageUrl } from "@/lib/api";
import SectionTitle from "@/components/SectionTitle";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ShoppingCart, ExternalLink } from "lucide-react";

const fallbackMerch = [
  { id: 1, name_mn: "Pirates Жерси", name_en: "Pirates Jersey", price: "89,000₮", emoji: "🏀" },
  { id: 2, name_mn: "Pirates Малгай", name_en: "Pirates Cap", price: "35,000₮", emoji: "🧢" },
  { id: 3, name_mn: "Pirates Оймс", name_en: "Pirates Socks", price: "15,000₮", emoji: "🧦" },
  { id: 4, name_mn: "Pirates Цүнх", name_en: "Pirates Backpack", price: "65,000₮", emoji: "🎒" },
  { id: 5, name_mn: "Pirates Ус савлагч", name_en: "Pirates Water Bottle", price: "25,000₮", emoji: "🍶" },
  { id: 6, name_mn: "Pirates Гар оосор", name_en: "Pirates Lanyard", price: "12,000₮", emoji: "🏷️" },
  { id: 7, name_mn: "Pirates Arm Sleeve", name_en: "Pirates Arm Sleeve", price: "20,000₮", emoji: "💪" },
  { id: 8, name_mn: "Pirates Түлхүүрийн оосор", name_en: "Pirates Keychain", price: "8,000₮", emoji: "⚓" },
];

const MerchPage = () => {
  const { t } = useLanguage();
  const { data: cmsData, isLoading } = useMerchandises();

  const hasCmsData = cmsData && cmsData.length > 0;

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="gradient-navy py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4">
            <span className="text-gradient">{t("МЕРЧАНТ", "MERCH")}</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto mb-6">
            {t("Pirates багийн албан ёсны бүтээгдэхүүнүүд", "Official Pirates team merchandise")}
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-accent/90 transition-all glow-accent"
          >
            {t("HAPPY PAY дээр худалдаж авах", "Shop on HAPPY PAY")} <ExternalLink size={16} />
          </a>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <SectionTitle>{t("Бүтээгдэхүүнүүд", "Products")}</SectionTitle>

        {isLoading ? (
          <LoadingSpinner />
        ) : hasCmsData ? (
          /* CMS Data */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cmsData.map((item: any) => (
              <div
                key={item.id}
                className="group bg-card rounded-xl border border-border overflow-hidden hover:border-accent/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/10"
              >
                {item.image?.url && (
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img
                      src={getImageUrl(item.image.url)}
                      alt={t(item.name_mn, item.name_en)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-4 text-center">
                  <h3 className="font-bold text-foreground mb-1">{t(item.name_mn, item.name_en)}</h3>
                  {item.price && <p className="text-accent font-black text-lg mb-3">{item.price}</p>}
                  {item.description_mn || item.description_en ? (
                    <p className="text-muted-foreground text-xs mb-3 line-clamp-2">{t(item.description_mn, item.description_en)}</p>
                  ) : null}
                  <button className="w-full flex items-center justify-center gap-2 bg-muted text-foreground py-2.5 rounded-lg text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-all">
                    <ShoppingCart size={14} />
                    {t("Худалдаж авах", "Buy Now")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Fallback static data */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {fallbackMerch.map((item) => (
              <div
                key={item.id}
                className="group bg-card rounded-xl border border-border p-6 hover:border-accent/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/10 text-center"
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.emoji}
                </div>
                <h3 className="font-bold text-foreground mb-1">{t(item.name_mn, item.name_en)}</h3>
                <p className="text-accent font-black text-lg mb-4">{item.price}</p>
                <button className="w-full flex items-center justify-center gap-2 bg-muted text-foreground py-2.5 rounded-lg text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-all">
                  <ShoppingCart size={14} />
                  {t("Худалдаж авах", "Buy Now")}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MerchPage;
