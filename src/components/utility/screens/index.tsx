import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { LuTriangleAlert } from "react-icons/lu";

interface CommonScreenProps {
  loadingMessage?: string;
  errorMessage?: string;
  errorDetails?: string;
  redirectLink?: {
    href: string;
    label: string;
  }
}


const LoadingScreen = ({ loadingMessage }: CommonScreenProps) => {
  return (
    <div className="mx-auto my-auto flex flex-col items-center justify-center gap-4 h-screen w-screen">
      <span className="loading loading-infinity loading-lg"></span>
      <h1>{loadingMessage}</h1>
    </div>
  );
}

const UnauthorizedAccess = ({ errorMessage, errorDetails, redirectLink }: CommonScreenProps) => {
  return (
    <div className="mx-auto my-auto flex flex-col items-center justify-center gap-4 text-error h-screen w-scree">
      <LuTriangleAlert className="text-6xl" />
      <span className="font-bold">{errorMessage}</span>
      <p>{errorDetails}</p>
      <Link href={redirectLink?.href ?? `/`} className="btn btn-outline btn-error">
        <FaArrowLeft />{redirectLink?.label}
      </Link>
    </div>
  );
}

export { LoadingScreen, UnauthorizedAccess };