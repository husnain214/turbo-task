import { ArrowRight, Clock } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

export default function ActiveTaskBanner() {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-4">
        {/* green status dot */}
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0" />

        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-0.5">
            Active task
          </p>
          <p className="text-sm font-medium truncate">Homepage hero redesign</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Website Redesign &nbsp;·&nbsp; Cycle 1 of 1
          </p>
        </div>

        <Badge
          variant="outline"
          className="gap-1 text-amber-600 border-amber-300 bg-amber-50 shrink-0"
        >
          <Clock className="h-3 w-3" />1 day left
        </Badge>

        <Button variant="outline" size="sm" className="gap-1.5 shrink-0">
          View <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </CardContent>
    </Card>
  );
}
