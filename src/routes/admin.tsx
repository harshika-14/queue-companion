import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Logo />
            </Link>
            <span className="hidden rounded-full border border-border px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground sm:inline">
              Admin Console
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <div className="text-sm font-bold">City General Hospital</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Andheri West · Mumbai
              </div>
            </div>
            <div className="flex size-9 items-center justify-center rounded-full bg-accent/15 text-sm font-bold text-accent">
              CG
            </div>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
