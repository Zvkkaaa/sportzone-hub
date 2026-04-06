import { useLanguage } from "@/context/LanguageContext";
import { Send, Mail, MapPin, Phone } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const ContactPage = () => {
  const { t } = useLanguage();

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-background/80" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground mb-2">
            {t("ХОЛБОО БАРИХ", "CONTACT")}
          </h1>
          <p className="text-xl text-accent font-bold">
            {t("Бидэнтэй хамтран ажиллах санал хүсэлт", "Partnership & sponsorship inquiries")}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Mail className="text-accent" size={20} />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1">{t("Имэйл", "Email")}</h3>
                <p className="text-foreground/50">info@piratesbasketball.mn</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Phone className="text-accent" size={20} />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1">{t("Утас", "Phone")}</h3>
                <p className="text-foreground/50">+976 9911 2233</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="text-accent" size={20} />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1">{t("Хаяг", "Address")}</h3>
                <p className="text-foreground/50">{t("Улаанбаатар, Монгол", "Ulaanbaatar, Mongolia")}</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <input
                type="text"
                placeholder={t("Нэр", "Name") || ""}
                className="w-full bg-card border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder={t("Имэйл", "Email") || ""}
                className="w-full bg-card border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <textarea
                rows={5}
                placeholder={t("Мессеж", "Message") || ""}
                className="w-full bg-card border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-accent transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-accent/90 transition-all glow-accent"
            >
              {t("Илгээх", "Send")} <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
