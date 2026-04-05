import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { path: "/", mn: "Нүүр", en: "Home" },
  { path: "/players", mn: "Тоглогчид", en: "Players" },
  { path: "/coaches", mn: "Дасгалжуулагчид", en: "Coaches" },
  { path: "/matches", mn: "Тэмцээнүүд", en: "Matches" },
  { path: "/gallery", mn: "Зургийн цомог", en: "Gallery" },
];

const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-navy sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="text-navy-foreground font-extrabold text-xl tracking-tight">
          ⚽ PIRATES FC
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "bg-sport-red text-sport-red-foreground"
                  : "text-navy-foreground hover:bg-sport-red/20 hover:text-sport-red"
              }`}
            >
              {t(item.mn, item.en)}
            </Link>
          ))}
          <div className="ml-4 flex items-center bg-navy-foreground/10 rounded-md overflow-hidden">
            <button
              onClick={() => setLang("mn")}
              className={`px-3 py-1.5 text-xs font-bold transition-colors ${
                lang === "mn" ? "bg-sport-red text-sport-red-foreground" : "text-navy-foreground hover:bg-sport-red/30"
              }`}
            >
              MN
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1.5 text-xs font-bold transition-colors ${
                lang === "en" ? "bg-sport-red text-sport-red-foreground" : "text-navy-foreground hover:bg-sport-red/30"
              }`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-navy-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-navy border-t border-navy-foreground/10 pb-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`block px-6 py-3 text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "bg-sport-red text-sport-red-foreground"
                  : "text-navy-foreground hover:bg-sport-red/20"
              }`}
            >
              {t(item.mn, item.en)}
            </Link>
          ))}
          <div className="px-6 pt-2 flex gap-2">
            <button onClick={() => setLang("mn")} className={`px-4 py-1.5 rounded text-xs font-bold ${lang === "mn" ? "bg-sport-red text-sport-red-foreground" : "bg-navy-foreground/10 text-navy-foreground"}`}>MN</button>
            <button onClick={() => setLang("en")} className={`px-4 py-1.5 rounded text-xs font-bold ${lang === "en" ? "bg-sport-red text-sport-red-foreground" : "bg-navy-foreground/10 text-navy-foreground"}`}>EN</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
