import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { Menu, X, Globe, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import piratesLogo from "@/assets/pirates-logo.png";

const nav = [
  { path: "/teams", mn: "Багууд", en: "Teams" },
  { path: "/players", mn: "Тоглогчид", en: "Players" },
  { path: "/matches", mn: "Тоглолт", en: "Games" },
  { path: "/news", mn: "Мэдээ", en: "News" },
  { path: "/gallery", mn: "Зураг", en: "Gallery" },
  { path: "/sponsors", mn: "Спонсор", en: "Sponsors" },
  { path: "/contact", mn: "Холбоо", en: "Contact" },
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

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? "bg-background/78 backdrop-blur-xl border-b border-border/70 shadow-[0_12px_40px_rgba(2,6,23,0.22)]" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4 flex items-center justify-between h-18">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl border border-white/10 bg-white/5 backdrop-blur flex items-center justify-center shadow-[0_10px_30px_rgba(2,6,23,0.2)]">
            <img src={piratesLogo} alt="Pirates" className="h-8 w-8 object-contain group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="hidden sm:block leading-tight">
            <span className="block font-display text-foreground font-bold text-lg tracking-[0.08em] uppercase">Pirates</span>
            <span className="block text-[10px] uppercase tracking-[0.35em] text-foreground/45">{t("Basketball Club", "Basketball Club")}</span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-1 rounded-full border border-white/8 bg-white/5 backdrop-blur px-2 py-1">
          {nav.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                location.pathname === item.path || location.pathname.startsWith(item.path + "/")
                  ? "text-white bg-accent shadow-[0_0_0_1px_hsl(var(--accent)/0.35)]"
                  : "text-foreground/60 hover:text-foreground hover:bg-white/6"
              }`}
            >
              {t(item.mn, item.en)}
              {(location.pathname === item.path || location.pathname.startsWith(item.path + "/")) && (
                <span className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-4 h-0.5 bg-accent rounded-full" />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 rounded-full border border-white/8 bg-white/5 px-3 py-1.5">
            <Zap size={14} className="text-accent" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/55">
              {t("Live CMS", "Live CMS")}
            </span>
          </div>
          <button
            onClick={() => setLang(lang === "mn" ? "en" : "mn")}
            className="flex items-center gap-1.5 text-foreground/60 hover:text-accent px-3 py-2 rounded-full border border-transparent hover:border-white/10 hover:bg-white/5 transition-all"
          >
            <Globe size={16} />
            <span className="text-xs font-bold uppercase">{lang === "mn" ? "EN" : "MN"}</span>
          </button>
          <button className="lg:hidden text-foreground p-1" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-[500px]" : "max-h-0"}`}>
        <div className="bg-background/95 backdrop-blur-xl border-t border-border/70 pb-6 px-2 shadow-lg shadow-slate-900/10">
          <Link to="/" className="block px-4 py-3 mx-2 rounded-lg text-sm font-bold uppercase tracking-wider text-foreground/60 hover:text-foreground">
            {t("Нүүр", "Home")}
          </Link>
          {nav.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-4 py-3 mx-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-all ${
                location.pathname === item.path ? "text-accent bg-accent/8" : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
              }`}
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
