import React from 'react'
import { RectangleChip } from '~/components/global/chips'
import { type keywords } from '~/utils/types/tmdb-types'

type KeywordsSectionProps = {
  keywords: keywords
}

function KeywordsSection({ keywords }: KeywordsSectionProps) {
  const [showAll, setShowAll] = React.useState(false)
  const displayedKeywords = showAll ? keywords.keywords : keywords.keywords.slice(0, 3)
  const handleShowAll = () => {
    setShowAll(!showAll)
  }
  return (
    <div className="flex flex-row flex-wrap justify-start gap-2 self-start">
      {displayedKeywords.map((keyword) => (
        <RectangleChip key={keyword.id} label={keyword.name} />
      ))}
      <RectangleChip label={`${showAll ? 'Hide Tags' : 'Show All'}`} onClick={handleShowAll} className="cursor-pointer" />
    </div>
  )
}

export default KeywordsSection
