
import { Typography } from 'antd';
import Head from 'next/head';

import useGetSettings from '@/hooks/settings/useGetSettings';
import { useLanguage } from '@/hooks/useTranslate';

import Footer from '@/components/footer';
import Header from '@/components/header';

import { Setting } from '@/models/settings.model';

export default function About() {
  const { data: settings = [] } = useGetSettings();
  const { value } = useLanguage();
  const aboutSetting = settings.find((item: Setting) => item.key === (value === 'vi' ? 'aboutContentVi' : 'aboutContentEn'));

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
      <Header showSlider={false} />
      <div className='lg:p-24 md:p-8 sm:p-4'>
        <Typography
          dangerouslySetInnerHTML={{ __html: aboutSetting?.value }}>
        </Typography>
      </div>
      <Footer />
    </div>
  );
}
