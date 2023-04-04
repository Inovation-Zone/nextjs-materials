/* eslint-disable @next/next/no-img-element */

import { Tabs, Typography } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';

import useGetCollectionsGroupByCollectionGroup from '@/hooks/collections/useGetCollectionsGroupByCollectionGroup';
import { useLanguage } from '@/hooks/useTranslate';

import Header from '@/components/header';

import { Collection, CollectionGroup } from '@/models/collections.model';

export default function LandingPage() {
  const { value } = useLanguage();
  const router = useRouter();

  const { data: groupCollections = [] } = useGetCollectionsGroupByCollectionGroup();

  const handleGoToCollectionDetail = (collection: Collection) => {
    router.push(`/collection/details?id=${collection.id}`);
  }

  const renderCollections = (collections: Collection[]) => {
    return (
      <div
        className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 px-12">
        {collections.map((collection: Collection) => {
          const url = collection.fileUrls.length && collection.fileUrls[0];
          return (
            <div
              key={collection.id}
              className='cursor-pointer w-full mt-4 relative'
              onClick={() => handleGoToCollectionDetail(collection)}
            >
              <img
                className="w-[220px] border h-[220px]"
                src={url || ''}
                alt={url || ''}
              />
              <div className='w-full h-[30px] flex items-center absolute bottom-0 left-0 bg-[#F1ECE9] px-2 opacity-70'>
                <Typography className='text-[13px] font-medium truncate'>{collection.name}</Typography>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const renderCollectionGroupByGroup = () => {
    return (
      <Tabs
        defaultActiveKey="1"
        type="card"
        size="middle"
        className='flex items-center justify-center'
        tabBarStyle={{ fontWeight: 'bold', textTransform: 'uppercase' }}
        tabBarGutter={0}
        items={groupCollections.map((collectionGroup: CollectionGroup) => {
          return {
            key: collectionGroup.id,
            label: collectionGroup[`${value}_name` as keyof CollectionGroup],
            children: renderCollections(collectionGroup.collections),
          };
        })}
      />
    )
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
      <div className='py-4'>
        {renderCollectionGroupByGroup()}
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
