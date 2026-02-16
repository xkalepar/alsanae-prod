interface PageHeaderProps {
  title: string;
  description: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
      <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
        {description}
      </p>
    </div>
  );
}
