"use client";

import { useForm } from "react-hook-form";
import { SendIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CHAT_MESSAGE_MAX_LENGTH } from "@/utils/config";

type ChatFormValues = {
  message: string;
};

export function ChatInput({
  disabled,
  onSend,
  onTyping,
}: Readonly<{
  disabled: boolean;
  onSend: (text: string) => void;
  onTyping: () => void;
}>) {
  const { register, handleSubmit, watch, reset } = useForm<ChatFormValues>({
    defaultValues: { message: "" },
  });
  const { onChange: onMessageChange, ...messageField } = register("message");
  const value = watch("message");

  function submit({ message }: ChatFormValues) {
    if (!message.trim()) return;
    onSend(message);
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex items-center gap-2 px-3 pt-2 pb-3"
    >
      <Input
        disabled={disabled}
        maxLength={CHAT_MESSAGE_MAX_LENGTH}
        placeholder={disabled ? "Connecting to chat…" : "Send a message"}
        onChange={(event) => {
          onMessageChange(event);
          onTyping();
        }}
        {...messageField}
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
