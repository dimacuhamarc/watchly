import React, { useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { useFadeIn } from "~/hooks/useFadeIn/useFadeIn";
import { useRegion } from "~/hooks/useRegion/useRegion";

interface WatchProviderProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

function WatchProvider({ isOpen, onClose, title }: WatchProviderProps) {
  if (!isOpen) return null;

  const ref = useFadeIn<HTMLDivElement>();

  const { countryName, countryCode, loading, error } = useRegion();
  
  return (
    <div
      ref={ref}
      className="fixed inset-0 z-50 flex items-center justify-center opacity-0 transition-opacity duration-700"
    >
      <div
        className="fixed inset-0 bg-black/25 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative z-50 w-full max-w-3xl">
        <div className="rounded-lg bg-white px-12 py-8 text-slate-900 backdrop-blur-sm">
          {loading ? (
            <div className="flex h-full items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-slate-900"></div>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold">
                Where to watch <span className="text-primary">{title}</span>
              </h1>
              {countryName && countryCode && (
                <p className="">
                  Your current region is{" "}
                  <span className="font-bold">{countryName}</span> (
                  {countryCode})
                </p>
              )}
            </>
          )}
        </div>
        <button
          className="absolute -top-10 right-0 text-white hover:text-gray-300"
          onClick={onClose}
        >
          <div className="btn btn-circle btn-sm" onClick={onClose}>
            <FaTimes />
          </div>
        </button>
      </div>
    </div>
  );
}

export default WatchProvider;
