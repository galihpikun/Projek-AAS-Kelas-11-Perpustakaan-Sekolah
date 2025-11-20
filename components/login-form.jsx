"use client";

import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";

export function LoginForm({ className, ...props }) {
  async function handleLogin(formData) {
    const response = await signIn("credentials", {
      redirect: false,
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!response.ok) {
      alert("gagal login");
      return null;
    }

    alert("Success!");
    const session = await fetch("/api/auth/session").then((r) => r.json());

    if (session?.user?.role === "petugas") {
      redirect("/admin/dashboard");
    } else {
      redirect("/siswa/home");
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form action={handleLogin}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium">
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Perpus.</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to Perpus.</h1>
            <FieldDescription>
              Don&apos;t have an account? <Link href="/signup">Sign Up</Link>
            </FieldDescription>
          </div>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              name="email"
              required

            />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password here..."
              name="password"
              required
            />
          </Field>
          <Field>
            <Button type="submit" className="bg-[#3660CA]">
              Login
            </Button>
          </Field>
        </FieldGroup>
      </form>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
