import React from "react";
import { cast } from "~/utils/types/tmdb-types";
import Image from "next/image";

function PersonCard({ person }: { person: cast }) {
  return (
    <div className="h-48 w-32 rounded-lg overflow-hidden flex-shrink-0 relative cursor-pointer hover:opacity-80 transition-opacity duration-300" onClick={() => {
      window.open(`https://www.google.com/search?q=${person.name}`, "_blank");
    }}>
      {person.profile_path !== null ? (
        <Image
          src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
          alt={person.name}
          fill
          className="object-cover"
          sizes="(max-width: 128px) 100vw, 128px"
        />
      ) : (
        <div className="h-full w-full bg-slate-900 flex items-center justify-center">
          <p className="text-sm text-gray-100">No Image</p>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 bg-slate-900/70 text-white p-2">
        <h3 className="text-sm font-bold truncate">{person.name}</h3>
        <p className="text-xs truncate">{person.character}</p>
      </div>
    </div>
  );
}

export default PersonCard;
