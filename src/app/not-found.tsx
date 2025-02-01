import MainLayoutProvider from "~/components/layout/mainLayoutProvider";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
export default function NotFound() {
  return (
    <MainLayoutProvider>
      <div className="bg-navy-900 mx-auto flex h-screen w-1/2 flex-col items-center justify-center gap-8 px-4 text-white">
        <h1 className="rounded-2xl bg-primary px-6 py-4 text-6xl font-bold text-white transition-all duration-200 hover:px-8 hover:py-6  hover:rounded-lg md:text-4xl">
          404 | Page Not Found
        </h1>
        <div className="flex flex-col items-center gap-2">
          <p className="text-center text-xl text-gray-300 md:text-2xl">
            The page you are looking for must be{" "}
            <span className="text-blue-500 hover:underline">
              under construction
            </span>
            ,{" "}
            <span className="text-blue-500 hover:underline">
              does not exist
            </span>{" "}
            or{" "}
            <span className="text-blue-500 hover:underline">
              has been removed
            </span>
            .
          </p>
          <p className="text-xl text-gray-300 md:text-lg">
            Don&apos;t worry you can always go back to the home page.
          </p>
          <p className="text-xl text-gray-300 md:text-lg">Love, Watchly</p>
        </div>
        <Link
          href="/"
          className="btn bg-blue-500 text-white transition-colors duration-200 hover:bg-blue-600"
        >
          <IoArrowBack className="h-4 w-4" /> Go back
        </Link>
      </div>
    </MainLayoutProvider>
  );
}
