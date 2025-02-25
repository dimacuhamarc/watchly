import React from "react";
import MainLayoutProvider from "~/components/layout/mainLayoutProvider";
import { TVItemComponent } from "~/components/resource/items";
import { getTvDetails } from "~/utils/api/tmdb";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params;
  const tv = await getTvDetails(id);
  return {
    title: `${tv?.name ?? "Not Found"} | Watchly`,
    description: tv?.overview ?? "Not Found",
  };
}

interface TVItemPageProps {
  params: { id: string };
}

function TVItemPage({ params }: TVItemPageProps) {
  const { id }: { id: string } = React.use(Promise.resolve(params));

  return (
    <MainLayoutProvider>
      <div className="mx-auto flex min-h-screen max-w-screen-lg flex-col items-center justify-start gap-4 px-14 py-44 md:px-0">
        <TVItemComponent id={id} />
      </div>
    </MainLayoutProvider>
  );
}

export default TVItemPage;
