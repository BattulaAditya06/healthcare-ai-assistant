interface Props {
  children: React.ReactNode;
}

export function AppLayout({
  children,
}: Props) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {children}
    </main>
  );
}