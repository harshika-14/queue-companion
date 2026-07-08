import { createFileRoute } from "@tanstack/react-router";
import { DOCTORS, type DoctorStatus } from "@/lib/mockData";
import {
  callNext,
  getDoctor,
  getDoctorStatus,
  getQueue,
  setDoctorStatus,
  useStore,
} from "@/lib/mockStore";
import { StatusPill } from "@/components/StatusPill";
import { Users, Clock, Activity, ArrowRight, Megaphone } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
  head: () => ({
    meta: [
      { title: "Hospital dashboard — Pratiksha AI" },
      { name: "description", content: "Manage OPD queues, doctor availability, and call the next patient." },
    ],
  }),
});

function AdminDashboard() {
  const hospitalDoctors = DOCTORS.filter((d) => d.hospitalId === "cgh");

  const totals = useStore(() => {
    let waiting = 0;
    let serving = 0;
    let done = 0;
    for (const d of hospitalDoctors) {
      const q = getQueue(d.id);
      if (!q) continue;
      for (const e of q.entries) {
        if (e.status === "waiting") waiting++;
        else if (e.status === "serving") serving++;
        else done++;
      }
    }
    return { waiting, serving, done };
  });

  const avgWait = useStore(() => {
    let sum = 0;
    let n = 0;
    for (const d of hospitalDoctors) {
      const q = getQueue(d.id);
      if (!q) continue;
      const w = q.entries.filter((e) => e.status === "waiting").length;
      sum += w * d.avgConsultMinutes;
      n += w;
    }
    return n === 0 ? 0 : Math.round(sum / n);
  });

  return (
    <div className="animate-reveal space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
            Today · Live
          </p>
          <h1 className="mt-1 text-4xl font-extrabold leading-tight">OPD queue overview</h1>
        </div>
        <button
          onClick={() =>
            toast("Broadcast sent", {
              description: "All patients waiting today will be notified.",
            })
          }
          className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold transition-colors hover:border-primary"
        >
          <Megaphone className="size-4" />
          Broadcast delay
        </button>
      </div>

      {/* Stat strip */}
      <div className="grid gap-4 sm:grid-cols-4">
        <StatCard label="Waiting" value={totals.waiting} icon={<Users className="size-5" />} accent="primary" />
        <StatCard label="In Consult" value={totals.serving} icon={<Activity className="size-5" />} accent="accent" />
        <StatCard label="Completed" value={totals.done} icon={<ArrowRight className="size-5" />} accent="muted" />
        <StatCard label="Avg Wait" value={`${avgWait}m`} icon={<Clock className="size-5" />} accent="primary" />
      </div>

      {/* Doctor queues */}
      <div className="grid gap-4 lg:grid-cols-2">
        {hospitalDoctors.map((d) => (
          <DoctorQueueCard key={d.id} id={d.id} />
        ))}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  accent,
}: {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  accent: "primary" | "accent" | "muted";
}) {
  const accentClass =
    accent === "primary"
      ? "bg-primary/10 text-primary"
      : accent === "accent"
        ? "bg-accent/10 text-accent"
        : "bg-secondary text-muted-foreground";
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
        <div className={"flex size-8 items-center justify-center rounded-lg " + accentClass}>
          {icon}
        </div>
      </div>
      <div className="font-mono text-4xl font-extrabold tabular-nums">{value}</div>
    </div>
  );
}

function DoctorQueueCard({ id }: { id: string }) {
  const status = useStore(() => getDoctorStatus(id));
  const queue = useStore(() => getQueue(id));
  const doctor = getDoctor(id);
  if (!doctor) return null;
  const waiting = queue?.entries.filter((e) => e.status === "waiting").length ?? 0;
  const nowServing = queue?.entries.find((e) => e.status === "serving");
  const nextUp = queue?.entries.find((e) => e.status === "waiting");

  function toggleStatus(next: DoctorStatus) {
    setDoctorStatus(id, next);
    toast(`${doctor!.name} marked ${next.replace("_", " ")}`);
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-lg font-bold">{doctor.name}</div>
          <div className="text-xs text-muted-foreground">
            {doctor.specialty} • Room {doctor.room}
          </div>
          <div className="mt-2">
            <StatusPill status={status} />
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono text-4xl font-extrabold tabular-nums text-primary">
            {waiting}
          </div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            waiting
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-2 rounded-xl border border-border p-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Now serving
            </div>
            {nowServing ? (
              <div className="flex items-center gap-3">
                <span className="font-mono text-xl font-bold text-primary">
                  #{nowServing.token}
                </span>
                <span className="text-sm font-medium">{nowServing.patientName}</span>
              </div>
            ) : (
              <div className="text-sm italic text-muted-foreground">Queue empty</div>
            )}
          </div>
          <button
            onClick={() => {
              callNext(id);
              toast.success("Called next patient");
            }}
            disabled={!nextUp && !nowServing}
            className="rounded-lg bg-accent px-4 py-2 text-xs font-bold uppercase tracking-widest text-accent-foreground transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            अगला · Call Next
          </button>
        </div>
        {nextUp && (
          <div className="border-t border-border pt-2 text-xs text-muted-foreground">
            Next up:{" "}
            <span className="font-mono font-bold text-foreground">#{nextUp.token}</span>{" "}
            <span className="font-medium text-foreground">{nextUp.patientName}</span>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {(["available", "running_late", "on_leave", "closed"] as DoctorStatus[]).map((s) => (
          <button
            key={s}
            onClick={() => toggleStatus(s)}
            className={
              "rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest transition-colors " +
              (status === s
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-background text-muted-foreground hover:border-primary/40")
            }
          >
            {s.replace("_", " ")}
          </button>
        ))}
      </div>
    </div>
  );
}
