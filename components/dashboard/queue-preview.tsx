import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

type QueueItem = {
  position: number;
  title: string;
  project: string;
};

const queue: QueueItem[] = [
  { position: 1, title: "Mobile nav component", project: "Website Redesign" },
  { position: 2, title: "Social media kit", project: "Brand Package" },
  { position: 3, title: "Email template design", project: "Marketing" },
  { position: 4, title: "404 page illustration", project: "Website Redesign" },
];

export default function QueuePreview() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
        <CardTitle className="text-sm font-medium">Up next in queue</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1 text-xs text-muted-foreground h-auto p-0"
        >
          Manage <ArrowRight className="h-3 w-3" />
        </Button>
      </CardHeader>

      <CardContent className="px-4 pb-4 flex flex-col gap-0">
        {queue.map((item, i) => (
          <div key={item.position}>
            <div className="flex items-center gap-3 py-3">
              <span className="text-xs text-muted-foreground w-4 text-center shrink-0">
                {item.position}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">{item.title}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {item.project}
                </p>
              </div>
              <Badge variant="secondary" className="text-[10px] shrink-0">
                Queue
              </Badge>
            </div>
            {i < queue.length - 1 && <Separator />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
