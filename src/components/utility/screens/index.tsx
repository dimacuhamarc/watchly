import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { LuIdCard, LuTriangleAlert } from "react-icons/lu";

interface CommonScreenProps {
  loadingMessage?: string;
  message?: string;
  details?: string;
  errorMessage?: string;
  errorDetails?: string;
  redirectLink?: {
    href: string;
    label: string;
  }
  leftIcon?: boolean;
  rightIcon?: boolean;
}


const LoadingScreen = ({ loadingMessage }: CommonScreenProps) => {
  return (
    <div className="mx-auto my-auto flex flex-col items-center justify-center gap-4 md:h-full md:w-full h-screen w-screen">
      <span className="loading loading-infinity loading-lg"></span>
      <h1>{loadingMessage}</h1>
    </div>
  );
}

const UnauthorizedAccess = ({ errorMessage, errorDetails, redirectLink, leftIcon, rightIcon }: CommonScreenProps) => {
  return (
    <div className="mx-auto my-auto flex flex-col items-center justify-center gap-4 text-error md:h-full md:w-full h-screen w-screen">
      <LuTriangleAlert className="text-6xl" />
      <span className="font-bold">{errorMessage}</span>
      <p>{errorDetails}</p>
      <Link href={redirectLink?.href ?? `/`} className="btn btn-outline btn-error">
        {leftIcon && <FaArrowLeft />}
        {redirectLink?.label}
        {rightIcon && <FaArrowRight />}
      </Link>
    </div>
  );
}

const InformationScreen = ({ message, details, redirectLink, leftIcon, rightIcon }: CommonScreenProps) => {
  return (
    <div className="mx-auto my-auto flex flex-col items-center justify-center gap-4 md:h-full md:w-full h-screen w-screen text-slate-100">
      <LuIdCard className="text-6xl" />
      <span className="font-bold">{message}</span>
      <p>{details}</p>
      <Link href={redirectLink?.href ?? `/`} className="btn hover:btn-outline btn-slate-100">
        {leftIcon && <FaArrowLeft />}
        {redirectLink?.label}
        {rightIcon && <FaArrowRight />}
      </Link>
    </div>
  );
}

export { LoadingScreen, UnauthorizedAccess, InformationScreen };