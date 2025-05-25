/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'

import type { SanitizedProfileData, ProfileState } from '~/utils/types/data'
import UpdateProfileLayoutProvider from '~/components/layout/updateProfileLayoutProvider'

import { useForm } from 'react-hook-form'
import { revalidateProfile } from '~/app/profile/[slug]/actions'

interface EditProfileBioProps {
  params: string
  profileData: SanitizedProfileData
}

const copy = {
  title: 'Profile Bio',
  description: 'This contains your profile bio.',
}

function EditProfileBio({ params, profileData }: EditProfileBioProps) {
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false)
  const [length, setLength] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, watch } = useForm<SanitizedProfileData>()

  useEffect(() => {
    const subscription = watch((value) => {
      const bio = value.bio
      setLength(bio?.length ?? 0)

      if (!bio) {
        setIsSubmitEnabled(false)
        return
      }

      if (bio.toLowerCase() !== profileData?.bio?.toLowerCase()) {
        setIsSubmitEnabled(true)
        return
      }

      if (bio.length > 0) {
        setIsSubmitEnabled(true)
        return
      }

      setError(null)
      setIsSubmitEnabled(false)
    })

    return () => subscription.unsubscribe()
  }, [watch, profileData])

  const onSubmit = async (data: SanitizedProfileData) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/updateProfileBio`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bio: data.bio,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`,
        )
      }

      const responseText = await response.text()
      if (!responseText) {
        console.log('Empty response received')
        setError('Empty response from server')
        return
      }

      try {
        const authStorage = localStorage.getItem('auth-storage')
        if (authStorage) {
          const parsedStorage = JSON.parse(authStorage) as ProfileState
          if (parsedStorage.state?.ownProfileData) {
            parsedStorage.state.ownProfileData.bio = data.bio

            localStorage.setItem('auth-storage', JSON.stringify(parsedStorage))
            console.log('Profile details updated in local storage')
          }
        }
      } catch (storageError) {
        console.error(
          'Error updating profile details in local storage:',
          storageError,
        )
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      setError(
        error instanceof Error ? error.message : 'Failed to update profile',
      )
    } finally {
      setLoading(false)
      setIsSubmitEnabled(false)
    }
  }

  return (
    <UpdateProfileLayoutProvider
      sectionTitle={copy.title}
      sectionDescription={copy.description}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="relative w-full">
          <textarea
            rows={4}
            placeholder="Tell me something about you!"
            className="textarea textarea-bordered h-24 w-full bg-slate-800"
            defaultValue={profileData.bio}
            maxLength={360}
            {...register('bio')}
          ></textarea>
          <div className="absolute bottom-2 right-2 text-xs text-slate-400">
            {length}/360
          </div>
        </div>
        <div
          className={`${isSubmitEnabled && !loading ? 'flex' : 'hidden'} flex-col gap-2 transition-all duration-200 ease-in-out`}
        >
          <button className="btn btn-primary">Save Changes</button>
        </div>
        <div
          className={`${loading ? 'flex' : 'hidden'} flex-col gap-2 transition-all duration-200 ease-in-out`}
        >
          Saving..
        </div>
      </form>
    </UpdateProfileLayoutProvider>
  )
}

export default EditProfileBio
