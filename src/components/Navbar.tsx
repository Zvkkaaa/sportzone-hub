import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { path: "/", mn: "Нүүр", en: "Home" },
  { path: "/players", mn: "Тоглогчид", en: "Players" },
  { path: "/coaches", mn: "Дасгалжуулагчид", en: "Coaches" },
  { path: "/matches", mn: "Тэмцээнүүд", en: "Matches" },
  { path: "/gallery", mn: "Зургийн цомог", en: "Gallery" },
  { path: "/merch", mn: "Мерчант", en: "Merch" },
];

const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Always show solid bg on non-home pages
  const isHome = location.pathname === "/";
  const showSolid = scrolled || !isHome;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy text-navy-foreground shadow-lg">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="text-navy-foreground font-black text-xl tracking-wider flex items-center gap-2">
          <span className="text-2xl">🏴‍☠️</span>
          <span>PIRATES</span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-md text-sm font-semibold uppercase tracking-wider transition-all duration-200 ${
                location.pathname === item.path
                  ? "text-accent"
                  : "text-navy-foreground/70 hover:text-navy-foreground"
              }`}
            >
              {t(item.mn, item.en)}
            </Link>
          ))}
          <div className="ml-4 flex items-center rounded-full border border-navy-foreground/20 overflow-hidden">
            <button
              onClick={() => setLang("mn")}
              className={`px-3 py-1 text-xs font-bold transition-all ${
                lang === "mn" ? "bg-accent text-accent-foreground" : "text-navy-foreground/60 hover:text-navy-foreground"
              }`}
            >
              MN
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1 text-xs font-bold transition-all ${
                lang === "en" ? "bg-accent text-accent-foreground" : "text-navy-foreground/60 hover:text-navy-foreground"
              }`}
            >
              EN
            </button>
          </div>
        </div>

        <button className="lg:hidden text-navy-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-navy border-t border-navy-foreground/10 pb-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`block px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-colors ${
                location.pathname === item.path
                  ? "text-accent"
                  : "text-navy-foreground/70"
              }`}
            >
              {t(item.mn, item.en)}
            </Link>
          ))}
          <div className="px-6 pt-2 flex gap-2">
            <button onClick={() => { setLang("mn"); setOpen(false); }} className={`px-4 py-1.5 rounded-full text-xs font-bold ${lang === "mn" ? "bg-accent text-accent-foreground" : "bg-navy-foreground/10 text-navy-foreground/70"}`}>MN</button>
            <button onClick={() => { setLang("en"); setOpen(false); }} className={`px-4 py-1.5 rounded-full text-xs font-bold ${lang === "en" ? "bg-accent text-accent-foreground" : "bg-navy-foreground/10 text-navy-foreground/70"}`}>EN</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
