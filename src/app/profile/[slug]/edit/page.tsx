
import React from 'react'
import AuthLayoutProvider from '~/components/layout/authLayoutProvider';
import EditProfile from '~/components/resource/profile/Edit/index';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params;
  return {
    title: `Edit Profile | Watchly`,
    description: `${slug} | Watchly`,
  };
}

function EditProfilePage({params}: { params: { slug: string } }) {
  const { slug }: { slug: string } = React.use(Promise.resolve(params));

  return (
    <AuthLayoutProvider>
      <div className="mx-auto my-auto flex max-w-screen-lg min-h-screen flex-col items-start justify-center md:px-0">
        <EditProfile params={slug} />
      </div>
    </AuthLayoutProvider>
  )
}

export default EditProfilePage