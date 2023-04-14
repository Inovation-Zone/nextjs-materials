import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
import { QueryClientProvider } from 'react-query';
import { Slide, ToastContainer } from 'react-toastify';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css'

import UserInfoProvider from '@/hooks/auth/userContext';

import queryClient from '@/configs/queryClient';

const Dashboard = dynamic(() => import('@/components/dashboard'), {
  ssr: false,
});
/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const Layout = router.pathname === '/login' ||
    router.pathname === '/forgot-password' ||
    router.pathname === '/' ||
    router.pathname === '/product/details' ||
    router.pathname === '/catalog' ||
    router.pathname === '/collection' ||
    router.pathname === '/collection/details' ||
    router.pathname === '/about' ||
    router.pathname === '/cart' ||
    router.pathname === '/contact'
    ? React.Fragment : Dashboard;

  return (
    <QueryClientProvider client={queryClient}>
      <UserInfoProvider>
        <Layout>
          <ToastContainer transition={Slide} />
          <Component {...pageProps} />
        </Layout>
      </UserInfoProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
