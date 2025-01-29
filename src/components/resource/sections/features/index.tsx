import { FeatureCard } from "~/components/global/cards";
import TransitionProvider from "~/components/layout/transitionProvider";

export default function Features() {
  return (
    <TransitionProvider className="mx-auto flex min-h-screen flex-col gap-6 bg-slate-900 px-10 py-44">
      <div className="w-2/3 h-full flex flex-row justify-between items-center px-10 py-8">
        <FeatureCard />
        <FeatureCard />
        <FeatureCard />
      </div>
    </TransitionProvider>
  );
}
