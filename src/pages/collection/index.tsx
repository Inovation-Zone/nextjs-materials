/* eslint-disable @next/next/no-img-element */

import { Tabs, Typography } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';

import useGetCollectionsGroupByCollectionGroup from '@/hooks/collections/useGetCollectionsGroupByCollectionGroup';
import { useLanguage } from '@/hooks/useTranslate';

import Cover from '@/components/cover';
import Footer from '@/components/footer';
import Header from '@/components/header';
import Loading from '@/components/loading';

import { Collection, CollectionGroup } from '@/models/collections.model';

export default function LandingPage() {
  const { value } = useLanguage();
  const router = useRouter();

  const { data: groupCollections = [], isLoading } = useGetCollectionsGroupByCollectionGroup({ isHidden: false });

  const handleGoToCollectionDetail = (collection: Collection) => {
    router.push(`/collection/details?id=${collection.id}`);
  }

  const renderCollections = (collections: Collection[] | undefined) => {
    return (
      <div
        className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 px-12">
        {collections?.map((collection: Collection) => {
          const url = collection.fileUrls.length && collection.fileUrls[0];
          return (
            <div
              key={collection.id}
              className='cursor-pointer w-full mt-4 relative'
              onClick={() => handleGoToCollectionDetail(collection)}
            >
              <img
                className="w-[220px] border h-[220px] animate-fade-in duration-1000"
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
      {isLoading && (
        <Loading />
      )}
      <Cover />
      <Footer />
    </div>
  );
}
