export type DoctorStatus = "available" | "running_late" | "on_leave" | "closed";

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  room: string;
  status: DoctorStatus;
  hospitalId: string;
  languages: string[];
  fee: number;
  experienceYears: number;
  avgConsultMinutes: number;
}

export interface Hospital {
  id: string;
  name: string;
  area: string;
  city: string;
  distanceKm: number;
}

export const HOSPITALS: Hospital[] = [
  { id: "cgh", name: "City General Hospital", area: "Andheri West", city: "Mumbai", distanceKm: 2.1 },
  { id: "sunrise", name: "Sunrise Multispecialty", area: "Bandra", city: "Mumbai", distanceKm: 4.8 },
  { id: "aarogya", name: "Aarogya Clinic", area: "Kurla", city: "Mumbai", distanceKm: 6.2 },
];

export const DOCTORS: Doctor[] = [
  {
    id: "dr-aditi",
    name: "Dr. Aditi Sharma",
    specialty: "Cardiology",
    room: "102",
    status: "available",
    hospitalId: "cgh",
    languages: ["English", "Hindi", "Marathi"],
    fee: 700,
    experienceYears: 14,
    avgConsultMinutes: 8,
  },
  {
    id: "dr-rajesh",
    name: "Dr. Rajesh Iyer",
    specialty: "Pediatrics",
    room: "204",
    status: "running_late",
    hospitalId: "cgh",
    languages: ["English", "Hindi", "Tamil"],
    fee: 500,
    experienceYears: 9,
    avgConsultMinutes: 10,
  },
  {
    id: "dr-anjali",
    name: "Dr. Anjali Kulkarni",
    specialty: "General Physician",
    room: "OPD 2",
    status: "available",
    hospitalId: "cgh",
    languages: ["English", "Marathi", "Hindi"],
    fee: 400,
    experienceYears: 18,
    avgConsultMinutes: 6,
  },
  {
    id: "dr-sameer",
    name: "Dr. Sameer Deshpande",
    specialty: "Orthopaedics",
    room: "301",
    status: "on_leave",
    hospitalId: "sunrise",
    languages: ["English", "Marathi"],
    fee: 800,
    experienceYears: 12,
    avgConsultMinutes: 12,
  },
  {
    id: "dr-meera",
    name: "Dr. Meera Patil",
    specialty: "Dermatology",
    room: "108",
    status: "available",
    hospitalId: "sunrise",
    languages: ["English", "Marathi", "Hindi"],
    fee: 600,
    experienceYears: 7,
    avgConsultMinutes: 7,
  },
  {
    id: "dr-vikram",
    name: "Dr. Vikram Rao",
    specialty: "ENT",
    room: "112",
    status: "available",
    hospitalId: "aarogya",
    languages: ["English", "Hindi"],
    fee: 450,
    experienceYears: 11,
    avgConsultMinutes: 9,
  },
];

export function statusLabel(s: DoctorStatus): string {
  return {
    available: "Available",
    running_late: "Running Late",
    on_leave: "On Leave",
    closed: "OPD Closed",
  }[s];
}
