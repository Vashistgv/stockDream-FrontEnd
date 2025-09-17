// app/(auth)/login/page.tsx
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import { authService } from "@/lib/auth";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Alert } from "@/components/ui/alert";
import { useState } from "react";
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [loginError, setLoginError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { login } = useAuth();

  const onSubmit = async (data: LoginFormData) => {
    setLoginError(null);
    const response = await login(data);
    if (response.success) {
      router.push("/dashboard");
    } else {
      setLoginError(response.data || "Login failed");
    }
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 px-4 lg:px-0 pb-[env(safe-area-inset-bottom)]">
      {/* Left image */}
      <div className="relative hidden lg:block">
        <Image
          src="/virtual-trading.jpg"
          alt="Cover"
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Right form */}
      <div className="flex items-center justify-center py-8 sm:py-12">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md px-4 sm:px-6 mx-auto">
          {/* Heading */}
          <div className="mb-8 sm:mb-12 pt-6 sm:pt-0">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-center sm:text-left">
              Welcome back
            </h1>
            <p className="text-muted-foreground text-center sm:text-left mt-2">
              Please sign in to your account
            </p>
          </div>
          {loginError && (
            <Alert
              variant="destructive"
              className="w-full relative max-w-md mx-auto mb-4 p-4 border border-red-600 bg-neutral-900 rounded text-red-500"
            >
              <p>{loginError}</p>
            </Alert>
          )}
          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 sm:gap-6"
          >
            {/* Email */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="h-12 sm:h-10"
                {...register("email")}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <a
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                className="h-12 sm:h-10"
                {...register("password")}
                aria-invalid={!!errors.password}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full h-12 sm:h-11 mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8 sm:my-10">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-3 text-muted-foreground">
                or continue with
              </span>
            </div>
          </div>

          {/* Signup link */}
          <p className="mt-6 sm:mt-8 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <a href="/register" className="text-primary hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
