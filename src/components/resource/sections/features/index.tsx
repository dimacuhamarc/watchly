import { FeatureCard } from "~/components/global/cards";
import TransitionProvider from "~/components/layout/transitionProvider";
import { features } from "~/utils/constants/features";

export default function Features() {
  return (
    <>
      <div className="hidden md:flex">
        <FeatureDesktop />
      </div>
      <div className="flex md:hidden">
        <FeatureMobile />
      </div>
    </>
  );
}

function FeatureDesktop() {
  return (
    <TransitionProvider className="mx-auto flex min-h-screen flex-col gap-6 bg-slate-900 py-44">
      <div className="mx-auto grid auto-rows-auto grid-cols-3 gap-6 px-10 py-8">
        {features.map((feature, index) => {
          const isTall = index === 1 || index === 3 || index === 4;

          return (
            <div
              key={feature.title}
              className={`${isTall ? "row-span-8" : "row-span-1"} h-full`}
            >
              <FeatureCard {...feature} colorClasses={feature.colorClasses} />
            </div>
          );
        })}
      </div>
    </TransitionProvider>
  )
}

function FeatureMobile() {
  return (
    <TransitionProvider className="mx-auto flex min-h-screen flex-col gap-6 bg-slate-900 py-44">
      <div className="mx-auto flex flex-col w-3/4 auto-rows-auto grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const isTall = index === 1 || index === 3 || index === 4;

          return (
            <div
              key={feature.title}
              className={`${isTall ? "row-span-8" : "row-span-1"} h-full`}
            >
              <FeatureCard {...feature} colorClasses={feature.colorClasses} />
            </div>
          );
        })}
      </div>
    </TransitionProvider>
  )
}

