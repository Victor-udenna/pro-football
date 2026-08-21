import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types/chat";

export function ChatMessageItem({
  message,
  isOwn,
}: Readonly<{
  message: ChatMessage;
  isOwn: boolean;
}>) {
  if (message.kind === "system") {
    return (
      <div className="py-1 text-center text-xs text-muted-foreground">
        {message.message}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-0.5", isOwn ? "items-end" : "items-start")}>
      <div className="flex items-baseline gap-2 px-1">
        <span className="text-xs font-semibold">{isOwn ? "You" : message.username}</span>
        <span className="text-[10px] text-muted-foreground">
          {new Date(message.timestamp).toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-3 py-2 text-sm break-words",
          isOwn
            ? "rounded-br-sm bg-primary text-primary-foreground"
            : "rounded-bl-sm bg-muted"
        )}
      >
        {message.message}
      </div>
    </div>
  );
}
