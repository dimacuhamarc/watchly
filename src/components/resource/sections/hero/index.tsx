"use client";

import Link from 'next/link';

import { FaGithub } from 'react-icons/fa';
import { useTextRotation } from '~/hooks/useTextRotation';

export default function Hero() {
  const rotatingWords = ["Faster", "Accurately", "With Watchly"];
  const { currentWord, isVisible } = useTextRotation({ words: rotatingWords });

  return (
    <div className="flex flex-col items-start justify-center max-w-screen-lg mx-auto px-10 py-44 gap-6">

      <h1 className="text-7xl font-bold">
        Find Your Next Watch,{" "}
        <span 
          className={`text-blue-500 transition-opacity ease-in-out duration-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {currentWord}
        </span>
        .
      </h1>

      <p className="text-lg w-2/3">
        Say goodbye to endless searches and wrong results. With Watchly, instantly discover where to stream, buy, or rent your favorite movies and shows—all tailored to your region.
      </p>

      <div className="flex flex-row items-center gap-4">
        <Link className="btn-primary btn" href="/signup">
          Waitlist Now!
        </Link>
        <Link className="btn-secondary btn flex flex-row items-center gap-2" href="https://github.com/dimacuhamarc/watchly" target="_blank">
          <FaGithub className="w-4 h-4" /> Star on GitHub
        </Link>
      </div>
    </div>
  );
}