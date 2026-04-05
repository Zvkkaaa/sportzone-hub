import { useLanguage } from "@/context/LanguageContext";
import SectionTitle from "@/components/SectionTitle";
import { ShoppingCart, ExternalLink } from "lucide-react";

const merchItems = [
  { id: 1, name_mn: "Pirates Жерси", name_en: "Pirates Jersey", price: "89,000₮", category: "jersey", emoji: "🏀" },
  { id: 2, name_mn: "Pirates Малгай", name_en: "Pirates Cap", price: "35,000₮", category: "cap", emoji: "🧢" },
  { id: 3, name_mn: "Pirates Оймс", name_en: "Pirates Socks", price: "15,000₮", category: "socks", emoji: "🧦" },
  { id: 4, name_mn: "Pirates Цүнх", name_en: "Pirates Backpack", price: "65,000₮", category: "bag", emoji: "🎒" },
  { id: 5, name_mn: "Pirates Ус савлагч", name_en: "Pirates Water Bottle", price: "25,000₮", category: "bottle", emoji: "🍶" },
  { id: 6, name_mn: "Pirates Гар оосор", name_en: "Pirates Lanyard", price: "12,000₮", category: "lanyard", emoji: "🏷️" },
  { id: 7, name_mn: "Pirates Arm Sleeve", name_en: "Pirates Arm Sleeve", price: "20,000₮", category: "sleeve", emoji: "💪" },
  { id: 8, name_mn: "Pirates Түлхүүрийн оосор", name_en: "Pirates Keychain", price: "8,000₮", category: "keychain", emoji: "⚓" },
];

const MerchPage = () => {
  const { t } = useLanguage();

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-card border-b border-border py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4">
            <span className="text-gradient">{t("МЕРЧАНТ", "MERCH")}</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto mb-6">
            {t("Pirates багийн албан ёсны бүтээгдэхүүнүүд", "Official Pirates team merchandise")}
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-sport-orange text-sport-orange-foreground px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-sport-orange/90 transition-all glow-accent"
          >
            {t("HAPPY PAY дээр худалдаж авах", "Shop on HAPPY PAY")} <ExternalLink size={16} />
          </a>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <SectionTitle>{t("Бүтээгдэхүүнүүд", "Products")}</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {merchItems.map((item) => (
            <div
              key={item.id}
              className="group bg-card rounded-xl border border-border p-6 hover:border-sport-orange/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-sport-orange/10 text-center"
            >
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {item.emoji}
              </div>
              <h3 className="font-bold text-foreground mb-1">{t(item.name_mn, item.name_en)}</h3>
              <p className="text-sport-orange font-black text-lg mb-4">{item.price}</p>
              <button className="w-full flex items-center justify-center gap-2 bg-muted text-foreground py-2.5 rounded-lg text-sm font-semibold hover:bg-sport-orange hover:text-sport-orange-foreground transition-all">
                <ShoppingCart size={14} />
                {t("Худалдаж авах", "Buy Now")}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MerchPage;
