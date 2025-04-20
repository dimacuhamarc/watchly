import Link from "next/link";
import TransitionProvider from "~/components/layout/transitionProvider";
import { IoRocket } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
const copy = {
  title: "Your Next Watch, Just One Search Away!",
  description: "Stop the endless scrolling. Find, track, and discover movies & shows effortlessly.",
  button: "Get Started",
}

export default function CTA() {
  return (
    <TransitionProvider className="mx-auto flex h-1/2 flex-col gap-6 py-24 bg-gradient-to-br from-transparent via-slate-800 to-transparent text-slate-50">
      <div className="mx-auto flex flex-col justify-center items-center gap-6">
        <div className="flex flex-col items-center gap-2 md:text-left text-center">
          <h1 className="text-2xl font-bold">{copy.title}</h1>
          <p className="text-lg">{copy.description}</p>
        </div>
        <div className="flex flex-row items-center gap-4">
          <Link className="btn btn-primary" href="/onboarding?type=signup">
            <IoRocket className="h-4 w-4" /> Get Started
          </Link>
          <Link
            className="btn btn-secondary flex flex-row items-center gap-2"
            href="https://github.com/dimacuhamarc/watchly"
            target="_blank"
          >
            <FaGithub className="h-4 w-4" /> Star on GitHub
          </Link>
        </div>
      </div>
    </TransitionProvider>
  );
}
