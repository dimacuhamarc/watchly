"use client";

import React, { useEffect, useState } from "react";
import {
  LuLock,
  LuLockOpen,
  LuEye,
  LuEyeOff,
  LuUser,
  LuMail,
} from "react-icons/lu";
import { useForm } from "react-hook-form";
import type { SignUpFormType } from "~/utils/types/types";
import Link from "next/link";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const { register, handleSubmit, watch } = useForm<SignUpFormType>();  

  useEffect(() => {
    setIsSubmitDisabled(!watch("username") || !watch("email") || !watch("password") || !watch("confirmPassword"));
  }, [watch("username"), watch("email"), watch("password"), watch("confirmPassword")]);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = (data: SignUpFormType) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col justify-center gap-4 rounded-lg bg-white px-10 py-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-center text-2xl font-bold text-slate-800">
          Sign Up
        </h1>
        <p className="text-center text-gray-500">
          Create an account to continue
        </p>
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
              {...register("username")}
            />
          </label>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Email</label>
          <label className="input input-bordered flex items-center gap-2 bg-slate-800">
            <LuMail className="h-4 w-4 opacity-70" />
            <input
              type="text"
              className="grow"
              placeholder="i.e. rhoadey@gmail.com"
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
        <div>
          <label className="text-sm font-medium text-gray-500">
            Confirm Password
          </label>
          <label className="input input-bordered flex items-center gap-2 bg-slate-800">
            <label className="swap swap-rotate cursor-default">
              <input
                type="checkbox"
                disabled={true}
                checked={showConfirmPassword}
                onChange={handleShowConfirmPassword}
              />
              <LuLock className="swap-off h-4 w-4 opacity-70" />
              <LuLockOpen className="swap-on h-4 w-4 opacity-70" />
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="i.e. warmachineRox"
              className="grow"
              {...register("confirmPassword")}
            />
            <label className="swap swap-rotate">
              <input
                type="checkbox"
                checked={showConfirmPassword}
                onChange={handleShowConfirmPassword}
              />
              <LuEye className="swap-on h-4 w-4 opacity-70" />
              <LuEyeOff className="swap-off h-4 w-4 opacity-70" />
            </label>
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-primary disabled:cursor-not-allowed disabled:text-gray-400"
          disabled={isSubmitDisabled}
        >
          Continue
        </button>
        <p className="text-sm font-medium text-gray-500">
          By proceeding, you agree to our{" "}
          <Link href="/terms" className="link-hover link text-primary">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="link-hover link text-primary">
            Privacy Policy
          </Link>
        </p>
        <div className="flex flex-row justify-center">
          <Link
            className="text-sm font-medium text-gray-500 transition-all duration-300 ease-in-out hover:text-gray-700"
            href="/onboarding?type=signin"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
