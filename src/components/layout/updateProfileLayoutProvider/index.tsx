import React from 'react'

interface UpdateProfileLayoutProviderProps {
  sectionTitle: string;
  sectionDescription: string;
  children: React.ReactNode;
}

function UpdateProfileLayoutProvider({
  sectionTitle,
  sectionDescription,
  children,
}: UpdateProfileLayoutProviderProps) {
  return (
    <>
      <div className="flex flex-col gap-2 md:w-1/3 w-full">
        <h1 className="text-nowrap text-xl">{sectionTitle}</h1>
        <p className="text-sm text-slate-400" dangerouslySetInnerHTML={{ __html: sectionDescription }}/>
      </div>
      <div className="flex flex-row gap-8 md:w-2/3 w-full">
        {children}
      </div>
    </>
  )
}

export default UpdateProfileLayoutProvider