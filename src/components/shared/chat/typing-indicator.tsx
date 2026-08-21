import type { TypingUser } from "@/types/chat";

export function TypingIndicator({ users }: Readonly<{ users: TypingUser[] }>) {
  if (users.length === 0) {
    return <div className="h-5" />;
  }

  const label =
    users.length === 1
      ? `${users[0].username} is typing…`
      : users.length === 2
        ? `${users[0].username} and ${users[1].username} are typing…`
        : `${users.length} people are typing…`;

  return (
    <div className="flex h-5 items-center gap-1.5 px-4 text-xs text-muted-foreground">
      <span className="flex gap-0.5">
        <span className="size-1 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
        <span className="size-1 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
        <span className="size-1 animate-bounce rounded-full bg-muted-foreground" />
      </span>
      {label}
    </div>
  );
}
