"use client";

import Link from "next/link";

import { FaGithub } from "react-icons/fa";
import TransitionProvider from "~/components/layout/transitionProvider";
import { useTextRotation } from "~/hooks/useTextRotation";

export default function Hero() {
  const rotatingWords = ["Faster", "Accurately", "With Watchly"];
  const { currentWord, isVisible } = useTextRotation({ words: rotatingWords });

  return (
    <TransitionProvider className="mx-auto flex min-h-screen max-w-screen-lg flex-col items-start justify-center gap-6 px-10 py-44">
      <h1 className="text-7xl font-bold">
        Find Your Next Watch,{" "}
        <span
          className={`text-blue-500 transition-opacity duration-700 ease-in-out ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {currentWord}
        </span>
        .
      </h1>

      <p className="w-2/3 text-lg">
        Say goodbye to endless searches and wrong results. With Watchly,
        instantly discover where to stream, buy, or rent your favorite movies
        and shows—all tailored to your region.
      </p>

      <div className="flex flex-row items-center gap-4">
        <Link className="btn btn-primary" href="/signup">
          Waitlist Now!
        </Link>
        <Link
          className="btn btn-secondary flex flex-row items-center gap-2"
          href="https://github.com/dimacuhamarc/watchly"
          target="_blank"
        >
          <FaGithub className="h-4 w-4" /> Star on GitHub
        </Link>
      </div>
    </TransitionProvider>
  );
}
