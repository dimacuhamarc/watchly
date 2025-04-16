/* eslint-disable @typescript-eslint/only-throw-error */
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { cookies } from "next/headers";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { verifyJwt } from "~/helpers/jwt";

const f = createUploadthing();

const auth = async (req: Request) => {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('next-auth.session-token') ?? cookieStore.get('__Secure-next-auth.session-token');

  if (!authCookie) {
    throw new UploadThingError("No authentication cookie found");
  }

  const userData = await verifyJwt(authCookie.value);

  if (!userData) {
    throw new UploadThingError("Invalid authentication token");
  }

  return { id: userData.id };
};

export const uploadFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db.update(users).set({
        profile_picture: file.ufsUrl,
      }).where(eq(users.id, metadata.userId));
      
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type uploadFileRouter = typeof uploadFileRouter;
