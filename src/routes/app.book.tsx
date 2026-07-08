import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { DOCTORS, HOSPITALS } from "@/lib/mockData";
import {
  bookToken,
  getQueue,
  getDoctorStatus,
  useStore,
  clearMyToken,
} from "@/lib/mockStore";
import { StatusPill } from "@/components/StatusPill";
import { toast } from "sonner";

export const Route = createFileRoute("/app/book")({
  component: BookPage,
  head: () => ({
    meta: [
      { title: "Book a token — Pratiksha AI" },
      { name: "description", content: "Book a walk-in token with any doctor at partner hospitals." },
    ],
  }),
});

function BookPage() {
  const [hospitalId, setHospitalId] = useState(HOSPITALS[0].id);
  const [patientName, setPatientName] = useState("Vithal Kulkarni");
  const navigate = useNavigate();

  const doctors = useMemo(() => DOCTORS.filter((d) => d.hospitalId === hospitalId), [hospitalId]);

  function handleBook(doctorId: string) {
    clearMyToken();
    const token = bookToken(doctorId, patientName.trim() || "Guest");
    toast.success(`Token booked: #${token}`, { description: "You'll be notified as your turn approaches." });
    navigate({ to: "/app/queue" });
  }

  return (
    <div className="animate-reveal space-y-6">
      <div>
        <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
          Step 1 · Hospital
        </p>
        <h1 className="mt-1 text-3xl font-extrabold leading-tight">Book a token</h1>
      </div>

      <div>
        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Choose hospital
        </label>
        <div className="mt-2 grid gap-2">
          {HOSPITALS.map((h) => (
            <button
              key={h.id}
              onClick={() => setHospitalId(h.id)}
              className={
                "flex items-center justify-between rounded-2xl border p-4 text-left transition-colors " +
                (hospitalId === h.id
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-primary/30")
              }
            >
              <div>
                <div className="font-bold">{h.name}</div>
                <div className="text-xs text-muted-foreground">
                  {h.area} • {h.city}
                </div>
              </div>
              <div className="font-mono text-sm font-bold">{h.distanceKm} km</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="patient-name"
          className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground"
        >
          Patient name
        </label>
        <input
          id="patient-name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          className="mt-2 w-full rounded-2xl border border-border bg-card px-4 py-3 text-base font-medium outline-none ring-primary/30 transition focus:border-primary focus:ring-2"
          placeholder="Enter patient name"
        />
      </div>

      <div>
        <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Step 2 · Doctor
        </p>
        <div className="space-y-3">
          {doctors.map((d) => (
            <DoctorBookRow key={d.id} id={d.id} onBook={() => handleBook(d.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}

function DoctorBookRow({ id, onBook }: { id: string; onBook: () => void }) {
  const status = useStore(() => getDoctorStatus(id));
  const queue = useStore(() => getQueue(id));
  const doctor = DOCTORS.find((d) => d.id === id)!;
  const waiting = queue?.entries.filter((e) => e.status === "waiting").length ?? 0;
  const disabled = status === "on_leave" || status === "closed";

  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-base font-bold">{doctor.name}</div>
          <div className="text-xs text-muted-foreground">
            {doctor.specialty} • Room {doctor.room} • ₹{doctor.fee}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <StatusPill status={status} />
            <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              {doctor.languages.join(" • ")}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono text-2xl font-bold text-primary tabular-nums">{waiting}</div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
            waiting
          </div>
        </div>
      </div>
      <button
        onClick={onBook}
        disabled={disabled}
        className="mt-4 w-full rounded-xl bg-foreground py-3 text-sm font-bold uppercase tracking-wider text-background transition-colors hover:bg-primary disabled:cursor-not-allowed disabled:opacity-40"
      >
        {disabled ? "Unavailable" : "Book Token"}
      </button>
    </div>
  );
}
