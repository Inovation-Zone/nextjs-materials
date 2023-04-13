
import Head from 'next/head';

import Cover from '@/components/cover';
import Footer from '@/components/footer';
import Header from '@/components/header';

export default function About() {

  return (
    <div className='bg-white'>
      <Head>
        <title>Gỗ Việt Thái</title>
        <meta
          name='description'
          content='Gỗ Việt Thái description' />
        <link
          rel='icon'
          href='/favicon.ico' />
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/antd/dist/antd.min.css'
        />
        <link
          href='https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css'
          rel='stylesheet'
        />
      </Head>
      <Header />
      <div className='bg-slate-100 py-4'>
      </div>
      <Cover />
      <Footer />
    </div>
  );
}
