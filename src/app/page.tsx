import Navbar from "~/components/global/navbar";
import Hero from "~/components/resource/sections/hero";
import Footer from "~/components/global/footer";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import Features from "~/components/resource/sections/features";
import MainLayoutProvider from "~/components/layout/mainLayoutProvider";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <MainLayoutProvider>
      <Hero />
      <Features />
    </MainLayoutProvider>
  );
}

