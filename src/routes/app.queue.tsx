import { createFileRoute, Link } from "@tanstack/react-router";
import {
  useStore,
  getMyToken,
  getQueue,
  getDoctor,
  positionAhead,
  estimatedWaitMinutes,
  clearMyToken,
} from "@/lib/mockStore";
import { StatusPill } from "@/components/StatusPill";
import { Bell, MapPin, X } from "lucide-react";


export const Route = createFileRoute("/app/queue")({
  component: QueuePage,
  head: () => ({
    meta: [
      { title: "My queue — Pratiksha AI" },
      { name: "description", content: "Live position in your booked queue." },
    ],
  }),
});

function QueuePage() {
  const my = useStore(getMyToken);

  if (!my) {
    return (
      <div className="animate-reveal rounded-3xl border border-dashed border-border bg-card p-10 text-center">
        <div className="mb-2 font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
          No active token
        </div>
        <h2 className="mb-4 text-2xl font-bold">You're not in a queue yet</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Book a token to see your live position and estimated waiting time.
        </p>
        <Link
          to="/app/book"
          className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground"
        >
          Book a Token
        </Link>
      </div>
    );
  }

  return <ActiveQueue doctorId={my.doctorId} token={my.token} />;
}

function ActiveQueue({ doctorId, token }: { doctorId: string; token: string }) {
  const queue = _u(() => getQueue(doctorId));
  const ahead = _u(() => positionAhead(doctorId, token));
  const eta = _u(() => estimatedWaitMinutes(doctorId, token));
  const doctor = getDoctor(doctorId);
  if (!queue || !doctor) return null;

  const you = queue.entries.find((e) => e.token === token);
  const isYourTurn = you?.status === "serving";
  const isDone = you?.status === "done";

  return (
    <div className="animate-reveal space-y-6">
      <div className="rounded-3xl bg-primary p-6 text-primary-foreground shadow-lg shadow-primary/20">
        <div className="mb-1 flex items-center justify-between font-mono text-xs italic uppercase tracking-tighter opacity-80">
          <span>Your Token • आपका टोकन</span>
          <button
            onClick={clearMyToken}
            className="rounded-full bg-white/10 p-1 transition-colors hover:bg-white/20"
            aria-label="Cancel token"
          >
            <X className="size-3.5" />
          </button>
        </div>
        <div className="mb-6 font-mono text-7xl font-bold tabular-nums">#{token}</div>
        {isDone ? (
          <div className="rounded-xl bg-white/10 p-4 text-center text-sm font-bold uppercase tracking-widest">
            Consultation complete
          </div>
        ) : isYourTurn ? (
          <div className="rounded-xl bg-white/20 p-4 text-center">
            <div className="text-[10px] uppercase tracking-widest opacity-80">Now serving</div>
            <div className="text-2xl font-bold">It's your turn — please head in</div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/10 p-4">
              <div className="text-[10px] uppercase tracking-widest opacity-80">Position</div>
              <div className="text-3xl font-bold tabular-nums">{ahead}</div>
              <div className="text-[10px] uppercase tracking-widest opacity-70">
                ahead of you
              </div>
            </div>
            <div className="rounded-xl bg-white/10 p-4">
              <div className="text-[10px] uppercase tracking-widest opacity-80">Est. wait</div>
              <div className="text-3xl font-bold tabular-nums">~{eta}m</div>
              <div className="text-[10px] uppercase tracking-widest opacity-70">from now</div>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-border bg-card p-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-base font-bold">{doctor.name}</div>
            <div className="text-xs text-muted-foreground">
              {doctor.specialty} • Room {doctor.room}
            </div>
          </div>
          <StatusPill status={queue ? (statusLabel ? (doctor.status) : "available") : "closed"} />
        </div>
        <div className="mt-4 flex gap-2">
          <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-background py-3 text-xs font-bold uppercase tracking-widest">
            <Bell className="size-4" />
            Alerts On
          </button>
          <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-background py-3 text-xs font-bold uppercase tracking-widest">
            <MapPin className="size-4" />
            Directions
          </button>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-muted-foreground">
          Queue timeline
        </h3>
        <div className="space-y-2">
          {queue.entries.slice(-8).map((e) => {
            const isYou = e.token === token;
            return (
              <div
                key={e.token}
                className={
                  "flex items-center justify-between rounded-xl border p-3 text-sm " +
                  (isYou
                    ? "border-primary bg-primary/5 font-bold"
                    : e.status === "serving"
                      ? "border-accent/50 bg-accent/5"
                      : e.status === "done"
                        ? "border-border bg-transparent opacity-50"
                        : "border-border bg-card")
                }
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-primary">#{e.token}</span>
                  <span>
                    {isYou ? "You" : e.patientName}
                    {e.status === "serving" && (
                      <span className="ml-2 rounded bg-accent/15 px-1.5 py-0.5 text-[10px] font-bold uppercase text-accent">
                        Now serving
                      </span>
                    )}
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {e.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
