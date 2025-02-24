import React from "react";
import { RectangleChip } from "~/components/global/chips";
import { keywords } from "~/utils/types/tmdb-types";

type KeywordsSectionProps = {
  keywords: keywords;
};

function KeywordsSection({ keywords }: KeywordsSectionProps) {
  return (
    <div className="flex flex-row flex-wrap justify-start gap-2 md:justify-center mt-4">
      {keywords.keywords.map((keyword) => (
        <RectangleChip key={keyword.id} label={keyword.name} />
      ))}
    </div>
  );
}

export default KeywordsSection;
