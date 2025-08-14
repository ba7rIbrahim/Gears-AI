export const NotFoundProduct = ({
  title,
  description,
  customStyle = "",
}: {
  title: string;
  description?: string;
  customStyle?: string;
}) => {
  return (
    <div className={`${customStyle} text-center py-12`}>
      <div className="text-6xl text-muted-foreground/30 mb-4">🔍</div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};
