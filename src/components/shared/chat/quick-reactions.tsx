const REACTIONS = ["⚽", "🔥", "😂", "👏", "😢", "🟨"];

export function QuickReactions({
  disabled,
  onReact,
}: Readonly<{ disabled: boolean; onReact: (emoji: string) => void }>) {
  return (
    <div className="flex items-center gap-1 border-t px-3 pt-2">
      {REACTIONS.map((emoji) => (
        <button
          key={emoji}
          type="button"
          disabled={disabled}
          onClick={() => onReact(emoji)}
          className="flex size-8 cursor-pointer items-center justify-center rounded-full text-base transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
          aria-label={`React with ${emoji}`}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}
