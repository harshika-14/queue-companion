export function Logo({ className }: { className?: string }) {
  return (
    <div className={className ?? "flex items-center gap-2.5"}>
      <div className="flex size-8 items-center justify-center rounded-full bg-primary">
        <div className="size-3 rotate-45 rounded-sm bg-primary-foreground" />
      </div>
      <span className="text-xl font-bold tracking-tight text-foreground">
        Pratiksha <span className="text-primary">AI</span>
      </span>
    </div>
  );
}
