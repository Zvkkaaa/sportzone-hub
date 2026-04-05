import { useLanguage } from "@/context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-navy text-navy-foreground py-10 mt-16">
      <div className="container mx-auto px-4 text-center">
        <p className="font-bold text-lg mb-2">⚽ PIRATES FC</p>
        <p className="text-navy-foreground/60 text-sm">
          © 2026 Pirates FC. {t("Бүх эрх хуулиар хамгаалагдсан.", "All rights reserved.")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
