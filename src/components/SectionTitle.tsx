interface Props {
  children: React.ReactNode;
  className?: string;
}

const SectionTitle = ({ children, className = "" }: Props) => (
  <h2 className={`text-3xl md:text-4xl font-black text-foreground mb-8 uppercase tracking-tight ${className}`}>
    {children}
  </h2>
);

export default SectionTitle;
