import Link from "next/link";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Database } from "@/types/database.types";
import { ArrowRight, CheckCircle, Clock, ListTodo } from "lucide-react";

type Project = Database["public"]["Tables"]["projects"]["Row"];

type ProjectCardProps = Project & {
  tasks: { id: string; status: string }[];
};

export default function ProjectCard({
  project,
}: {
  project: ProjectCardProps;
}) {
  const total_tasks = project.tasks.length;
  const active_tasks = project.tasks.filter(
    (t) => t.status === "active",
  ).length;
  const completed_tasks = project.tasks.filter(
    (t) => t.status === "completed",
  ).length;

  const badge = getStatusBadge(active_tasks, total_tasks, completed_tasks);
  const progress = getProgress(completed_tasks, total_tasks);

  return (
    <Card className="w-full max-w-[min(100%,24rem)] flex flex-col hover:shadow-md transition-shadow duration-200">
      <CardContent className="flex flex-col gap-3 pt-5 pb-3 px-5 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-sm font-medium leading-snug line-clamp-2 flex-1">
            {project.title}
          </h3>
          <Badge variant={badge.variant} className="shrink-0 text-[10px]">
            {badge.label}
          </Badge>
        </div>

        {project.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        )}

        <div className="flex flex-col gap-1.5">
          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-foreground transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[11px] text-muted-foreground">
            {progress}% complete
          </p>
        </div>

        <div className="flex items-center gap-4 pt-1">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ListTodo className="h-3.5 w-3.5" />
            <span>
              {total_tasks} task{total_tasks !== 1 ? "s" : ""}
            </span>
          </div>
          {active_tasks > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-600">
              <Clock className="h-3.5 w-3.5" />
              <span>{active_tasks} active</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CheckCircle className="h-3.5 w-3.5" />
            <span>{completed_tasks} done</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-5 py-3 border-t">
        <div className="flex items-center justify-between w-full">
          <p className="text-[11px] text-muted-foreground">
            {new Date(String(project.created_at)).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="gap-1.5 h-7 text-xs"
          >
            <Link href={`/projects/${project.id}`}>
              Open <ArrowRight className="h-3 w-3" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

function getStatusBadge(active: number, total: number, completed: number) {
  if (total === 0) return { label: "Empty", variant: "secondary" as const };
  if (active > 0) return { label: "Active", variant: "default" as const };
  if (completed === total)
    return { label: "Done", variant: "outline" as const };
  return { label: "Queued", variant: "secondary" as const };
}

function getProgress(completed: number, total: number) {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}
