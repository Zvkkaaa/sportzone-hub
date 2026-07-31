import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Home, ShieldAlert } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="relative max-w-2xl w-full rounded-[2rem] border border-white/8 bg-card/90 p-8 md:p-12 text-center shadow-[0_20px_60px_rgba(2,6,23,0.18)] overflow-hidden">
        <div className="absolute inset-0 gradient-navy opacity-60" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 mb-6">
            <ShieldAlert size={16} className="text-accent" />
            <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-foreground/55">Page not found</span>
          </div>
          <h1 className="font-display text-7xl md:text-[8rem] font-bold uppercase leading-none text-white">404</h1>
          <p className="mt-4 text-foreground/65 max-w-md mx-auto">
            Oops, the page you requested doesn’t exist in the Pirates Basketball Club site.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <Link to="/" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full font-bold text-xs uppercase tracking-[0.35em]">
              <Home size={14} /> Home
            </Link>
            <Link to="/teams" className="inline-flex items-center gap-2 border border-white/10 bg-white/5 text-foreground px-6 py-3 rounded-full font-bold text-xs uppercase tracking-[0.35em] hover:bg-white/10 transition-all">
              <ArrowLeft size={14} /> Teams
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
