"use server";

import { redirect } from "next/navigation";
import * as z from "zod";

import { projectSchema } from "@/lib/zod/projects";
import { createClient } from "@/lib/supabase/server";
import { ProjectResponse } from "@/types/projects";
import { getProfile } from "@/lib/utils";

export async function createProjectAction(
  _: unknown,
  formData: FormData,
): Promise<ProjectResponse> {
  const payload = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
  };
  const validation = projectSchema.safeParse(payload);

  if (!validation.success) {
    return {
      errors: z.flattenError(validation.error).fieldErrors,
      payload,
    };
  }

  const supabase = await createClient();
  const profile = await getProfile(supabase);

  if (!profile) redirect("/login");

  const { error } = await supabase
    .from("projects")
    .insert({ ...payload, client_id: profile.client_id });

  if (error) {
    return {
      payload,
    };
  }

  redirect("/projects");
}

export async function getProject(projectId: string, clientId: string) {
  const supabase = await createClient();

  const { data: project, error } = await supabase
    .from("projects")
    .select(
      `
      *,
      tasks (
        id,
        title,
        description,
        status,
        queue_order,
        cycle_deadline,
        revision_count,
        created_at
      )
    `,
    )
    .eq("id", projectId)
    .eq("client_id", clientId)
    .single();

  if (error || !project) return null;

  return project;
}
