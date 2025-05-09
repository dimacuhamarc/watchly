"use client";
import React from "react";
import { UploadButton } from "~/helpers/uploadThing";

export default function SignInPage() {


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadButton
        endpoint="imageUploader"
        appearance={{
          button:
            "ut-ready:bg-green-500 ut-uploading:cursor-not-allowed rounded-r-none bg-red-500 bg-none after:bg-orange-400",
          container: "w-max flex-row rounded-md border-cyan-300 bg-slate-800",
          allowedContent:
            "flex h-8 flex-col items-center justify-center px-2 text-white",
        }}
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}