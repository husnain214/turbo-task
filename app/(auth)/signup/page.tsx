"use client";

import { useActionState } from "react";
import { signupAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Signup() {
  const [data, action, isPending] = useActionState(signupAction, {
    payload: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    errors: {},
  });

  return (
    <div className="min-h-dvh grid place-items-center px-4 pt-6 pb-12 sm:pb-8 md:pb-6">
      <Card className="max-w-sm w-full">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  aria-invalid={!!data?.errors?.name}
                />
                {data?.errors?.name && (
                  <FieldError>{data?.errors?.name?.[0]}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="m@example.com"
                  aria-invalid={!!data?.errors?.email}
                />

                <FieldDescription>
                  We&apos;ll use this to contact you. We will not share your
                  email with anyone else.
                </FieldDescription>
                {data?.errors?.email && (
                  <FieldError>{data?.errors?.email?.[0]}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  aria-invalid={!!data?.errors?.password}
                />
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
                {data?.errors?.password && (
                  <FieldError>{data?.errors?.password?.[0]}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="confirmPassword">
                  Confirm Password
                </FieldLabel>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  aria-invalid={!!data?.errors?.confirmPassword}
                />
                <FieldDescription>
                  Please confirm your password.
                </FieldDescription>
                {data?.errors?.confirmPassword && (
                  <FieldError>{data?.errors?.confirmPassword?.[0]}</FieldError>
                )}
              </Field>
              <FieldGroup>
                <Field>
                  <Button type="submit" disabled={isPending}>
                    {isPending ? "Loading..." : "Create Account"}
                  </Button>
                  <FieldDescription className="px-6 text-center">
                    Already have an account? <Link href="/login">Sign in</Link>
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
