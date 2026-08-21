export function LiveIndicator() {
  return (
    <span className="relative h-1 w-4 shrink-0 overflow-hidden rounded-full bg-destructive/25">
      <span className="absolute inset-y-0 left-0 w-1/2 rounded-full bg-destructive animate-live-slide" />
    </span>
  );
}
