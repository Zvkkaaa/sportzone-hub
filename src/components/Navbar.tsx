import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { Menu, X, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import piratesLogo from "@/assets/pirates-logo.png";

const primaryNav = [
  { path: "/teams", mn: "Багууд", en: "Teams" },
  { path: "/matches", mn: "Тэмцээн", en: "Matches" },
  { path: "/news", mn: "Мэдээ", en: "News" },
  { path: "/merch", mn: "Мерчант", en: "Merch" },
  { path: "/contact", mn: "Холбоо", en: "Contact" },
];

const mobileNav = [
  { path: "/", mn: "Нүүр", en: "Home" },
  { path: "/players", mn: "Тоглогчид", en: "Players" },
  { path: "/coaches", mn: "Дасгалжуулагчид", en: "Coaches" },
  { path: "/matches", mn: "Тэмцээнүүд", en: "Matches" },
  { path: "/news", mn: "Мэдээ", en: "News" },
  { path: "/gallery", mn: "Зураг", en: "Gallery" },
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

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const toggleLang = () => setLang(lang === "mn" ? "en" : "mn");

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-lg shadow-background/50" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={piratesLogo} alt="Pirates" className="h-10 w-10 object-contain group-hover:scale-110 transition-transform duration-300" />
          <span className="text-foreground font-black text-lg tracking-tight hidden sm:block">PIRATES</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-0.5">
          {primaryNav.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
                location.pathname === item.path
                  ? "text-accent"
                  : "text-foreground/50 hover:text-foreground hover:bg-foreground/5"
              }`}
            >
              {t(item.mn, item.en)}
              {location.pathname === item.path && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-accent rounded-full" />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 text-foreground/50 hover:text-accent px-2 py-1.5 rounded-lg hover:bg-foreground/5 transition-all duration-300"
            title={lang === "mn" ? "Switch to English" : "Монгол руу солих"}
          >
            <Globe size={16} />
            <span className="text-xs font-bold uppercase">{lang === "mn" ? "EN" : "MN"}</span>
          </button>
          <button className="lg:hidden text-foreground p-1" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${
        open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
      }`}>
        <div className="bg-background/98 backdrop-blur-xl border-t border-border pb-6 px-2">
          {mobileNav.map((item, i) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-4 py-3 mx-2 rounded-lg text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                location.pathname === item.path
                  ? "text-accent bg-accent/5"
                  : "text-foreground/50 hover:text-foreground hover:bg-foreground/5"
              }`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {t(item.mn, item.en)}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;