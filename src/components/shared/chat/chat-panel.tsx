"use client";

import { useChatIdentity } from "@/hooks/use-chat-identity";
import { useChat } from "@/hooks/use-chat";
import { UsernameDialog } from "@/components/shared/chat/username-dialog";
import { ChatMessageList } from "@/components/shared/chat/chat-message-list";
import { TypingIndicator } from "@/components/shared/chat/typing-indicator";
import { QuickReactions } from "@/components/shared/chat/quick-reactions";
import { ChatInput } from "@/components/shared/chat/chat-input";
import { cn } from "@/lib/utils";
import { DISPLAY_TEXT_CLASS } from "@/utils/typography";

export function ChatPanel({ matchId }: Readonly<{ matchId: string }>) {
  const { userId, username, setUsername, isReady } = useChatIdentity();
  const { messages, typingUsers, sendMessage, notifyTyping, canChat } = useChat({
    matchId,
    userId,
    username,
  });

  const needsUsername = isReady && !username;

  return (
    <div className="flex h-[32rem] flex-col overflow-hidden rounded-xl border bg-card ring-1 ring-foreground/10 lg:sticky lg:top-20">
      <div className="border-b px-4 py-3">
        <h2 className={cn(DISPLAY_TEXT_CLASS, "text-sm")}>Match Chat</h2>
        <p className="text-xs text-muted-foreground">
          {username ? `Chatting as ${username}` : "Join to start chatting"}
        </p>
      </div>
      <ChatMessageList messages={messages} currentUserId={userId} />
      <TypingIndicator users={typingUsers} />
      <QuickReactions disabled={!canChat} onReact={sendMessage} />
      <ChatInput disabled={!canChat} onSend={sendMessage} onTyping={notifyTyping} />
      <UsernameDialog open={needsUsername} onSubmit={setUsername} />
    </div>
  );
}
