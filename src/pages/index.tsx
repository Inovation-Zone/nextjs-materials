
import { Col, Row, Typography } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';

import useGetProducts from '@/hooks/product/useGetProducts';
import { useLanguage, useTranslate } from '@/hooks/useTranslate';

import Cover from '@/components/cover';
import Footer from '@/components/footer';
import Header from '@/components/header';
import Loading from '@/components/loading';

import { DEFAULT_IMAGE } from '@/constants';
import { Product } from '@/models/products.model';

export default function LandingPage() {
  const router = useRouter();
  const translate = useTranslate();
  const { value } = useLanguage();

  const { data: products = [], isLoading } = useGetProducts({ searchKeys: '', isHidden: false });

  const handleGoToProductDetails = (product: Product) => {
    router.push({
      pathname: '/product/details',
      query: { id: product.id },
    })
  }

  const renderProducts = () => {
    return products.map((item: Product) => {
      return (
        <Col
          key={item.id}
          span={8}
          className='min-w-[300px] w-[300px] h-[300px] bg-center px-0'
          style={{ backgroundImage: `url(${item.fileResources?.length ? item.fileResources[0].fileUrl : DEFAULT_IMAGE})` }}
        >
          <Typography.Text
            onClick={() => handleGoToProductDetails(item)}
            className='w-full flex items-center justify-center text-center h-[60px] font-medium text-[15px] bg-slate-200 opacity-80 uppercase cursor-pointer'
          >
            {item?.[`${value}_name` as keyof Product] as string}
          </Typography.Text>
        </Col>
      )
    })
  }

  return (
    <div className='bg-white'>
      <Head>
        <title>Gỗ Việt Thái - Trang chủ</title>
        <meta
          name='description'
          content='Trang chủ - Gỗ Việt Thái' />
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
      <div className='w-full flex items-center justify-center flex-col mt-12'>
        <Typography.Title
          className='uppercase'
          level={3}>{translate.products.ourProducts}</Typography.Title>
        {isLoading ? <Loading /> : (
          <Row
            className='mt-4 px-48'>{renderProducts()}</Row>
        )}
      </div>
      <Cover />
      <Footer />
    </div>
  );
}
