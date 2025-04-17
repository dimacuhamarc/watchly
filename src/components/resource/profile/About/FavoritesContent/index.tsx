import React from "react";

export interface FavoritesContentProps {
  favorites: string[];
}

function FavoritesContent({ favorites }: FavoritesContentProps) {
  return (
    <>
      <p className="text-md">{"No favorites available"}</p>
    </>
  );
}

export default FavoritesContent;
