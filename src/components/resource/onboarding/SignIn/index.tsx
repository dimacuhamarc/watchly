"use client";

import React, { useEffect, useState } from "react";
import { LuLock, LuLockOpen, LuEye, LuEyeOff, LuMail } from "react-icons/lu";
import { useForm } from "react-hook-form";
import type { SignInFormType } from "~/utils/types/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import type { LoginResponse } from "~/utils/types/auth";
import { useAuthStore } from "~/store/authStore";

interface SignInProps {
  registrationSuccess?: boolean;
}

function SignIn({ registrationSuccess }: SignInProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(
    registrationSuccess ? "Account created successfully! Please sign in." : null
  );
  const { register, handleSubmit, watch } = useForm<SignInFormType>();
  const router = useRouter();
  const { data: session } = useSession();
  const { fetchAuthState, fetchProfileData, ownProfileData } = useAuthStore();

  useEffect(() => {
    if (session) {
      router.replace("/");
    }
  }, [session, router]);

  useEffect(() => {
    const subscription = watch((value) => {
      const email = value.email;
      const password = value.password;
      setIsSubmitDisabled(!email || !password);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data: SignInFormType) => {
    setIsLoading(true);
    setError("");
    setSuccessMessage("");
    
    try {
      // Direct API call instead of going through NextAuth signIn
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        })
      });

      const result = await res.json() as LoginResponse;
      
      if (!res.ok) {
        setError(result.error ?? "Authentication failed");
        console.error("Sign-in error:", result.error);
      } else {
        console.log("Sign-in successful");
        setSuccessMessage("Login successful! Redirecting...");
        
        if (!localStorage.getItem("auth-storage")) {
          await fetchAuthState();
          if (result.user?.name) {
            await fetchProfileData(result.user.name);
            console.log(ownProfileData)
          }
        }

        window.location.href = `/p/${result.user?.name}`;
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col justify-center gap-4 rounded-lg bg-white px-10 py-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-center text-2xl font-bold text-slate-800">
          Sign In
        </h1>
        <p className="text-center text-gray-500">
          Sign in to your account to continue
        </p>
        {error && (
          <p className="text-center text-sm text-red-500">{error}</p>
        )}
        {successMessage && (
          <p className="text-center text-sm text-green-500">{successMessage}</p>
        )}
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="text-sm font-medium text-gray-500">Email</label>
          <label className="input input-bordered flex items-center gap-2 bg-slate-800">
            <LuMail className="h-4 w-4 opacity-70" />
            <input
              type="email"
              className="grow"
              placeholder="your.email@example.com"
              autoFocus
              {...register("email")}
            />
          </label>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Password</label>
          <label className="input input-bordered flex items-center gap-2 bg-slate-800">
            <label className="swap swap-rotate cursor-default">
              <input
                type="checkbox"
                disabled={true}
                checked={showPassword}
                onChange={handleShowPassword}
              />
              <LuLock className="swap-off h-4 w-4 opacity-70" />
              <LuLockOpen className="swap-on h-4 w-4 opacity-70" />
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="i.e. warmachineRox"
              className="grow"
              autoComplete="off"
              {...register("password")}
            />
            <label className="swap swap-rotate">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={handleShowPassword}
              />
              <LuEye className="swap-on h-4 w-4 opacity-70" />
              <LuEyeOff className="swap-off h-4 w-4 opacity-70" />
            </label>
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-primary disabled:cursor-not-allowed disabled:text-gray-400"
          disabled={isSubmitDisabled || isLoading}
        >
          {isLoading ? "Signing in..." : "Continue"}
        </button>
        <div className="flex flex-row justify-between">
          <Link
            className="text-sm font-medium text-gray-500 transition-all duration-300 ease-in-out hover:text-gray-700"
            href="/onboarding?type=forgot-password"
          >
            Forgot Password?
          </Link>
          <Link
            className="text-sm font-medium text-gray-500 transition-all duration-300 ease-in-out hover:text-gray-700"
            href="/onboarding?type=signup"
          >
            Don&apos;t have an account? Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
