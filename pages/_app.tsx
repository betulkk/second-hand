"use client";
import type { AppProps } from 'next/app'
import { UserProvider } from '@/app/context/UserContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
