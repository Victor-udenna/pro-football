"use client";

import { useEffect, useRef } from "react";
import { MessageCircleIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessageItem } from "@/components/chat/chat-message-item";
import { EmptyState } from "@/components/state/empty-state";
import type { ChatMessage } from "@/types/chat";

export function ChatMessageList({
  messages,
  currentUserId,
}: {
  messages: ChatMessage[];
  currentUserId: string | null;
}) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center px-4">
        <EmptyState
          icon={MessageCircleIcon}
          title="No messages yet"
          description="Say hello to fans watching this match."
        />
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1">
      <div className="flex flex-col gap-3 p-4">
        {messages.map((message) => (
          <ChatMessageItem
            key={message.id}
            message={message}
            isOwn={message.userId === currentUserId}
          />
        ))}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}
