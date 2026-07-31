import { useLanguage } from "@/context/LanguageContext";
import { useMerchandises } from "@/hooks/useApi";
import { getImageUrl } from "@/lib/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ShoppingCart, ExternalLink } from "lucide-react";

const MerchPage = () => {
  const { t } = useLanguage();
  const { data: cmsData, isLoading } = useMerchandises();
  const merch = cmsData || [];

  return (
    <div className="pt-16">
      <section className="gradient-navy py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground mb-4">{t("МЕРЧАНТ", "MERCH")}</h1>
          <p className="text-foreground/40 text-lg max-w-md mx-auto mb-6">
            {t("Pirates багийн албан ёсны бүтээгдэхүүнүүд", "Official Pirates team merchandise")}
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-accent/90 transition-all glow-accent"
          >
            MERCH on HAPPY PAY <ExternalLink size={16} />
          </a>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {isLoading ? <LoadingSpinner /> : merch.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {merch.map((item: any) => {
              const image = item.image?.url || item.photo?.url || item.coverImage?.url;
              return (
              <div key={item.id} className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-accent/30 transition-all duration-300 hover:-translate-y-1 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
                {image && (
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img src={getImageUrl(image)} alt={t(item.name_mn, item.name_en)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                  </div>
                )}
                <div className="p-4 text-center">
                  <h3 className="font-bold text-foreground mb-1">{t(item.name_mn, item.name_en)}</h3>
                  {item.price && <p className="text-accent font-black text-lg mb-3">{item.price}</p>}
                  <button className="w-full flex items-center justify-center gap-2 bg-muted text-foreground py-2.5 rounded-xl text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-all">
                    <ShoppingCart size={14} /> {t("Худалдаж авах", "Buy Now")}
                  </button>
                </div>
              </div>
            )})}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-card/40 px-6 py-14 text-center text-foreground/40">
            {t("Strapi дээр merchandises content нэмэгдсэн үед энд гарч ирнэ.", "Add merchandise entries in Strapi and they will appear here.")}
          </div>
        )}
      </div>
    </div>
  );
};

export default MerchPage;
