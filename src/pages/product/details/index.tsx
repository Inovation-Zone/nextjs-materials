
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Col, InputNumber, Row, Typography } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef } from 'react';
import { toast } from 'react-toastify';
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import useGetProductDetails from '@/hooks/product/useGetProductDetails';
import { useLanguage, useTranslate } from '@/hooks/useTranslate';

import { CartItem } from '@/components/cart';
import CustomSelect from '@/components/customSelect';
import CustomSelectWoodType from '@/components/customSelectWoodType';
import Footer from '@/components/footer';
import Header from '@/components/header';

import { TOAST_CONFIG } from '@/configs/toast';
import { Adhesive, Product, Size, Thickness, WoodType } from '@/models/products.model';

export default function LandingPage() {
  const router = useRouter();
  const { id = '' } = useMemo(() => router.query, [router]);
  const { data: productDetails, isLoading } = useGetProductDetails(id as string);
  const woodTypesRef = useRef<any>(null);
  const adhesivesRef = useRef<any>(null);
  const thicknessesRef = useRef<any>(null);
  const sizesRef = useRef<any>(null);
  const quantityRef = useRef<any>(null);
  const translate = useTranslate();
  const { value } = useLanguage();

  useEffect(() => {
    if (productDetails?.woodTypes?.length) {
      const woodTypesFormat = productDetails.woodTypes.map((item: WoodType) => {
        return {
          vi_name: item.vi_name,
          en_name: item.en_name,
          value: item?.id
        }
      })
      woodTypesRef.current.setOptions(woodTypesFormat);
    }

    if (productDetails?.adhesives?.length) {
      const adhesivesFormat = productDetails.adhesives.map((item: Adhesive) => {
        return {
          name: item?.name,
          value: item?.id
        }
      })
      adhesivesRef.current.setOptions(adhesivesFormat);
    }

    if (productDetails?.thicknesses?.length) {
      const thicknessesFormat = productDetails.thicknesses.map((item: Thickness) => {
        return {
          name: item.value,
          value: item.id
        }
      })
      thicknessesRef.current.setOptions(thicknessesFormat);
    }

    if (productDetails?.sizes?.length) {
      const sizesFormat = productDetails.sizes.map((item: Size) => {
        return {
          name: `${item.width} x ${item.height}`,
          value: item.id
        }
      })
      sizesRef.current.setOptions(sizesFormat);
    }
  }, [productDetails]);

  const handleOrderNow = () => {
    const data = {
      product: productDetails,
      woodType: woodTypesRef?.current?.getValue(),
      adhesive: adhesivesRef?.current?.getValue(),
      thickness: thicknessesRef?.current?.getValue(),
      size: sizesRef?.current?.getValue(),
      quantity: quantityRef?.current.value
    }

    let productOrders: CartItem[] = [];
    if (localStorage.getItem('productOrders')) {
      productOrders = JSON.parse(localStorage.getItem('productOrders') || '');
    }

    const findResult = productOrders.find((item: CartItem) => item.product.id === data.product.id);
    let productOrdersNew: CartItem[] = [...productOrders];
    if (findResult) {
      const isEqual = JSON.stringify(findResult) === JSON.stringify(data);
      if (!isEqual) {
        productOrdersNew = [...productOrders, data];
      }
    } else {
      productOrdersNew = [...productOrders, data];
    }
    localStorage.setItem('productOrders', JSON.stringify(productOrdersNew));
    router.push('/cart');
    toast.success(translate.messageToast.order.add, TOAST_CONFIG);
  }

  const renderImagesProduct = (product: Product) => {
    return product?.fileResources?.length ? (
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        className='h-[400px] w-full'
      >
        {product.fileResources.map((item: any) => {
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
    ) : (
      <img
        src="http://biropbj.sumutprov.go.id/storage/2021/04/default.jpg"
        className='w-full object-cover h-[400px] w-[400px]'
      />
    )
  }

  return (
    <div className='bg-white'>
      <Head>
        <title>Gỗ Việt Thái - Chi tiết sản phẩm</title>
        <meta
          name='description'
          content='Gỗ Việt Thái - Chi tiết sản phẩm' />
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
      <Row
        className='w-full flex flex-col items-center justify-center'>
        <Typography.Title
          className='mt-4'
          level={3}>{productDetails?.[`${value}_name` as keyof Product] as string}</Typography.Title>
        <Row className='w-full px-24'>
          <Col
            span={12}
            className='p-10'>
            <Row className='w-full flex flex-col'>
              <Typography.Title
                className='mt-4'
                level={4}>{productDetails?.[`${value}_name` as keyof Product] as string}</Typography.Title>
              {renderImagesProduct(productDetails)}
              <Typography
                className='mt-8 mb-4'
                dangerouslySetInnerHTML={{ __html: productDetails?.[`${value}_description` as keyof Product] as string }}></Typography>
            </Row>
          </Col>
          <Col
            span={12}
            className='px-10 mt-5' >
            {productDetails?.woodTypes?.length ? <CustomSelectWoodType
              label={translate.woodTypes.name}
              ref={woodTypesRef} /> : undefined}
            {productDetails?.adhesives?.length ? <CustomSelect
              label={translate.adhesives.name}
              ref={adhesivesRef}
              layout='ver' /> : undefined}
            {productDetails?.thicknesses?.length ? <CustomSelect
              label={translate.thicknesses.name}
              ref={thicknessesRef}
              layout='ver' /> : undefined}
            {productDetails?.sizes?.length ? <CustomSelect
              label={translate.sizes.name}
              ref={sizesRef} /> : undefined}
            <Col>
              <Typography className='font-bold text-gray-500 mt-12 mb-4'>Quantity</Typography>
              <InputNumber
                ref={quantityRef}
                addonAfter="PIECE"
                type="number"
                defaultValue={1}
                min={0} />
            </Col>
            <Row>
              {!productDetails?.isOutOfStock ? (
                <Button
                  danger
                  type='primary'
                  size='large'
                  className="flex items-center justify-center gap-2 mt-8 hover:bg-yellow-600 rounded-sm px-4 py-2 text-white font-medium"
                  icon={<ShoppingCartOutlined className='text-lg' />}
                >
                  {translate.products.outOfStock}
                </Button>
              ) : (
                <Button
                  type="primary"
                  size='large'
                  className="flex items-center justify-center gap-2 mt-8 hover:bg-yellow-600 rounded-sm px-4 py-2 text-white font-medium"
                  onClick={handleOrderNow}
                  icon={<ShoppingCartOutlined className='text-lg' />}
                >
                  {translate.products.orderNow}
                </Button>
              )}
            </Row>
          </Col>
        </Row>
      </Row>
      <Footer />
    </div >
  );
}

