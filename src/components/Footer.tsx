import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { Facebook, Instagram, Youtube } from "lucide-react";
import piratesLogo from "@/assets/pirates-logo.png";

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-white/8 bg-background/95 backdrop-blur-xl mt-auto">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center">
                <img src={piratesLogo} alt="Pirates" className="w-8 h-8 object-contain" />
              </div>
              <div>
                <span className="block font-display font-bold text-xl text-foreground uppercase tracking-[0.08em]">Pirates</span>
                <span className="block text-[10px] uppercase tracking-[0.35em] text-foreground/45">{t("Basketball Club", "Basketball Club")}</span>
              </div>
            </div>
            <p className="text-foreground/50 text-sm text-center md:text-left max-w-xs">
              {t("Сагсан бөмбөгийн клуб", "Basketball Club")}
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-foreground/45 text-xs font-bold uppercase tracking-[0.35em] mb-4">{t("Холбоосууд", "Explore")}</h4>
            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center md:justify-start">
              {[
                { to: "/teams", label: t("Багууд", "Teams") },
                { to: "/matches", label: t("Тоглолт", "Games") },
                { to: "/news", label: t("Мэдээ", "News") },
                { to: "/gallery", label: t("Зураг", "Gallery") },
                { to: "/sponsors", label: t("Спонсор", "Sponsors") },
                { to: "/contact", label: t("Холбоо", "Contact") },
              ].map((link) => (
                <Link key={link.to} to={link.to} className="text-foreground/55 text-sm hover:text-accent transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <h4 className="text-foreground/45 text-xs font-bold uppercase tracking-[0.35em] mb-4">{t("Сошиал", "Social")}</h4>
            <div className="flex items-center gap-3">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl border border-white/8 bg-white/5 flex items-center justify-center text-foreground/55 hover:text-accent hover:bg-accent/10 hover:border-accent/30 transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/8 pt-6 text-center">
          <p className="text-foreground/35 text-xs">© 2026 Pirates Basketball Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
