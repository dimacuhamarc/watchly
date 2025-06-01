/** @format */

import React from 'react'
import { useForm } from 'react-hook-form'
import { WatchlistItemStatus, type WatchlistItemForm } from '~/utils/types/data'
import type { MediaType } from '~/utils/types/data'

interface Step2DetailsProps {
  tmdbId?: string
  setFormData: (data: Partial<WatchlistItemForm>) => void
  type: MediaType
}

function Step2Details({ tmdbId, setFormData, type }: Step2DetailsProps) {
  const { register } = useForm<WatchlistItemForm>({
    defaultValues: {
      itemId: tmdbId ?? '',
      mediaType: type,
      status: 'WANT_TO_WATCH',
      notes: '',
    },
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData({ [name]: value })
  }

  return (
    <div>
      <form>
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium">Status</label>
          <select
            className="select select-bordered w-full"
            {...register('status')}
            onChange={handleChange}
          >
            {Object.keys(WatchlistItemStatus)
              .filter((key) => isNaN(Number(key))) // Filter out numeric keys
              .map((type) => (
                <option key={type} value={type}>
                  {type
                    .replace(/_/g, ' ')
                    .toLowerCase()
                    .replace(/^\w/, (char) => char.toUpperCase())}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium">Notes</label>
          <textarea
            className="textarea textarea-bordered w-full"
            {...register('notes')}
            onChange={handleChange}
            placeholder="Add any notes about this item..."
            rows={3}
          />
        </div>
      </form>
    </div>
  )
}

export default Step2Details
