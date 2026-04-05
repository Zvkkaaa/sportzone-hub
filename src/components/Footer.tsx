import { useLanguage } from "@/context/LanguageContext";
import { Facebook, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-card border-t border-border py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-black text-xl text-foreground tracking-wider">🏴‍☠️ PIRATES</p>
            <p className="text-muted-foreground text-sm mt-1">
              {t("Монголын сагсан бөмбөгийн баг", "Mongolian Basketball Team")}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-sport-orange hover:text-sport-orange-foreground transition-all">
              <Facebook size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-sport-orange hover:text-sport-orange-foreground transition-all">
              <Instagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-sport-orange hover:text-sport-orange-foreground transition-all">
              <Youtube size={18} />
            </a>
          </div>
          <p className="text-muted-foreground text-sm">
            © 2026 Pirates. {t("Бүх эрх хуулиар хамгаалагдсан.", "All rights reserved.")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
