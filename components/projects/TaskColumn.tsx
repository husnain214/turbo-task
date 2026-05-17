import TaskCard from "./TaskCard";

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
};

export default function TaskColumn({ title, tasks, count }: TaskColumnProps) {
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
    </div>
  );
}
