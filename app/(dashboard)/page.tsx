import { Bell } from "lucide-react";

import ActiveTaskBanner from "@/components/dashboard/active-task-banner";
import ActivityFeed from "@/components/dashboard/activity-feed";
import EmptyActiveBanner from "@/components/dashboard/empty-active-banner";
import QueuePreview from "@/components/dashboard/queue-preview";
import StatCards from "@/components/dashboard/stats-cards";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const hasActiveTask = true;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("users")
    .select("name, role, client_id")
    .eq("id", user.id)
    .single();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Good morning,{" "}
          <span className="font-medium text-foreground">{profile?.name}</span>—
          here's where things stand.
        </p>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Bell className="h-4 w-4" />
        </Button>
      </div>

      {hasActiveTask ? <ActiveTaskBanner /> : <EmptyActiveBanner />}

      <StatCards />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ActivityFeed />
        <QueuePreview />
      </div>
    </div>
  );
}
