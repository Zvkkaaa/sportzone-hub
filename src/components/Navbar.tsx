import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { Menu, X, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import piratesLogo from "@/assets/pirates-logo.png";

const navItems = [
  { path: "/", mn: "Нүүр", en: "Home" },
  { path: "/players", mn: "Тоглогчид", en: "Players" },
  { path: "/coaches", mn: "Дасгалжуулагчид", en: "Coaches" },
  { path: "/matches", mn: "Тэмцээнүүд", en: "Matches" },
  { path: "/news", mn: "Мэдээ", en: "News" },
  { path: "/merch", mn: "Мерчант", en: "Merch" },
  { path: "/contact", mn: "Холбоо барих", en: "Contact" },
];

const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLang = () => setLang(lang === "mn" ? "en" : "mn");

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-background/95 backdrop-blur-xl border-b border-border" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <img src={piratesLogo} alt="Pirates" className="h-10 w-10 object-contain" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 rounded-md text-xs font-semibold uppercase tracking-widest transition-all duration-200 ${
                location.pathname === item.path
                  ? "text-accent"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              {t(item.mn, item.en)}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 text-foreground/60 hover:text-foreground transition-colors"
            title={lang === "mn" ? "Switch to English" : "Монгол руу солих"}
          >
            <Globe size={18} />
            <span className="text-xs font-bold uppercase">{lang === "mn" ? "EN" : "MN"}</span>
          </button>
          <button className="lg:hidden text-foreground" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-background/98 backdrop-blur-xl border-t border-border pb-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`block px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-colors ${
                location.pathname === item.path
                  ? "text-accent"
                  : "text-foreground/60"
              }`}
            >
              {t(item.mn, item.en)}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
