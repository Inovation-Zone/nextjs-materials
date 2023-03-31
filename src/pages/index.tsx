
import { Col, Row, Typography } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';

import useGetProducts from '@/hooks/product/useGetProducts';

import { Product } from '@/models/products.model';
import Header from '@/components/header';
import { DEFAULT_IMAGE } from '@/constants';
import { useTranslate } from '@/hooks/useTranslate';

export default function LandingPage() {
  const router = useRouter();
  const translate = useTranslate();

  const { data: products = [], isLoading: isLoadingProducts, refetch } = useGetProducts({ searchKeys: '' });

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
          className='min-w-[300px] w-[300px] h-[300px] bg-center'
          style={{ paddingLeft: 0, paddingRight: 0, backgroundImage: `url(${item.fileResources?.length ? item.fileResources[0].fileUrl : DEFAULT_IMAGE})` }}
        >
          <Typography.Text
            onClick={() => handleGoToProductDetails(item)}
            className='w-full flex items-center justify-center text-center h-[60px] font-medium text-[15px] bg-slate-200 opacity-80 uppercase cursor-pointer'
          >
            {item.name}
          </Typography.Text>
        </Col>
      )
    })
  }

  return (
    <div className='bg-white'>
      <Head>
        <title>Landing Page</title>
        <meta name='description' content='Landing page description' />
        <link rel='icon' href='/favicon.ico' />
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
        <Typography.Title className='uppercase' level={3}>{translate.products.ourProducts}</Typography.Title>
        <Row gutter={[16, 0]} className='mt-4 p-0'>{renderProducts()}</Row>
      </div>

      <div className='mt-24'>
        <img src="https://s3-materials-storage.s3.ap-southeast-1.amazonaws.com/others/1680079661140_bwfl4e6xlw5.png" alt="" className='w-full h-[500px]' />
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
