import Features from "~/components/resource/sections/features";
import MainLayoutProvider from "~/components/layout/mainLayoutProvider";
import CTA from "~/components/resource/sections/cta";
import Hero from "~/components/resource/sections/hero";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <MainLayoutProvider>
      <Hero />
      <Features />
      <CTA />
    </MainLayoutProvider>
  );
}

