import { GalleryVerticalEnd } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { register } from "@/lib/action"

export function SignupForm({
  className,
  ...props
}) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form action={register}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a href="#" className="flex flex-col items-center gap-2 font-medium">
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Perpus.</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to Perpus.</h1>
            <FieldDescription>
              Already have an account? <Link href='/login'>Sign in</Link>
            </FieldDescription>
          </div>
          <Field>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input id="username" type="text" placeholder="Firmansyah Prakoso" name='username' required />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" type="email" placeholder="m@example.com" required name='email'  />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Password</FieldLabel>
            <Input id="password" type="password" placeholder="Enter your password here..." name='password' required  />
          </Field>
          <Field>
            <Button type="submit" className='bg-[#3660CA]'>Create Account</Button>
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
