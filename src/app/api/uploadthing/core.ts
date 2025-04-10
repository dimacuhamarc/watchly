/* eslint-disable @typescript-eslint/only-throw-error */
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { eq } from "drizzle-orm";

const f = createUploadthing();

const auth = (req: Request) => {
  const sessionUser = { id: "14642adc-601e-4535-9ffd-0452d9e9c073" }; // Replace with actual user extraction logic
  return sessionUser;
};


export const uploadFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const user = auth(req);

      if (!user) throw new UploadThingError("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // console.log("Upload complete for userId:", metadata.userId);
      await db.update(users).set({
        profile_picture: file.ufsUrl,
      }).where(eq(users.id, metadata.userId));

      // console.log("file url", file.ufsUrl);

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type uploadFileRouter = typeof uploadFileRouter;
