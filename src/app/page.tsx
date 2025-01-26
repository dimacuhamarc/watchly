import Navbar from "~/components/global/navbar";
import Hero from "~/components/resource/sections/hero";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-700 to-slate-950 text-white">
      <Navbar />
      <Hero />
    </main>
  );
}
