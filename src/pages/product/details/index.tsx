
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Col, InputNumber, Row, Typography } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef } from 'react';
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import useGetProductDetails from '@/hooks/product/useGetProductDetails';
import { useTranslate } from '@/hooks/useTranslate';

import CustomSelect from '@/components/customSelect';
import Header from '@/components/header';

import { Adhesive, Product, Size, Thickness, WoodType } from '@/models/products.model';

export default function LandingPage() {
  const router = useRouter();
  const { id = '' } = useMemo(() => router.query, [router]);
  const { data: productDetails } = useGetProductDetails(id);
  const woodTypesRef = useRef<any>(null);
  const adhesivesRef = useRef<any>(null);
  const thicknessesRef = useRef<any>(null);
  const sizesRef = useRef<any>(null);
  const translate = useTranslate();

  useEffect(() => {
    if (productDetails.woodTypes?.length) {
      const woodTypesFormat = productDetails.woodTypes.map((item: WoodType) => {
        return {
          name: item?.name,
          value: item?.id
        }
      })
      woodTypesRef.current.setOptions(woodTypesFormat);
    }

    if (productDetails.adhesives?.length) {
      const adhesivesFormat = productDetails.adhesives.map((item: Adhesive) => {
        return {
          name: item?.name,
          value: item?.id
        }
      })
      adhesivesRef.current.setOptions(adhesivesFormat);
    }

    if (productDetails.thicknesses?.length) {
      const thicknessesFormat = productDetails.thicknesses.map((item: Thickness) => {
        return {
          name: item.value,
          value: item.id
        }
      })
      thicknessesRef.current.setOptions(thicknessesFormat);
    }

    if (productDetails.sizes?.length) {
      const sizesFormat = productDetails.sizes.map((item: Size) => {
        return {
          name: `${item.width} x ${item.height}`,
          value: item.id
        }
      })
      sizesRef.current.setOptions(sizesFormat);
    }
  }, [productDetails]);

  const renderImagesProduct = (product: Product) => {
    return (
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        className='h-[400px] w-full'
      >
        {product.fileResources?.length && product.fileResources.map((item) => {
          return (
            <SwiperSlide key={item.id}>
              <img
                src={item.fileUrl}
                className='w-full object-cover h-[400px] w-[400px]'
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
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
      <Col
        span={24}
        className='flex flex-col items-center justify-center'>
        <Typography.Title
          className='mt-4'
          level={3}>{productDetails.name}</Typography.Title>
        <Col
          span={24}
          className='flex pl-40'>
          <Col
            span={12}
            className='p-10'>
            <Row className='flex flex-col'>
              <Typography.Title
                className='mt-4'
                level={4}>{productDetails.name}</Typography.Title>
              {renderImagesProduct(productDetails)}
              <Typography
                className='mt-8 mb-4'
                dangerouslySetInnerHTML={{ __html: productDetails.description }}></Typography>
            </Row>
          </Col>
          <Col
            span={12}
            className='p-10' >
            {productDetails.woodTypes?.length ? <CustomSelect
              label={translate.woodTypes.name}
              ref={woodTypesRef} /> : undefined}
            {productDetails.adhesives?.length ? <CustomSelect
              label={translate.adhesives.name}
              ref={adhesivesRef}
              layout='ver' /> : undefined}
            {productDetails.thicknesses?.length ? <CustomSelect
              label={translate.thicknesses.name}
              ref={thicknessesRef}
              layout='ver' /> : undefined}
            {productDetails.sizes?.length ? <CustomSelect
              label={translate.sizes.name}
              ref={sizesRef} /> : undefined}
            <Col>
              <Typography className='font-bold text-gray-500 mt-12 mb-4'>Quantity</Typography>
              <InputNumber addonAfter="PIECE" />
            </Col>
            <Button
              type="primary"
              size='large'
              className="flex items-center justify-center gap-2 mt-8 bg-yellow-500 hover:bg-yellow-600 rounded-sm px-4 py-2 text-white font-medium"
              icon={<ShoppingCartOutlined className='text-lg' />}
            >
              Order Now
            </Button>
          </Col>
        </Col>
      </Col>

      {/* <div className='mt-24'>
        <img src="https://s3-materials-storage.s3.ap-southeast-1.amazonaws.com/others/1680079661140_bwfl4e6xlw5.png" alt="" className='w-full h-[500px]' />
        <div className='pr-24 pl-24 mt-12'>
          <Typography.Title level={2}>Panel Plus: The Leading Manufacturer of Wood Substitute products</Typography.Title>
          <Typography.Text>Panel Plus Group formerly named MP Particle Board was founded in 1990 under the managerial direction of Mitr Phol Group. It operates as the leading manufacturer of Particle board, Medium density fibreboard, Melamine faced panels and Synchronous panel, the substitute wood products that are the results of the company’s incorporation of high quality manufacturing technology and excellent management.</Typography.Text>
        </div>
      </div> */}

      <div className='h-[1px] bg-slate-200 mt-8 mb-8'></div>
      <div className='pt-4 pl-24'>
        <Typography.Text>Copyright © Panel Plus Co.,Ltd. All rights reserved.</Typography.Text>
      </div>
    </div>
  );
}

