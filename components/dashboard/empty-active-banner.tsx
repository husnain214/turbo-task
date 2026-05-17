import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

export default function EmptyActiveBanner() {
  return (
    <Card className="border-dashed">
      <CardContent className="flex items-center justify-between p-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            No active task
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Pick a task from your queue to get started
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5">
          Go to queue <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </CardContent>
    </Card>
  );
}
