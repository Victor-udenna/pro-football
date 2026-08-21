"use client";

import { useForm } from "react-hook-form";
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

type UsernameFormValues = {
  name: string;
};

export function UsernameDialog({
  open,
  onSubmit,
}: Readonly<{
  open: boolean;
  onSubmit: (name: string) => void;
}>) {
  const { register, handleSubmit } = useForm<UsernameFormValues>({
    defaultValues: { name: "" },
  });

  function submit({ name }: UsernameFormValues) {
    onSubmit(name.trim() || generateGuestUsername());
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
        <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-3">
          <Input autoFocus placeholder="Your name" maxLength={24} {...register("name")} />
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
