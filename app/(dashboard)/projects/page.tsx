import ProjectCard from "@/components/projects/project-card";
import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const supabase = await createClient();

  const profile = await getProfile(supabase);

  if (!profile) redirect("/login");

  const { data: projects } = await supabase
    .from("projects")
    .select(
      `
        *,
        tasks(id, status)
      `,
    )
    .eq("client_id", profile.client_id);

  return (
    <div>
      <div className="flex flex-start flex-wrap gap-4">
        {projects?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
