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
    <section>
      <h2 className={cn(DISPLAY_TEXT_CLASS, "mb-4 text-sm text-foreground")}>{title}</h2>
      {children}
    </section>
  );
}
