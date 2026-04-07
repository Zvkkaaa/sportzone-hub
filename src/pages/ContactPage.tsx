import { useLanguage } from "@/context/LanguageContext";
import { Send, Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import piratesLogo from "@/assets/pirates-logo.png";

const ContactPage = () => {
  const { t } = useLanguage();

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-6 animate-fade-in">
            <MessageCircle size={14} className="text-accent" />
            <span className="text-accent text-xs font-bold uppercase tracking-wider">
              {t("Бидэнтэй холбогдоорой", "Get in touch")}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground mb-4 animate-slide-up">
            {t("ХОЛБОО БАРИХ", "CONTACT")}
          </h1>
          <p className="text-lg text-foreground/50 max-w-md mx-auto animate-fade-in" style={{ animationDelay: "200ms" }}>
            {t("Бидэнтэй хамтран ажиллах санал хүсэлт", "Partnership & sponsorship inquiries")}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-2xl border border-border p-6 hover:border-accent/20 transition-all duration-300">
              <img src={piratesLogo} alt="Pirates" className="w-16 h-16 object-contain mb-4 opacity-60" />
              <h2 className="text-xl font-black text-foreground mb-4">{t("Мэдээлэл", "Information")}</h2>

              <div className="space-y-5">
                {[
                  { icon: Mail, label: t("Имэйл", "Email"), value: "info@piratesbasketball.mn" },
                  { icon: Phone, label: t("Утас", "Phone"), value: "+976 9911 2233" },
                  { icon: MapPin, label: t("Хаяг", "Address"), value: t("Улаанбаатар, Монгол", "Ulaanbaatar, Mongolia") },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors duration-300">
                      <item.icon className="text-accent" size={18} />
                    </div>
                    <div>
                      <p className="text-foreground/40 text-xs font-semibold uppercase tracking-wider mb-0.5">{item.label}</p>
                      <p className="text-foreground font-medium text-sm">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden h-48 relative">
              <img src={heroBg} alt="" className="w-full h-full object-cover opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={24} className="text-accent mx-auto mb-2" />
                  <p className="text-foreground/40 text-sm font-medium">{t("Улаанбаатар", "Ulaanbaatar")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-2xl border border-border p-8">
              <h2 className="text-2xl font-black text-foreground mb-2">
                {t("Мессеж илгээх", "Send a message")}
              </h2>
              <p className="text-foreground/40 text-sm mb-8">
                {t("Бид таны мессежийг аль болох хурдан хариулах болно", "We'll get back to you as soon as possible")}
              </p>

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-foreground/50 text-xs font-semibold uppercase tracking-wider mb-2 block">
                      {t("Нэр", "Name")}
                    </label>
                    <input
                      type="text"
                      placeholder={t("Таны нэр", "Your name") || ""}
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="text-foreground/50 text-xs font-semibold uppercase tracking-wider mb-2 block">
                      {t("Имэйл", "Email")}
                    </label>
                    <input
                      type="email"
                      placeholder={t("Таны имэйл", "Your email") || ""}
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all duration-300"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-foreground/50 text-xs font-semibold uppercase tracking-wider mb-2 block">
                    {t("Сэдэв", "Subject")}
                  </label>
                  <input
                    type="text"
                    placeholder={t("Сэдэв", "Subject") || ""}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="text-foreground/50 text-xs font-semibold uppercase tracking-wider mb-2 block">
                    {t("Мессеж", "Message")}
                  </label>
                  <textarea
                    rows={5}
                    placeholder={t("Таны мессеж...", "Your message...") || ""}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all duration-300 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 glow-accent"
                >
                  {t("Илгээх", "Send message")} <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;