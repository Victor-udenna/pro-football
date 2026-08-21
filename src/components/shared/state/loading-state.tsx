import { Loader2Icon } from "lucide-react";

export function LoadingState({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-muted-foreground">
      <Loader2Icon className="size-5 animate-spin" />
      <p className="text-sm">{label}</p>
    </div>
  );
}
