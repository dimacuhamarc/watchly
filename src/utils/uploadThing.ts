import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

import type { uploadFileRouter } from "~/app/api/uploadthing/core";

export const UploadButton = generateUploadButton<uploadFileRouter>();
export const UploadDropzone = generateUploadDropzone<uploadFileRouter>();
