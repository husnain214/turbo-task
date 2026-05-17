import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/utils";
import { getProject } from "@/actions/projects";
import TaskColumn from "@/components/projects/task-column";
import { CreateTaskDialog } from "@/components/projects/create-task-dialog";

type Props = {
  params: Promise<{ projectId: string }>;
};

export default async function ProjectPage({ params }: Props) {
  const { projectId } = await params;

  const supabase = await createClient();
  const profile = await getProfile(supabase);
  if (!profile) redirect("/login");

  const project = await getProject(projectId, profile.client_id);
  if (!project) notFound();

  const tasksByStatus = {
    queue: project.tasks
      .filter((t) => t.status === "queue")
      .sort((a, b) => a.queue_order - b.queue_order),
    active: project.tasks.filter((t) => t.status === "active"),
    in_review: project.tasks.filter((t) => t.status === "in_review"),
    completed: project.tasks.filter((t) => t.status === "completed"),
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-medium">{project.title}</h1>
        {project.description && (
          <p className="text-sm text-muted-foreground">{project.description}</p>
        )}
      </div>

      <div className="grid grid-cols-4 gap-4">
        <TaskColumn
          title="Queue"
          tasks={tasksByStatus.queue}
          count={tasksByStatus.queue.length}
          allowCreate
        />

        <TaskColumn
          title="Active"
          tasks={tasksByStatus.active}
          count={tasksByStatus.active.length}
        />
        <TaskColumn
          title="In Review"
          tasks={tasksByStatus.in_review}
          count={tasksByStatus.in_review.length}
        />
        <TaskColumn
          title="Completed"
          tasks={tasksByStatus.completed}
          count={tasksByStatus.completed.length}
        />
      </div>
      <CreateTaskDialog projectId={projectId} />
    </div>
  );
}
