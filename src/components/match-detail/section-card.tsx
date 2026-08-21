import { cn } from "@/lib/utils";
import { DISPLAY_TEXT_CLASS } from "@/utils/typography";

export function SectionCard({
  title,
  children,
}: Readonly<{
  title: string;
  children: React.ReactNode;
}>) {
  return (
    <div className="rounded-xl border bg-card p-5 ring-1 ring-foreground/10">
      <h2 className={cn(DISPLAY_TEXT_CLASS, "mb-4 text-sm")}>{title}</h2>
      {children}
    </div>
  );
}
