import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useFadeIn } from "~/hooks/useFadeIn/useFadeIn";
import { useRegion } from "~/hooks/useRegion/useRegion";
import {
  type watchProviders,
  type watchProvider,
} from "~/utils/types/tmdb-types";
import { DecoratedTextWithPhoto } from "../../decorated-text";
import { disableScroll, enableScroll } from "~/utils/dom/scroll-lock";

interface WatchProviderProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  watchProviders: watchProviders | null;
}

function WatchProvider({
  isOpen,
  onClose,
  title,
  watchProviders,
}: WatchProviderProps) {
  const [watchProvider, setWatchProvider] = useState<watchProvider | null>(null);
  const ref = useFadeIn<HTMLDivElement>();
  const { countryName, countryCode, loading } = useRegion();

  useEffect(() => {
    if (watchProviders && countryCode) {
      setWatchProvider(
        watchProviders.results[countryCode] ??
          watchProviders.results.US ??
          null,
      );
    }
  }, [watchProviders, countryCode]);

  useEffect(() => {
    if (isOpen) {
      disableScroll();
    } else {
      enableScroll();
    }
  }, [isOpen]);

  const handleClose = () => {
    onClose();
    enableScroll();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-50 flex items-center justify-center opacity-0 transition-opacity duration-700"
    >
      <div
        className="fixed inset-0 bg-black/25 backdrop-blur-sm"
        onClick={handleClose}
      ></div>
      <div className="relative z-50 w-full max-w-2xl">
        <div className="rounded-lg bg-white px-12 py-8 text-slate-900 backdrop-blur-sm">
          <button
            className="group absolute right-2.5 top-2.5 rounded-full p-2 text-white transition-all duration-300 hover:bg-gray-100 hover:text-gray-300 md:right-10 md:top-10"
            onClick={handleClose}
          >
            <div
              className="btn btn-circle btn-sm bg-gray-100 text-slate-900 transition-all duration-300 group-hover:bg-gray-200"
              onClick={handleClose}
            >
              <FaTimes />
            </div>
          </button>
          {loading ? (
            <div className="flex h-full items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-slate-900"></div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div>
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
              </div>
              <div className="flex flex-col gap-2">
                {watchProvider?.flatrate &&
                  watchProvider?.flatrate?.length > 0 && (
                    <>
                      <h2 className="text-lg font-bold">Now Streaming on</h2>
                      {watchProvider?.flatrate?.map((provider) => (
                        <DecoratedTextWithPhoto
                          key={provider.provider_id}
                          title={provider.provider_name}
                          image={provider.logo_path}
                          query={`https://www.google.com/search?q=${provider.provider_name} ${title}`}
                        />
                      ))}
                    </>
                  )}
                {watchProvider?.buy && watchProvider?.buy?.length > 0 && (
                  <>
                    <h2 className="text-lg font-bold">Buy at</h2>
                    {watchProvider?.buy?.map((provider) => (
                      <DecoratedTextWithPhoto
                        key={provider.provider_id}
                        title={provider.provider_name}
                        image={provider.logo_path}
                        query={`https://www.google.com/search?q=${provider.provider_name} ${title}`}
                      />
                    ))}
                  </>
                )}
                {watchProvider?.rent && watchProvider?.rent?.length > 0 && (
                  <>
                    <h2 className="text-lg font-bold">Rent at</h2>
                    {watchProvider?.rent?.map((provider) => (
                      <DecoratedTextWithPhoto
                        key={provider.provider_id}
                        title={provider.provider_name}
                        image={provider.logo_path}
                        query={`https://www.google.com/search?q=${provider.provider_name} ${title}`}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WatchProvider;
