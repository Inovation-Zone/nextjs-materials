
import { Col, Row, Typography } from 'antd';
import Head from 'next/head';

import useGetCatalogGroupByCatalogGroup from '@/hooks/catalogs/useGetCatalogGroupByCatalogGroup';
import { useLanguage } from '@/hooks/useTranslate';

import Cover from '@/components/cover';
import Footer from '@/components/footer';
import Header from '@/components/header';
import Loading from '@/components/loading';

import { Catalog, Group } from '@/models/catalogs.model';

export default function LandingPage() {
  const { value } = useLanguage();
  const { data: groupCatalogs, isLoading } = useGetCatalogGroupByCatalogGroup();

  const renderCatalogs = (catalogs: Catalog[]) => {
    return (
      <div
        className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {catalogs.map((catalog: Catalog) => (
          <a
            key={catalog.id}
            className='cursor-pointer w-full mt-4'
            href={catalog?.[`${value}_fileUrl` as keyof Catalog] as string}
            target="_blank"
          >
            <div className='p-1 border'>
              <img
                className="w-full border h-[350px] object-cover"
                src={catalog.thumbnailUrl}
                alt={catalog.thumbnailUrl}
              />
            </div>
            <Typography className='mt-4'>{catalog[`${value}_name` as keyof Catalog]}</Typography>
          </a>
        ))}
      </div>
    )
  }

  const renderCatalogGroupByGroup = () => {
    return groupCatalogs.map((group: Group | any) => {
      return (
        <Col
          key={group.id}
          span={24}
          className='mx-48 my-8 bg-white p-4'
        >
          <Typography.Title
            level={2}
            className='mt-4'>{group[`${value}_name` as keyof Group]}</Typography.Title>
          <Row
            key={group.id}
            className='w-full'>
            {renderCatalogs(group.catalogs)}
          </Row>
        </Col >
      )
    })
  }

  return (
    <div className='bg-white'>
      <Head>
        <title>Landing Page</title>
        <meta
          name='description'
          content='Landing page description' />
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
        {renderCatalogGroupByGroup()}
      </div>
      {isLoading && <Loading />}
      <Cover />
      <Footer />
    </div>
  );
}
