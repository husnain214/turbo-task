"use client";

import {
  ArrowRight,
  CheckCircle,
  MessageSquare,
  RefreshCw,
  Send,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

type ActivityItem = {
  icon: React.ReactNode;
  text: React.ReactNode;
  time: string;
};

const activity: ActivityItem[] = [
  {
    icon: <Send className="h-3.5 w-3.5 text-muted-foreground" />,
    text: (
      <>
        <span className="font-medium">Homepage hero</span> submitted for review
      </>
    ),
    time: "2 hours ago",
  },
  {
    icon: <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />,
    text: (
      <>
        Comment added to <span className="font-medium">Logo variants</span>
      </>
    ),
    time: "5 hours ago",
  },
  {
    icon: <CheckCircle className="h-3.5 w-3.5 text-muted-foreground" />,
    text: (
      <>
        <span className="font-medium">Brand guide v2</span> approved and
        completed
      </>
    ),
    time: "Yesterday",
  },
  {
    icon: <RefreshCw className="h-3.5 w-3.5 text-muted-foreground" />,
    text: (
      <>
        Revision requested on <span className="font-medium">Icon set</span>
      </>
    ),
    time: "2 days ago",
  },
];

export default function ActivityFeed() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
        <CardTitle className="text-sm font-medium">Recent activity</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1 text-xs text-muted-foreground h-auto p-0"
        >
          View all <ArrowRight className="h-3 w-3" />
        </Button>
      </CardHeader>

      <CardContent className="px-4 pb-4 flex flex-col gap-0">
        {activity.map((item, i) => (
          <div key={i}>
            <div className="flex items-start gap-3 py-3">
              <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.text}
                </p>
                <p className="text-[11px] text-muted-foreground/60 mt-0.5">
                  {item.time}
                </p>
              </div>
            </div>
            {i < activity.length - 1 && <Separator />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
