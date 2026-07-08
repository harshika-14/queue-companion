import { useSyncExternalStore } from "react";
import { DOCTORS, type Doctor, type DoctorStatus } from "./mockData";

export interface QueueEntry {
  token: string;
  patientName: string;
  status: "waiting" | "serving" | "done";
  bookedAt: number;
}

interface DoctorQueue {
  doctorId: string;
  currentServing: string | null; // token being served
  entries: QueueEntry[]; // waiting + serving + done, in booking order
  nextTokenNumber: number;
  prefix: string;
}

interface State {
  queues: Record<string, DoctorQueue>;
  doctorStatus: Record<string, DoctorStatus>;
  myToken: { doctorId: string; token: string } | null;
}

// --- Seed ---
const seedNames = [
  "Karan Malhotra",
  "Priya Singh",
  "Ramesh Yadav",
  "Sunita Devi",
  "Arjun Nair",
  "Fatima Sheikh",
  "Neha Gupta",
  "Vishal Joshi",
  "Deepa Menon",
  "Anil Kumar",
  "Rekha Bhat",
  "Sanjay Patil",
  "Kavya Reddy",
  "Mohit Bansal",
];

function seedQueue(doctorId: string, prefix: string, count: number, serving: number): DoctorQueue {
  const entries: QueueEntry[] = [];
  for (let i = 1; i <= count; i++) {
    const token = `${prefix}-${String(i).padStart(2, "0")}`;
    let status: QueueEntry["status"] = "waiting";
    if (i < serving) status = "done";
    else if (i === serving) status = "serving";
    entries.push({
      token,
      patientName: seedNames[(i + doctorId.length) % seedNames.length],
      status,
      bookedAt: Date.now() - (count - i) * 60_000,
    });
  }
  return {
    doctorId,
    currentServing: `${prefix}-${String(serving).padStart(2, "0")}`,
    entries,
    nextTokenNumber: count + 1,
    prefix,
  };
}

const state: State = {
  queues: {
    "dr-aditi": seedQueue("dr-aditi", "A", 18, 12),
    "dr-rajesh": seedQueue("dr-rajesh", "B", 22, 15),
    "dr-anjali": seedQueue("dr-anjali", "G", 14, 9),
    "dr-meera": seedQueue("dr-meera", "D", 10, 6),
    "dr-vikram": seedQueue("dr-vikram", "E", 8, 4),
    "dr-sameer": seedQueue("dr-sameer", "O", 0, 0),
  },
  doctorStatus: Object.fromEntries(DOCTORS.map((d) => [d.id, d.status])) as Record<
    string,
    DoctorStatus
  >,
  myToken: null,
};

// --- Pub/Sub ---
const listeners = new Set<() => void>();
let snapshotId = 0;
function emit() {
  snapshotId++;
  listeners.forEach((l) => l());
}
function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}
function getVersion() {
  return snapshotId;
}

// --- Selectors ---
export function getDoctor(id: string): Doctor | undefined {
  return DOCTORS.find((d) => d.id === id);
}

export function getQueue(doctorId: string): DoctorQueue | undefined {
  return state.queues[doctorId];
}

export function getDoctorStatus(id: string): DoctorStatus {
  return state.doctorStatus[id] ?? "closed";
}

export function getMyToken() {
  return state.myToken;
}

export function positionAhead(doctorId: string, token: string): number {
  const q = state.queues[doctorId];
  if (!q) return 0;
  const idx = q.entries.findIndex((e) => e.token === token);
  const servingIdx = q.entries.findIndex((e) => e.status === "serving");
  if (idx < 0) return 0;
  const base = servingIdx < 0 ? 0 : servingIdx;
  return Math.max(0, idx - base);
}

export function estimatedWaitMinutes(doctorId: string, token: string): number {
  const doc = getDoctor(doctorId);
  const ahead = positionAhead(doctorId, token);
  return ahead * (doc?.avgConsultMinutes ?? 8);
}

// --- Actions ---
export function bookToken(doctorId: string, patientName: string): string {
  const q = state.queues[doctorId];
  if (!q) throw new Error("No queue");
  const n = q.nextTokenNumber++;
  const token = `${q.prefix}-${String(n).padStart(2, "0")}`;
  q.entries.push({
    token,
    patientName,
    status: q.currentServing ? "waiting" : "serving",
    bookedAt: Date.now(),
  });
  if (!q.currentServing) q.currentServing = token;
  state.myToken = { doctorId, token };
  emit();
  return token;
}

export function callNext(doctorId: string) {
  const q = state.queues[doctorId];
  if (!q) return;
  const servingIdx = q.entries.findIndex((e) => e.status === "serving");
  if (servingIdx >= 0) q.entries[servingIdx].status = "done";
  const nextIdx = q.entries.findIndex((e) => e.status === "waiting");
  if (nextIdx >= 0) {
    q.entries[nextIdx].status = "serving";
    q.currentServing = q.entries[nextIdx].token;
  } else {
    q.currentServing = null;
  }
  emit();
}

export function setDoctorStatus(id: string, status: DoctorStatus) {
  state.doctorStatus[id] = status;
  emit();
}

export function clearMyToken() {
  state.myToken = null;
  emit();
}

// --- React hook ---
// Subscribe to store version so any mutation triggers a re-render, then run
// the selector fresh on each render. The store mutates entries in place, so
// we can't compare snapshots by reference — version bumping is the signal.
export function useStore<T>(selector: () => T): T {
  useSyncExternalStore(subscribe, getVersion, getVersion);
  return selector();
}

