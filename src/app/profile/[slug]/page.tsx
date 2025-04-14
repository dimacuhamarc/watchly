
import React from 'react'
import AuthLayoutProvider from '~/components/layout/authLayoutProvider';
import Profile from '~/components/resource/profile/index';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params;
  return {
    title: `${slug} | Watchly`,
    description: `${slug} | Watchly`,
  };
}

function ProfilePage({params}: { params: { slug: string } }) {
  const { slug }: { slug: string } = React.use(Promise.resolve(params));
  return (
    <AuthLayoutProvider>
      <div className="mx-auto my-auto flex max-w-screen-lg min-h-screen flex-col items-start justify-center md:px-0 py-10">
        <Profile params={slug} />
      </div>
    </AuthLayoutProvider>
  );
}

export default ProfilePage