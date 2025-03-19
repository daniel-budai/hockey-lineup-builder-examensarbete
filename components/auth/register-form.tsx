"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterInput } from "@/schemas/auth.schema";

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: RegisterInput) {
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Registration error details:", errorData);

        if (errorData.issues && errorData.issues.length > 0) {
          console.error(
            "Validation issues:",
            JSON.stringify(errorData.issues, null, 2)
          );
          const firstIssue = errorData.issues[0];
          toast.error(
            `Validation error: ${firstIssue.path.join(".")} - ${
              firstIssue.message
            }`
          );
        }

        throw new Error(errorData.error || "Failed to register");
      }

      toast.success("Account created successfully. Please sign in.");
      router.push("/login");
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-slate-300">
          Name
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
          className={`rounded-lg bg-[#0f172a]/80 border-[#334155] focus-visible:ring-[#64748b] text-white placeholder:text-slate-500 ${
            errors.name ? "border-red-500" : ""
          }`}
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-slate-300">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          className={`rounded-lg bg-[#0f172a]/80 border-[#334155] focus-visible:ring-[#64748b] text-white placeholder:text-slate-500 ${
            errors.email ? "border-red-500" : ""
          }`}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-slate-300">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          className={`rounded-lg bg-[#0f172a]/80 border-[#334155] focus-visible:ring-[#64748b] text-white placeholder:text-slate-500 ${
            errors.password ? "border-red-500" : ""
          }`}
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-slate-300">
          Confirm Password
        </Label>
        <Input
          id="confirmPassword"
          type="password"
          className={`rounded-lg bg-[#0f172a]/80 border-[#334155] focus-visible:ring-[#64748b] text-white placeholder:text-slate-500 ${
            errors.confirmPassword ? "border-red-500" : ""
          }`}
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <Button
        type="submit"
        className="w-full bg-white hover:bg-slate-100 text-[#0f172a] shadow-md hover:shadow-lg transition-all rounded-lg"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating account...
          </>
        ) : (
          "Create account"
        )}
      </Button>
    </form>
  );
}
