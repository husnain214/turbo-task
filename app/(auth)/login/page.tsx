"use client";

import { useActionState } from "react";
import { loginAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

export default function Login() {
  const [data, action, isPending] = useActionState(loginAction, {
    payload: {
      email: "",
      password: "",
    },
    errors: {},
  });

  return (
    <div className="min-h-dvh grid place-items-center px-4 pt-6 pb-12 sm:pb-8 md:pb-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action}>
            <FieldGroup className="flex flex-col gap-6">
              <Field className="grid gap-2">
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="text"
                  placeholder="m@example.com"
                  name="email"
                  aria-invalid={!!data?.errors?.email}
                  defaultValue={data.payload.email}
                />
                {data?.errors?.email && (
                  <FieldError>{data?.errors?.email?.[0]}</FieldError>
                )}
              </Field>
              <Field className="grid gap-2">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  aria-invalid={!!data?.errors?.password}
                  defaultValue={data.payload.password}
                />
                {data?.errors?.password && (
                  <FieldError>{data?.errors?.password?.[0]}</FieldError>
                )}
              </Field>

              <FieldGroup>
                <Field>
                  <Button type="submit" disabled={isPending}>
                    {isPending ? "Loading..." : "Login"}
                  </Button>
                  <FieldDescription className="px-6 text-center">
                    Don't have an account? <Link href="/signup">Sign up</Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
