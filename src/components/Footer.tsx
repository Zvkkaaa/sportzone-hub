import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { Facebook, Instagram, Youtube } from "lucide-react";
import piratesLogo from "@/assets/pirates-logo.png";

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-border bg-card/30 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3 mb-3">
              <img src={piratesLogo} alt="Pirates" className="w-10 h-10 object-contain" />
              <span className="font-display font-bold text-xl text-foreground uppercase">Pirates</span>
            </div>
            <p className="text-foreground/40 text-sm text-center md:text-left">
              {t("Сагсан бөмбөгийн клуб", "Basketball Club")}
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-foreground/50 text-xs font-bold uppercase tracking-widest mb-4">{t("Холбоосууд", "Explore")}</h4>
            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center md:justify-start">
              {[
                { to: "/teams", label: t("Багууд", "Teams") },
                { to: "/matches", label: t("Тэмцээн", "Matches") },
                { to: "/news", label: t("Мэдээ", "News") },
                { to: "/gallery", label: t("Зураг", "Gallery") },
                { to: "/merch", label: t("Мерчант", "Merch") },
                { to: "/contact", label: t("Холбоо", "Contact") },
              ].map((link) => (
                <Link key={link.to} to={link.to} className="text-foreground/50 text-sm hover:text-accent transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <h4 className="text-foreground/50 text-xs font-bold uppercase tracking-widest mb-4">{t("Сошиал", "Social")}</h4>
            <div className="flex items-center gap-3">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-foreground/5 flex items-center justify-center text-foreground/50 hover:text-accent hover:bg-accent/10 transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-border/50 pt-6 text-center">
          <p className="text-foreground/30 text-xs">© 2026 Pirates Basketball Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
