"use client";

import { useState, type FormEvent } from "react";
import { SendIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CHAT_MESSAGE_MAX_LENGTH } from "@/utils/config";

export function ChatInput({
  disabled,
  onSend,
  onTyping,
}: Readonly<{
  disabled: boolean;
  onSend: (text: string) => void;
  onTyping: () => void;
}>) {
  const [value, setValue] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!value.trim()) return;
    onSend(value);
    setValue("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 px-3 pt-2 pb-3">
      <Input
        value={value}
        disabled={disabled}
        maxLength={CHAT_MESSAGE_MAX_LENGTH}
        placeholder={disabled ? "Connecting to chat…" : "Send a message"}
        onChange={(event) => {
          setValue(event.target.value);
          onTyping();
        }}
      />
      <Button
        type="submit"
        size="icon"
        disabled={disabled || !value.trim()}
        aria-label="Send message"
      >
        <SendIcon />
      </Button>
    </form>
  );
}
