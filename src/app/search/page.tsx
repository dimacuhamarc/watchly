import MainLayoutProvider from "~/components/layout/mainLayoutProvider";
import SearchPageComponent from "~/components/resource/search";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Watchly | Search",
  description: "Search for your favorite movies and shows",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function SearchPage() {
  return (
    <MainLayoutProvider>
      <div className="mx-auto flex min-h-screen max-w-screen-lg flex-col justify-start items-center gap-4 px-14 py-44 md:px-0">
        <SearchPageComponent />
      </div>
    </MainLayoutProvider>
  );
}
