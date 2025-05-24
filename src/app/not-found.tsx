import MainLayoutProvider from '~/components/layout/mainLayoutProvider'
import { UnauthorizedAccess } from '~/components/utility/screens'

export default function NotFound() {
  const content = UnauthorizedAccess({
    errorMessage: '404 | Page Not Found',
    errorDetails: 'The page you are looking for does not exist.',
    redirectLink: {
      href: '/',
      label: 'Go to home page',
    },
  })
  return (
    <MainLayoutProvider>
      <div className="bg-navy-900 mx-auto flex h-screen w-1/2 flex-col items-center justify-center gap-8 px-4 text-white">
        {content}
      </div>
    </MainLayoutProvider>
  )
}
