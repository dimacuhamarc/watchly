import React from "react";

export interface FavoritesContentProps {
  favorites: string[];
}

function FavoritesContent({ favorites }: FavoritesContentProps) {
  return (
    <>
      <h1 className="text-2xl font-semibold leading-none">Favorites</h1>
      <p className="text-md">{"No favorites available"}</p>
    </>
  );
}

export default FavoritesContent;
