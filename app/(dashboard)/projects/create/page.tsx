"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";

import { createProjectAction } from "@/actions/projects";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function CreateProject() {
  const router = useRouter();
  const [data, action, isPending] = useActionState(createProjectAction, {
    payload: {
      title: "",
      description: "",
    },
    errors: {},
  });

  return (
    <div className="flex flex-col gap-6 max-w-xl">
      <Link
        href="/projects"
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to projects
      </Link>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-medium">New project</CardTitle>
          <CardDescription className="text-xs">
            Projects group your tasks together. You can add tasks after creating
            the project.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form action={action} className="flex flex-col gap-5">
            <FieldGroup className="flex flex-col gap-1.5">
              <FieldLabel htmlFor="title" className="text-xs font-medium">
                Project name <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="title"
                name="title"
                placeholder="e.g. Website Redesign"
                defaultValue={data.payload.title}
                aria-invalid={!!data?.errors?.title}
              />
              {data?.errors?.title && (
                <FieldError>{data?.errors?.title}</FieldError>
              )}
            </FieldGroup>

            <FieldGroup className="flex flex-col gap-1.5">
              <FieldLabel htmlFor="description" className="text-xs font-medium">
                Description
                <span className="text-muted-foreground font-normal">
                  (optional)
                </span>
              </FieldLabel>
              <Textarea
                id="description"
                name="description"
                placeholder="What is this project about?"
                className="resize-none"
                defaultValue={data.payload.description}
                aria-invalid={!!data?.errors?.description}
              />
              {data?.errors?.description && (
                <FieldError>{data?.errors?.description}</FieldError>
              )}
            </FieldGroup>

            <div className="flex items-center gap-2 pt-1">
              <Button type="submit" disabled={isPending} className="gap-2">
                {isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                {isPending ? "Creating..." : "Create project"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                disabled={isPending}
                onClick={() => router.push("/projects")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
