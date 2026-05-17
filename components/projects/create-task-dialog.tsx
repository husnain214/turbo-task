// components/tasks/create-task-dialog.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const createTaskAction = () => {};

type Props = {
  projectId: string;
};

type FormState = {
  title: string;
  description: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

// ─── Component ────────────────────────────────────────────────────────────────

export function CreateTaskDialog({ projectId }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormState>({ title: "", description: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const titleRef = useRef<HTMLInputElement>(null);

  // auto focus title when dialog opens
  useEffect(() => {
    if (open) setTimeout(() => titleRef.current?.focus(), 50);
  }, [open]);

  // ── Helpers ─────────────────────────────────────────────────────────────────

  function set(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };
  }

  function reset() {
    setForm({ title: "", description: "" });
    setErrors({});
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) reset();
      }}
    >
      <DialogTrigger asChild>
        <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors w-fit">
          <Plus className="h-3.5 w-3.5" />
          Add task
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-sm font-medium">New task</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 pt-1">
          {/* title */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="task-title" className="text-xs font-medium">
              Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="task-title"
              ref={titleRef}
              placeholder="e.g. Design homepage hero"
              value={form.title}
              onChange={set("title")}
              maxLength={80}
              className={
                errors.title
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }
            />
            <div className="flex items-center justify-between">
              {errors.title ? (
                <p className="text-xs text-destructive">{errors.title}</p>
              ) : (
                <span />
              )}
              <p className="text-[11px] text-muted-foreground ml-auto">
                {form.title.length}/80
              </p>
            </div>
          </div>

          {/* description */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="task-description" className="text-xs font-medium">
              Description{" "}
              <span className="text-muted-foreground font-normal">
                (optional)
              </span>
            </Label>
            <Textarea
              id="task-description"
              placeholder="What needs to be done?"
              value={form.description}
              onChange={set("description")}
              rows={3}
              className="resize-none"
            />
          </div>

          {/* actions */}
          <div className="flex items-center justify-between pt-1">
            <p className="text-[11px] text-muted-foreground">
              ⌘ + Enter to submit
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  reset();
                  setOpen(false);
                }}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button size="sm" disabled={loading} className="gap-1.5">
                {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                {loading ? "Adding..." : "Add task"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
