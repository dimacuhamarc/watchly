import React, { useEffect, useRef, useState } from "react";
import PersonCard from "~/components/global/cards/person";
import { movieCredits } from "~/utils/types/tmdb-types";

function CastSection({ credits }: { credits: movieCredits }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isHovered && scrollContainerRef.current) {
      scrollContainerRef.current.style.scrollBehavior = "smooth";
    }
  }, [isHovered]);

  return (
    <div className="flex flex-col gap-4 w-full" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <h1 className="text-2xl font-bold">Cast</h1>
      <div className="flex flex-row gap-2 w-full overflow-x-scroll scrollbar-hide" ref={scrollContainerRef}>
        {credits.cast.map((cast) => (
          <PersonCard key={cast.id} person={cast} />
        ))}
      </div>
    </div>
  );
}

export default CastSection;
