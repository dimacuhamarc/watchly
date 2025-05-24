import React, { useState, useEffect } from 'react'

import { useForm } from 'react-hook-form'
import type { WatchlistRequest } from '~/utils/types/watchlist'

interface WatchlistModalProps {
  onAddWatchlist: () => void
}

function WatchlistModal({ onAddWatchlist }: WatchlistModalProps) {
  const { register, handleSubmit, reset, watch } = useForm<WatchlistRequest>({
    defaultValues: {
      public_watchlist: false,
    },
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [submitEnabled, setSubmitEnabled] = useState(false)

  useEffect(() => {
    const subscription = watch((value) => {
      const title = value.title

      if (!title) {
        setSubmitEnabled(false)
        return
      }

      if (title.length < 3) {
        setSubmitEnabled(false)
        return
      }

      if (title.length > 3) {
        setError(null)
        setSubmitEnabled(true)
        return
      }
    })

    return () => subscription.unsubscribe()
  }, [watch])

  const onSubmit = async (data: WatchlistRequest) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/watchlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const responseData = (await response.json()) as {
        message: string
        error?: string
        watchlist?: {
          id: string
          title: string
          description?: string
          public_watchlist: boolean
          createdAt: Date | string
          updatedAt: Date | string
        }
      }

      if (!response.ok) {
        setError(
          (responseData?.error?.toString() ??
            responseData?.message?.toString()) ||
            'Failed to create watchlist',
        )
      } else {
        onAddWatchlist()
        const modal = document.getElementById('my_modal_1') as HTMLDialogElement
        modal?.close()
        reset()
      }
    } catch (error) {
      console.error('Error creating watchlist:', error)
      setError(`An error occurred while creating the watchlist.`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h1 className="text-2xl font-bold">Create a Watchlist</h1>
          <p className="mb-4">
            Create a watchlist to keep track of your favorite movies and shows.
          </p>

          {error && (
            <div className="alert alert-error mb-4">
              <span>{error}</span>
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <label className="text-sm font-medium text-gray-500">
              Watchlist Details
            </label>
            <label className="input input-bordered flex items-center gap-2 bg-slate-800">
              <input
                type="text"
                className="grow"
                placeholder="Enter your watchlist name"
                required
                {...register('title', { required: true })}
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 bg-slate-800">
              <input
                type="text"
                className="grow"
                placeholder="Enter a description"
                {...register('description')}
              />
            </label>

            <label className="text-sm font-medium text-gray-500">
              Watchlist Privacy
            </label>
            <label className="input input-bordered flex items-center gap-2 bg-slate-800">
              <input
                type="checkbox"
                className="toggle toggle-primary"
                {...register('public_watchlist')}
              />
              <span className="grow">Make this watchlist public</span>
            </label>

            <div className="modal-action mt-4">
              <button
                type="button"
                className="btn"
                onClick={() => {
                  const modal = document.getElementById(
                    'my_modal_1',
                  ) as HTMLDialogElement
                  modal?.close()
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading || !submitEnabled}
              >
                {loading ? 'Creating...' : 'Create Watchlist'}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </main>
  )
}

export default WatchlistModal
