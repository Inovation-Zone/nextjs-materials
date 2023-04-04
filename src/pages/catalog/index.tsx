
import { Col, Row, Typography } from 'antd';
import Head from 'next/head';

import useGetCatalogGroupByCatalogGroup from '@/hooks/catalogs/useGetCatalogGroupByCatalogGroup';
import { useLanguage } from '@/hooks/useTranslate';

import Header from '@/components/header';

import { Catalog, Group } from '@/models/catalogs.model';

export default function LandingPage() {
  const { value } = useLanguage();
  const { data: groupCatalogs } = useGetCatalogGroupByCatalogGroup();

  const renderCatalogs = (catalogs: Catalog[]) => {
    return (
      <div
        className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {catalogs.map((catalog: Catalog) => (
          <a
            key={catalog.id}
            className='cursor-pointer w-full mt-4'
            href={catalog[`${value}_fileUrl` as keyof Catalog]}
            target="_blank"
          >
            <img
              className="w-full border h-[350px]"
              src={catalog.thumbnailUrl}
              alt={catalog.thumbnailUrl}
            />
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
      <div className='mt-24'>
        <img
          src="https://s3-materials-storage.s3.ap-southeast-1.amazonaws.com/others/1680079661140_bwfl4e6xlw5.png"
          alt=""
          className='w-full h-[500px]' />
        <div className='pr-24 pl-24 mt-12'>
          <Typography.Title level={2}>Panel Plus: The Leading Manufacturer of Wood Substitute products</Typography.Title>
          <Typography.Text>Panel Plus Group formerly named MP Particle Board was founded in 1990 under the managerial direction of Mitr Phol Group. It operates as the leading manufacturer of Particle board, Medium density fibreboard, Melamine faced panels and Synchronous panel, the substitute wood products that are the results of the company’s incorporation of high quality manufacturing technology and excellent management.</Typography.Text>
        </div>
      </div>

      <div className='h-[1px] bg-slate-200 mt-8 mb-8'></div>
      <div className='pt-4 pl-24'>
        <Typography.Text>Copyright © Panel Plus Co.,Ltd. All rights reserved.</Typography.Text>
      </div>
    </div>
  );
}
