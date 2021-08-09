import { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { Provider as NextAuthProvider } from 'next-auth/client'
import { Toaster } from 'react-hot-toast'

import '../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 5000
        }}
      />
      <NextAuthProvider session={pageProps.session} >
        <Header />
        <Component {...pageProps} />
      </NextAuthProvider>
    </>
  )
}

export default MyApp
