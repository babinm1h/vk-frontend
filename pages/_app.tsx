import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthProvider } from '../src/context/AuthContext'
import NextNProgress from "nextjs-progressbar"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

function MyApp({ Component, pageProps }: AppProps) {
  return <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <NextNProgress
        color="#5181b8"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      <Component {...pageProps} />
    </AuthProvider>
  </QueryClientProvider>
}

export default MyApp
