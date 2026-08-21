import Link from "next/link";
import { AlertTriangleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ErrorState({
  title = "Something went wrong",
  description,
  onRetry,
  homeHref,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  homeHref?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed py-16 text-center">
      <AlertTriangleIcon className="size-5 text-destructive" />
      <div className="space-y-1">
        <p className="text-sm font-medium">{title}</p>
        {description && (
          <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {(onRetry || homeHref) && (
        <div className="flex items-center gap-2">
          {onRetry && (
            <Button variant="outline" size="sm" onClick={onRetry}>
              Try again
            </Button>
          )}
          {homeHref && (
            <Button
              variant="outline"
              size="sm"
              nativeButton={false}
              render={<Link href={homeHref} />}
            >
              Back to all matches
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
