import { Col, Row, Typography } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo } from 'react';
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import useGetCollectionDetails from '@/hooks/collections/useGetCollectionDetails';
import { useLanguage, useTranslate } from '@/hooks/useTranslate';

import Header from '@/components/header';

import { Collection } from '@/models/collections.model';

function CollectionDetails() {
  const router = useRouter();
  const translate = useTranslate();
  const { id = '' } = useMemo(() => router.query, [router]);
  const { value } = useLanguage();
  const { data: collectionDetails } = useGetCollectionDetails(id);

  const renderImagesCollection = useCallback((collection: Collection) => {
    return (
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        className='h-[450px] w-[450px]'
      >
        {collection?.fileUrls?.length && collection?.fileUrls.map((item) => {
          return (
            <SwiperSlide key={item}>
              <img
                src={item}
                className='w-full object-cover h-[400px] w-[400px]'
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
    )
  }, []);

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
      <Col span={24}>
        <Row className='flex items-center justify-center mt-4'>
          <Typography.Title
            className='mt-4 uppercase'
            level={2}>
            {collectionDetails?.collectionGroup?.[`${value}_name`]}
          </Typography.Title>
        </Row>
        <Row className='px-[10%] mt-12'>
          <Col span={8}>
            {renderImagesCollection(collectionDetails)}
          </Col>
          <Col
            span={16}
            className='px-16'>
            <Col className='pl-5'>
              <Typography.Title
                level={4}>{collectionDetails?.name}</Typography.Title>
              <Row>
                <Col span={6}>
                  <Typography>{translate.collections.colorName}</Typography>
                  <Typography>{translate.collections.code}</Typography>
                  <Typography>{translate.collections.surfaceTexture}</Typography>
                  <Typography>{translate.collections.size}</Typography>
                </Col>
                <Col
                  span={18}>
                  <Typography>{collectionDetails?.color}</Typography>
                  <Typography>{collectionDetails?.code}</Typography>
                  <Typography>{collectionDetails?.surface}</Typography>
                  <Typography>{collectionDetails?.size}</Typography>
                </Col>
              </Row>
            </Col>
          </Col>
        </Row>
      </Col>
      <div className='h-[1px] bg-slate-200 mt-8 mb-8'></div>
      <div className='pt-4 pl-24'>
        <Typography.Text>
          Copyright © Panel Plus Co.,Ltd.
          All rights reserved.
        </Typography.Text>
      </div>
    </div>
  );
}

export default React.memo(CollectionDetails);
