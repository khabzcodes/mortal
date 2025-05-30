type PageHeaderProps = React.PropsWithChildren<{
  title: string;
  description: string;
}>;

export const PageHeader = ({ title, description, children }: PageHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold capitalize">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
};
