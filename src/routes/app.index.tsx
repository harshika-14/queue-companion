import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { DOCTORS, HOSPITALS } from "@/lib/mockData";
import {
  useStore,
  getMyToken,
  getQueue,
  getDoctor,
  positionAhead,
  estimatedWaitMinutes,
  getDoctorStatus,
} from "@/lib/mockStore";
import { StatusPill } from "@/components/StatusPill";
import { ChevronRight, MapPin, Sparkles } from "lucide-react";

export const Route = createFileRoute("/app/")({
  component: PatientHome,
  head: () => ({
    meta: [
      { title: "Home — Pratiksha AI" },
      {
        name: "description",
        content: "Your live token, doctor availability, and nearby hospitals.",
      },
    ],
  }),
});

function PatientHome() {
  const navigate = useNavigate();
  const my = useStore(getMyToken);

  return (
    <div className="animate-reveal space-y-8">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          नमस्ते • Welcome back
        </p>
        <h1 className="mt-1 text-3xl font-extrabold leading-tight">Vithal Kulkarni</h1>
      </div>

      {/* Active token or CTA */}
      {my ? (
        <ActiveTokenCard doctorId={my.doctorId} token={my.token} />
      ) : (
        <button
          onClick={() => navigate({ to: "/app/book" })}
          className="group flex w-full items-center justify-between rounded-3xl bg-primary p-6 text-left text-primary-foreground shadow-lg shadow-primary/20 transition-transform active:scale-[0.98]"
        >
          <div>
            <div className="mb-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest opacity-80">
              <Sparkles className="size-3" />
              Book a token
            </div>
            <div className="text-2xl font-bold">Skip the wait →</div>
            <p className="mt-1 text-sm opacity-80">
              Choose a doctor, get a token, walk in when it's your turn.
            </p>
          </div>
          <ChevronRight className="size-8" />
        </button>
      )}

      {/* Doctor availability */}
      <section>
        <div className="mb-3 flex items-end justify-between">
          <h2 className="text-xl font-bold">Doctor availability</h2>
          <Link
            to="/app/book"
            className="font-mono text-xs font-bold uppercase tracking-widest text-primary"
          >
            Book →
          </Link>
        </div>
        <div className="space-y-3">
          {DOCTORS.slice(0, 4).map((d) => (
            <DoctorRow key={d.id} id={d.id} />
          ))}
        </div>
      </section>

      {/* Nearby hospitals */}
      <section>
        <h2 className="mb-3 text-xl font-bold">Nearby hospitals</h2>
        <div className="space-y-2">
          {HOSPITALS.map((h) => (
            <div
              key={h.id}
              className="flex items-center justify-between rounded-2xl border border-border bg-card p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <MapPin className="size-5" />
                </div>
                <div>
                  <div className="font-bold">{h.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {h.area} • {h.city}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono text-sm font-bold">{h.distanceKm} km</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  away
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function DoctorRow({ id }: { id: string }) {
  const status = useStore(() => getDoctorStatus(id));
  const doctor = getDoctor(id);
  const queue = useStore(() => getQueue(id));
  if (!doctor) return null;
  const waiting = queue?.entries.filter((e) => e.status === "waiting").length ?? 0;

  return (
    <Link
      to="/app/book"
      className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
    >
      <div>
        <div className="font-bold">{doctor.name}</div>
        <div className="text-xs text-muted-foreground">
          {doctor.specialty} • Room {doctor.room}
        </div>
        <div className="mt-2">
          <StatusPill status={status} />
        </div>
      </div>
      <div className="text-right">
        <div className="font-mono text-2xl font-bold text-primary">{waiting}</div>
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
          in queue
        </div>
      </div>
    </Link>
  );
}

function ActiveTokenCard({ doctorId, token }: { doctorId: string; token: string }) {
  const ahead = useStore(() => positionAhead(doctorId, token));
  const eta = useStore(() => estimatedWaitMinutes(doctorId, token));
  const doctor = getDoctor(doctorId);
  return (
    <Link
      to="/app/queue"
      className="block rounded-3xl bg-primary p-6 text-primary-foreground shadow-lg shadow-primary/20"
    >
      <div className="mb-1 font-mono text-xs italic uppercase tracking-tighter opacity-80">
        Your Token • आपका टोकन
      </div>
      <div className="mb-5 font-mono text-6xl font-bold tabular-nums">#{token}</div>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-widest opacity-80">Position</div>
          <div className="text-2xl font-bold">
            {ahead === 0 ? "You're next" : `${ahead} ahead`}
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-widest opacity-80">Est. Time</div>
          <div className="text-2xl font-bold">~{eta} min</div>
        </div>
      </div>
      {doctor && (
        <div className="mt-5 border-t border-primary-foreground/20 pt-4 text-sm opacity-90">
          {doctor.name} • {doctor.specialty} • Room {doctor.room}
        </div>
      )}
    </Link>
  );
}
