"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { WatchlistRequest } from "~/utils/types/watchlist";

export default function SignInPage() {
  const { register, handleSubmit, watch } = useForm<WatchlistRequest>();
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: WatchlistRequest) => {
    setLoading(true);
    setError(null);
    console.log(data);
   
    try {
      const response = await fetch("/api/watchlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json() as { message: string };
        setError(errorData.message);
      } else {
        // Handle success (e.g., redirect or show a success message)
        console.log("Watchlist created successfully");
      }
    } catch (error) {
      setError("An error occurred while creating the watchlist.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Create a Watchlist</h1>
        <div className="flex flex-col gap-4">
          <label className="text-sm font-medium text-gray-500">
            Enter your watchlist name
          </label>
          <label className="input input-bordered flex items-center gap-2 bg-slate-800">
            <input
              type="text"
              className="grow"
              placeholder="watchlist name"
              {...register("title")}
            />
          </label>

          <label className="text-sm font-medium text-gray-500">
            Description
          </label>
          <label className="input input-bordered flex items-center gap-2 bg-slate-800">
            <input
              type="text"
              className="grow"
              placeholder="Description"
              {...register("description")}
            />
          </label>
          <label className="text-sm font-medium text-gray-500">
            Cover Image
          </label>
          <label className="text-sm font-medium text-gray-500">
            Public Watchlist
          </label>
          <label className="input input-bordered flex items-center gap-2 bg-slate-800">
            <input
              type="checkbox"
              className="grow"
              {...register("public_watchlist")}
            />
            <span className="ml-2">Make this watchlist public</span>
          </label>
          {error && (
            <div className="text-red-500 text-sm mt-2">{error}</div>
          )}

          {loading && (
            <div className="text-blue-500 text-sm mt-2">Loading...</div>
          )}
        </div>
        <button
          type="submit"
          className={`mt-4 rounded bg-blue-500 p-2 text-white ${
            isSubmitEnabled ? "" : "cursor-not-allowed opacity-50"
          }`}
          // disabled={!isSubmitEnabled}
        >
          Create Watchlist
        </button>
      </form>
    </main>
  );
}
