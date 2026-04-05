interface Props {
  children: React.ReactNode;
  className?: string;
}

const SectionTitle = ({ children, className = "" }: Props) => (
  <h2 className={`text-2xl md:text-3xl font-extrabold text-foreground mb-6 ${className}`}>
    <span className="border-l-4 border-accent pl-3">{children}</span>
  </h2>
);

export default SectionTitle;
