import { createFileRoute, Outlet, Link, useRouterState } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Home, CalendarPlus, Clock, User } from "lucide-react";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const tabs = [
    { to: "/app", label: "Home", icon: Home },
    { to: "/app/book", label: "Book", icon: CalendarPlus },
    { to: "/app/queue", label: "My Queue", icon: Clock },
  ] as const;

  return (
    <div className="min-h-screen bg-background pb-24 font-sans text-foreground">
      <header className="border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-5 py-4">
          <Link to="/">
            <Logo />
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-[10px] font-bold uppercase tracking-widest text-muted-foreground sm:inline">
              Patient
            </span>
            <div className="flex size-9 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
              VK
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-5 py-6">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-2xl items-stretch justify-around px-4 py-2">
          {tabs.map((tab) => {
            const active =
              tab.to === "/app" ? pathname === "/app" : pathname.startsWith(tab.to);
            const Icon = tab.icon;
            return (
              <Link
                key={tab.to}
                to={tab.to}
                className="flex flex-1 flex-col items-center gap-1 py-2 text-[10px] font-bold uppercase tracking-wider"
              >
                <Icon
                  className={
                    active
                      ? "size-6 text-primary"
                      : "size-6 text-muted-foreground"
                  }
                  strokeWidth={active ? 2.5 : 2}
                />
                <span className={active ? "text-primary" : "text-muted-foreground"}>
                  {tab.label}
                </span>
              </Link>
            );
          })}
          <Link
            to="/"
            className="flex flex-1 flex-col items-center gap-1 py-2 text-[10px] font-bold uppercase tracking-wider"
          >
            <User className="size-6 text-muted-foreground" />
            <span className="text-muted-foreground">Exit</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
