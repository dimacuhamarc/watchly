/** @format */

import React, { useState } from 'react'

import { Step1Selection, Step2Details, Step3Confirm } from './steps'
import type {
  MediaType,
  SanitizedWatchlistItemRequest,
  WatchlistItemForm,
} from '~/utils/types/data'

interface AddToWatchlistModalProps {
  tmdbId: string
  title: string
  type: MediaType
}

function AddToWatchlistModal({ tmdbId, title, type }: AddToWatchlistModalProps) {
  const [step, setStep] = useState(1)
  const [watchlistId, setWatchlistId] = useState<string | null>(null)
  const [formData, setFormData] = useState<WatchlistItemForm>({
    itemId: tmdbId ?? '',
    mediaType: type,
    status: 'WANT_TO_WATCH',
    notes: '',
  })
  const [error, setError] = useState<string | null>(null)
  const modal = document.getElementById('add_to_watchlist') as HTMLDialogElement

  const onStepChange = async (newStep: number) => {
  if (newStep < 1 || newStep > 3) {
    return
  }
  if (step === 2) {
    const success = await addToWatchlist()
    if (!success) {
      setStep(3)
      return
    }
  }
  if (step === 3) {
    onCloseModal()
  }
  setStep(newStep)
}

  const onCloseModal = () => {
    modal?.close()
    setStep(1)
    setFormData({
      itemId: tmdbId ?? '',
      mediaType: type,
      status: 'WANT_TO_WATCH',
      notes: '',
    })
    setWatchlistId(null)
  }

  const updateFormData = (data: Partial<WatchlistItemForm>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

const addToWatchlist = async () => {
  try {
    if (
      !watchlistId ||
      !formData.itemId ||
      !formData.mediaType ||
      !formData.status
    ) {
      console.error('Missing required data for watchlist item')
      return
    }

    const response = await fetch(`/api/watchlist/${watchlistId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        itemId: formData.itemId,
        mediaType: formData.mediaType,
        status: formData.status,
        notes: formData.notes,
      }),
      credentials: 'include',
    })

    const result = await response.json() as SanitizedWatchlistItemRequest
    
    if (!response.ok) {
      setError(result.message || 'Failed to add item to watchlist')
      if (response.status === 409) {
        setError('This item already exists in your watchlist')
      }
      return false
    }
    
    console.log('Successfully added item to watchlist:', result)
    return true
  } catch (error) {
    setError(error instanceof Error ? error.message : 'An error occurred')
    return false
  }
}

  const renderControls = () => {
    return (
      <div className="flex justify-end gap-2 border-t border-slate-100/20 p-8">
        {step > 1 && (
          <button
            className="btn btn-primary"
            onClick={() => onStepChange(step + 1)}
          >
            {step < 3 ? 'Next' : 'Finish'}
          </button>
        )}
        <button className="btn btn-outline" onClick={onCloseModal}>
          Close
        </button>
      </div>
    )
  }

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <dialog id="add_to_watchlist" className="modal">
        <div className="max-h-xl modal-box flex w-11/12 max-w-xl flex-col gap-4 p-0">
          {!(step === 3) && (
            <h3 className="flex items-center justify-between px-8 pt-8 text-lg font-bold">
              <>
                Add {title} to a Watchlist{' '}
                <ul className="steps overflow-hidden">
                  <li className={`step ${step >= 1 ? 'step-primary' : ''}`} />
                  <li className={`step ${step >= 2 ? 'step-primary' : ''}`} />
                  <li className={`step ${step >= 3 ? 'step-primary' : ''}`} />
                </ul>
              </>
            </h3>
          )}
          <div className="flex max-h-96 flex-col gap-4 overflow-y-auto p-8">
            {step === 1 && (
              <Step1Selection
                onStepChange={() => onStepChange(step + 1)}
                setWatchlistId={setWatchlistId}
                
              />
            )}
            {step === 2 && (
              <Step2Details tmdbId={tmdbId} setFormData={updateFormData} type={type}/>
            )}
            {step === 3 && <Step3Confirm title={title} errors={error ?? ''} onCloseModal={onCloseModal} />}
          </div>

          {!(step === 3) && renderControls()}
        </div>
      </dialog>
    </main>
  )
}

export default AddToWatchlistModal
