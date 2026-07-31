import { useLanguage } from "@/context/LanguageContext";
import { Send, Mail, MapPin, Phone, MessageCircle, Handshake } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import piratesLogo from "@/assets/pirates-logo.png";

const ContactPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background pt-16">
      <section className="relative py-24 overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-12" />
        <div className="absolute inset-0 gradient-navy" />
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/6 border border-white/10 rounded-full px-4 py-2 mb-6 animate-fade-in backdrop-blur">
            <MessageCircle size={14} className="text-accent" />
            <span className="text-accent text-xs font-bold uppercase tracking-[0.35em]">
              {t("Бидэнтэй холбогдоорой", "Get in touch")}
            </span>
          </div>
          <h1 className="text-5xl md:text-[5.5rem] font-black tracking-tighter uppercase text-white mb-4 animate-slide-up leading-none">
            {t("ХОЛБОО БАРИХ", "CONTACT")}
          </h1>
          <p className="text-white/65 max-w-lg mx-auto animate-fade-in" style={{ animationDelay: "180ms" }}>
            {t("Спонсорчлол, media, partnership болон club inquiry-д зориулсан premium contact page.", "Premium contact page for sponsorship, media, partnership and club inquiries.")}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-[2rem] border border-white/8 bg-card/90 p-6 shadow-[0_18px_45px_rgba(2,6,23,0.12)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl border border-white/8 bg-white/5 flex items-center justify-center">
                  <img src={piratesLogo} alt="Pirates" className="w-8 h-8 object-contain" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-foreground">{t("Мэдээлэл", "Information")}</h2>
                  <p className="text-foreground/45 text-xs uppercase tracking-[0.3em]">{t("Club office", "Club office")}</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { icon: Mail, label: t("Имэйл", "Email"), value: "info@piratesbasketball.mn" },
                  { icon: Phone, label: t("Утас", "Phone"), value: "+976 9911 2233" },
                  { icon: MapPin, label: t("Хаяг", "Address"), value: t("Улаанбаатар, Монгол", "Ulaanbaatar, Mongolia") },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 rounded-2xl border border-white/8 bg-white/5 p-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/12 flex items-center justify-center flex-shrink-0">
                      <item.icon className="text-accent" size={18} />
                    </div>
                    <div>
                      <p className="text-foreground/40 text-[10px] font-bold uppercase tracking-[0.35em] mb-1">{item.label}</p>
                      <p className="text-foreground font-medium text-sm">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/8 bg-card/90 overflow-hidden h-52 relative shadow-[0_18px_45px_rgba(2,6,23,0.12)]">
              <img src={heroBg} alt="" className="w-full h-full object-cover opacity-18" />
              <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/20 to-accent/15" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={24} className="text-accent mx-auto mb-2" />
                  <p className="text-foreground/45 text-sm font-medium">{t("Улаанбаатар", "Ulaanbaatar")}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-[2rem] border border-white/8 bg-card/90 p-8 md:p-10 shadow-[0_18px_45px_rgba(2,6,23,0.12)]">
              <div className="flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-[0.35em] mb-3">
                <Handshake size={14} /> {t("Message board", "Message board")}
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-foreground mb-2">
                {t("Мессеж илгээх", "Send a message")}
              </h2>
              <p className="text-foreground/45 text-sm mb-8">
                {t("Бид таны мессежийг аль болох хурдан хариулах болно", "We'll get back to you as soon as possible")}
              </p>

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-foreground/50 text-[10px] font-bold uppercase tracking-[0.35em] mb-2 block">
                      {t("Нэр", "Name")}
                    </label>
                    <input
                      type="text"
                      placeholder={t("Таны нэр", "Your name") || ""}
                      className="w-full bg-background/80 border border-white/8 rounded-2xl px-4 py-3 text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="text-foreground/50 text-[10px] font-bold uppercase tracking-[0.35em] mb-2 block">
                      {t("Имэйл", "Email")}
                    </label>
                    <input
                      type="email"
                      placeholder={t("Таны имэйл", "Your email") || ""}
                      className="w-full bg-background/80 border border-white/8 rounded-2xl px-4 py-3 text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all duration-300"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-foreground/50 text-[10px] font-bold uppercase tracking-[0.35em] mb-2 block">
                    {t("Сэдэв", "Subject")}
                  </label>
                  <input
                    type="text"
                    placeholder={t("Сэдэв", "Subject") || ""}
                    className="w-full bg-background/80 border border-white/8 rounded-2xl px-4 py-3 text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="text-foreground/50 text-[10px] font-bold uppercase tracking-[0.35em] mb-2 block">
                    {t("Мессеж", "Message")}
                  </label>
                  <textarea
                    rows={6}
                    placeholder={t("Таны мессеж...", "Your message...") || ""}
                    className="w-full bg-background/80 border border-white/8 rounded-2xl px-4 py-3 text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all duration-300 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-[0.35em] hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20 transition-all duration-300"
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
