"use server";

import { redirect } from "next/navigation";
import * as z from "zod";

import { loginSchema, signupSchema } from "@/lib/zod/auth";
import { createClient } from "@/lib/supabase/server";
import { LoginResponse, SignupResponse } from "@/types/auth";

export async function signupAction(
  _: unknown,
  formData: FormData,
): Promise<SignupResponse> {
  const payload = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };
  const validation = signupSchema.safeParse(payload);

  if (!validation.success) {
    return {
      errors: z.flattenError(validation.error).fieldErrors,
      payload,
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: validation.data.email,
    password: validation.data.password,
    options: { data: { name: validation.data.name } },
  });

  if (error) {
    return {
      payload,
    };
  }

  redirect("/login");
}

export async function loginAction(
  _: unknown,
  formData: FormData,
): Promise<LoginResponse> {
  const payload = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const validation = loginSchema.safeParse(payload);

  if (!validation.success) {
    return {
      errors: z.flattenError(validation.error).fieldErrors,
      payload,
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: validation.data.email,
    password: validation.data.password,
  });

  if (error) {
    return {
      payload,
    };
  }

  redirect("/");
}
