// app/(auth)/register/page.tsx
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Alert } from "@/components/ui/alert";
import { useState } from "react";

// Validation schema
const registerSchema = z.object({
  username: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms",
  }),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { register: Register } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      // Automatically assign role = "user"
      const payload = { ...data, role: "user" as const };
      console.log("Register payload →", payload);

      const response = await Register(payload);

      if (response.success) {
        router.push("/dashboard");
      } else {
        setErrorMessage(response.data || "Registration failed");
      }
    } catch (err) {
      setErrorMessage("Something went wrong, please try again.");
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
          <div className="mb-6 sm:mb-8 pt-6 sm:pt-0">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-center sm:text-left">
              Create account
            </h1>
            <p className="text-muted-foreground text-center sm:text-left mt-2">
              Enter details to get started
            </p>
          </div>

          {errorMessage && (
            <Alert
              variant="destructive"
              className="w-full relative max-w-md mx-auto mb-4 p-4 border border-red-600 bg-neutral-900 rounded text-red-500"
            >
              <p>{errorMessage}</p>
            </Alert>
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 sm:gap-6"
          >
            {/* Full name */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="username" className="text-sm font-medium">
                Full name
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Jane Doe"
                className="h-12 sm:h-10"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

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
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="At least 8 characters"
                className="h-12 sm:h-10"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <input
                id="terms"
                type="checkbox"
                className="mt-1 h-4 w-4"
                {...register("terms")}
              />
              <label htmlFor="terms" className="leading-5">
                By continuing, you agree to the Terms and Privacy Policy.
              </label>
            </div>
            {errors.terms && (
              <p className="text-sm text-red-500 -mt-1">
                {errors.terms.message}
              </p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-12 sm:h-11 mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating account..." : "Sign up"}
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

          {/* Social auth */}
          <div className="flex gap-4 sm:gap-5">
            <Button
              variant="outline"
              className="w-full justify-center h-11 sm:h-10"
            >
              Google
            </Button>
            <Button
              variant="outline"
              className="w-full justify-center h-11 sm:h-10"
            >
              GitHub
            </Button>
          </div>

          <p className="mt-6 sm:mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <a href="/login" className="text-primary hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
