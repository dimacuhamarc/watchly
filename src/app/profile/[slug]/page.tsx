
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
      <div className="md:mx-auto md:my-auto flex h-full w-full md:max-w-screen-lg md:min-h-screen flex-col items-start justify-center md:px-0">
        <Profile params={slug} />
      </div>
    </AuthLayoutProvider>
  );
}

export default ProfilePage