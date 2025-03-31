"use client";

import React, { useEffect, useState } from "react";
import { LuLock, LuLockOpen, LuEye, LuEyeOff, LuUser } from "react-icons/lu";
import { useForm } from "react-hook-form";
import type { SignInFormType } from "~/utils/types/types";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, watch } = useForm<SignInFormType>();
  const router = useRouter();

  useEffect(() => {
    const subscription = watch((value) => {
      const username = value.username;
      const password = value.password;
      setIsSubmitDisabled(!username || !password);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data: SignInFormType) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
      });
      
      if (result?.error) {
        setError("Invalid username or password");
        setIsLoading(false);
      } else if (result?.ok) {
        // Redirect to dashboard or home page after successful login
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred. Please try again.");
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
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="text-sm font-medium text-gray-500">Username</label>
          <label className="input input-bordered flex items-center gap-2 bg-slate-800">
            <LuUser className="h-4 w-4 opacity-70" />
            <input
              type="text"
              className="grow"
              placeholder="i.e. rhoadey"
              autoComplete="off"
              autoFocus
              {...register("username")}
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
