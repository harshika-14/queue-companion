import { createFileRoute, Link } from "@tanstack/react-router";
import patientImage from "@/assets/patient-experience.jpg";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* Nav */}
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-background/80 px-6 py-4 backdrop-blur-md">
        <Logo />
        <div className="hidden gap-8 text-sm font-medium uppercase tracking-wider md:flex">
          <a href="#features" className="transition-colors hover:text-primary">
            The App
          </a>
          <Link to="/admin" className="transition-colors hover:text-primary">
            For Hospitals
          </Link>
          <a href="#access" className="transition-colors hover:text-primary">
            Access
          </a>
        </div>
        <Link
          to="/app"
          className="rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background transition-colors hover:bg-primary"
        >
          Open App
        </Link>
      </nav>

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2">
        <div className="animate-reveal">
          <h1 className="mb-8 text-balance text-6xl font-extrabold leading-[0.95] tracking-tight md:text-7xl">
            The wait is <span className="italic text-primary">orderly</span>, not anxious.
          </h1>
          <p className="mb-10 max-w-[45ch] text-xl leading-relaxed text-muted-foreground">
            India's first AI-driven queuing system that respects your time. Real-time token
            updates, doctor transparency, and absolute calm for patients and staff.
          </p>
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              डाउनलोड करें • Try the demo
            </span>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/app"
                className="flex items-center gap-3 rounded-2xl border border-border bg-card px-6 py-3 shadow-sm transition-all hover:border-primary"
              >
                <div className="size-6 rounded bg-foreground" />
                <div className="text-left">
                  <div className="text-[10px] uppercase opacity-50">Try as</div>
                  <div className="font-bold leading-none">Patient</div>
                </div>
              </Link>
              <Link
                to="/admin"
                className="flex items-center gap-3 rounded-2xl border border-border bg-card px-6 py-3 shadow-sm transition-all hover:border-primary"
              >
                <div className="size-6 rounded bg-accent" />
                <div className="text-left">
                  <div className="text-[10px] uppercase opacity-50">Try as</div>
                  <div className="font-bold leading-none">Hospital Admin</div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="relative animate-reveal [animation-delay:200ms]">
          {/* Patient phone mockup */}
          <div className="relative z-10 mx-auto aspect-[9/19] w-full max-w-[320px] rounded-[40px] border-[8px] border-foreground bg-card p-5 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-lg font-bold">प्रतीक्षा</span>
              <div className="size-8 rounded-full bg-secondary" />
            </div>
            <div className="space-y-4">
              <div className="rounded-3xl bg-primary p-6 text-primary-foreground">
                <div className="mb-1 font-mono text-xs italic uppercase tracking-tighter opacity-80">
                  Your Token • आपका टोकन
                </div>
                <div className="mb-4 font-mono text-5xl font-bold">#B-24</div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-[10px] uppercase opacity-80">Position</div>
                    <div className="text-xl font-bold">4 Ahead</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase opacity-80">Est. Time</div>
                    <div className="text-xl font-bold">18 mins</div>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-border p-4">
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <h4 className="font-bold">Dr. Aditi Sharma</h4>
                    <p className="text-xs text-muted-foreground">Cardiology • Room 102</p>
                  </div>
                  <span className="rounded bg-success/15 px-2 py-1 text-[10px] font-bold uppercase text-success">
                    • On Time
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                  <div className="h-full w-[70%] bg-primary" />
                </div>
              </div>
              <div className="rounded-2xl border border-border p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold">Dr. Rajesh Iyer</h4>
                    <p className="text-xs text-muted-foreground">Pediatrics • Room 204</p>
                  </div>
                  <span className="rounded bg-warning/25 px-2 py-1 text-[10px] font-bold uppercase text-[color:oklch(0.42_0.14_50)]">
                    • Running Late
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard peek */}
          <div className="absolute -bottom-10 -right-4 hidden w-[400px] animate-reveal rounded-xl border border-l-4 border-border border-l-primary bg-card p-6 shadow-2xl [animation-delay:400ms] md:-right-20 md:block">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-widest">Admin Dashboard</h3>
              <span className="font-mono text-xs text-muted-foreground">City General Hospital</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-secondary p-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-primary">#B-23</span>
                  <span className="text-sm font-medium">Karan Malhotra</span>
                </div>
                <button className="rounded bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-foreground">
                  अगला Call Next
                </button>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3 opacity-50">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold">#B-22</span>
                  <span className="text-sm font-medium italic underline decoration-dotted">
                    Priya Singh (Completed)
                  </span>
                </div>
              </div>
              <div className="flex justify-between border-t border-border pt-2">
                <span className="text-[10px] font-bold uppercase text-muted-foreground">
                  Queue: 14 Waiting
                </span>
                <span className="text-[10px] font-bold uppercase text-primary">Avg Wait: 12m</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section id="features" className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-border md:grid-cols-4">
          {[
            {
              n: "01.",
              t: "टोकन बुक करें",
              d: "Book a virtual token from home. No physical queues, no rush.",
            },
            {
              n: "02.",
              t: "Live Tracking",
              d: "See how many people are ahead of you in real-time.",
            },
            {
              n: "03.",
              t: "डॉक्टर की उपलब्धता",
              d: "Get notified if your doctor is running late or on an emergency.",
            },
            {
              n: "04.",
              t: "Admin Sync",
              d: "One-tap dashboard for hospitals to manage thousand-patient rosters.",
            },
          ].map((f) => (
            <div key={f.n} className="flex flex-col gap-4 p-10">
              <div className="font-mono font-bold text-primary">{f.n}</div>
              <h3 className="text-lg font-bold">{f.t}</h3>
              <p className="text-sm text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Visual callout */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid items-stretch overflow-hidden rounded-3xl bg-foreground text-background lg:grid-cols-2">
          <div className="flex flex-col justify-center p-12 md:p-20">
            <h2 className="mb-8 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              Designed for every generation, from kids to grandparents.
            </h2>
            <ul className="space-y-6">
              {[
                "High contrast UI for easier reading by elderly patients.",
                "Large tap targets for easier navigation on the go.",
                "Multi-lingual support across Hindi, Marathi, and English.",
              ].map((t) => (
                <li key={t} className="flex gap-4">
                  <div className="flex size-6 shrink-0 items-center justify-center rounded-full border border-background/20">
                    ✓
                  </div>
                  <p className="opacity-80">{t}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative min-h-[400px] overflow-hidden bg-primary/10">
            <img
              src={patientImage}
              alt="Elderly Indian patient using Pratiksha AI on her smartphone in a hospital lobby"
              width={800}
              height={1000}
              className="size-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Access CTA */}
      <section id="access" className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            to="/app"
            className="group flex flex-col justify-between rounded-3xl border border-border bg-card p-10 transition-all hover:border-primary hover:shadow-xl"
          >
            <div className="mb-8 font-mono text-xs font-bold uppercase tracking-widest text-primary">
              For Patients →
            </div>
            <div>
              <h3 className="mb-3 text-3xl font-bold">Open the patient app</h3>
              <p className="text-muted-foreground">
                Book a token, see your live position, and get called when it's actually your turn.
              </p>
            </div>
          </Link>
          <Link
            to="/admin"
            className="group flex flex-col justify-between rounded-3xl border border-border bg-foreground p-10 text-background transition-all hover:shadow-xl"
          >
            <div className="mb-8 font-mono text-xs font-bold uppercase tracking-widest text-primary">
              For Hospitals →
            </div>
            <div>
              <h3 className="mb-3 text-3xl font-bold">Open the admin dashboard</h3>
              <p className="opacity-80">
                Manage OPD queues, mark doctors present or on leave, and call the next patient.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="size-6 rounded-full bg-foreground" />
            <span className="font-bold">Pratiksha AI</span>
          </div>
          <div className="font-mono text-xs text-muted-foreground">
            © 2026 PRATIKSHA TECHNOLOGIES • MUMBAI, INDIA
          </div>
          <div className="flex gap-6 text-sm font-bold">
            <a href="#" className="transition-colors hover:text-primary">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
