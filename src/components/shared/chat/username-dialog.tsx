"use client";

import { useState, type SubmitEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { generateGuestUsername } from "@/utils/id";

export function UsernameDialog({
  open,
  onSubmit,
}: Readonly<{
  open: boolean;
  onSubmit: (name: string) => void;
}>) {
  const [value, setValue] = useState("");

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    onSubmit(value.trim() || generateGuestUsername());
  }

  function handleGuest() {
    onSubmit(generateGuestUsername());
  }

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Join the conversation</DialogTitle>
          <DialogDescription>
            Pick a display name to chat with other fans watching this match.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            autoFocus
            placeholder="Your name"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            maxLength={24}
          />
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleGuest}>
              Continue as guest
            </Button>
            <Button type="submit">Join chat</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
