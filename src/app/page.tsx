import { db } from "~/server/db";
import { users } from "~/server/db/schema";

export const dynamic = "force-dynamic";

export default async function HomePage() {

  const userlist = await db.select().from(users);

  console.log(userlist);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-emerald-500 to-emerald-800 text-white">
      <h1>Watchly</h1>
      <pre>{JSON.stringify(userlist, null, 2)}</pre>
    </main>
  );
}
