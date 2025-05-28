/** @format */

import React from 'react'
import Link from 'next/link'

interface Step3ConfirmProps {
  errors: string
  title: string
  onCloseModal: () => void
}

function Step3Confirm({ title, errors, onCloseModal }: Step3ConfirmProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-2">
      <h2 className="flex text-lg font-bold">
        {errors
          ? 'Error adding item to watchlist'
          : `${title} added successfully!`}
      </h2>
      {errors && <p>{errors}</p>}
      <div className='flex flex-row items-center justify-center gap-4'>
        <Link className="btn btn-primary" href="/lists" onClick={onCloseModal}>
          Go to Watchlists
        </Link>
        <Link className="btn btn-outline" href="/search" onClick={onCloseModal}>
          Continue browsing
        </Link>
      </div>
    </div>
  )
}

export default Step3Confirm
