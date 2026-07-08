import { cn } from "@/lib/utils";
import type { DoctorStatus } from "@/lib/mockData";
import { statusLabel } from "@/lib/mockData";

const styles: Record<DoctorStatus, string> = {
  available: "bg-success/15 text-success",
  running_late: "bg-warning/25 text-[color:oklch(0.42_0.14_50)]",
  on_leave: "bg-muted/15 text-muted-foreground",
  closed: "bg-muted/15 text-muted-foreground",
};

export function StatusPill({ status, className }: { status: DoctorStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider",
        styles[status],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {statusLabel(status)}
    </span>
  );
}
