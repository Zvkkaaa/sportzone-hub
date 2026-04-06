import { useLanguage } from "@/context/LanguageContext";
import { Facebook, Instagram, Youtube } from "lucide-react";
import piratesLogo from "@/assets/pirates-logo.png";

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-border py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <a href="#" className="text-foreground/40 hover:text-accent transition-colors"><Facebook size={20} /></a>
          <a href="#" className="text-foreground/40 hover:text-accent transition-colors"><Instagram size={20} /></a>
          <a href="#" className="text-foreground/40 hover:text-accent transition-colors"><Youtube size={20} /></a>
        </div>
        <p className="text-foreground/30 text-sm">© 2026 Pirates</p>
      </div>
    </footer>
  );
};

export default Footer;
