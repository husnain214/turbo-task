import { Plus } from "lucide-react";
import TaskCard from "./task-card";

type Task = {
  id: string;
  title: string;
  description: string | null;
  status: string;
  queue_order: number;
  cycle_deadline: string | null;
  revision_count: number;
  created_at: string | null;
};

type TaskColumnProps = {
  title: string;
  tasks: Task[];
  count: number;
  allowCreate?: boolean;
};

export default function TaskColumn({
  title,
  tasks,
  count,
  allowCreate,
}: TaskColumnProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {title}
        </span>
        <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded-md">
          {count}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {tasks.length === 0 ? (
          <div className="rounded-lg border border-dashed p-4 text-center">
            <p className="text-xs text-muted-foreground">No tasks</p>
          </div>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>

      {allowCreate && (
        <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors w-fit">
          <Plus className="h-3.5 w-3.5" />
          Add task
        </button>
      )}
    </div>
  );
}
