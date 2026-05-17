type TaskCardProps = {
  id: string;
  title: string;
  description: string | null;
  status: string;
  queue_order: number;
  cycle_deadline: string | null;
  revision_count: number;
  created_at: string | null;
};

export default function TaskCard({ task }: { task: TaskCardProps }) {
  const isOverdue = task.cycle_deadline
    ? new Date(task.cycle_deadline) < new Date()
    : false;

  return (
    <div className="flex flex-col gap-2 rounded-lg border bg-card p-3 text-card-foreground shadow-sm hover:shadow-md transition-shadow duration-200">
      <p className="text-sm font-medium leading-snug line-clamp-2">
        {task.title}
      </p>

      {task.description && (
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between pt-1">
        {task.revision_count > 0 && (
          <span className="text-[11px] text-muted-foreground">
            Rev. {task.revision_count}
          </span>
        )}

        {task.cycle_deadline && (
          <span
            className={`text-[11px] ${isOverdue ? "text-destructive" : "text-muted-foreground"}`}
          >
            {isOverdue
              ? "Overdue"
              : `Due ${new Date(task.cycle_deadline).toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "numeric",
                  },
                )}`}
          </span>
        )}
      </div>
    </div>
  );
}
