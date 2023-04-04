import {
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Col, Typography } from 'antd';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { useUserInfos } from '@/hooks/auth/userContext';
import useGetProducts from '@/hooks/product/useGetProducts';
import { useTranslate } from '@/hooks/useTranslate';

import SwitchLanguage from '@/components/switchLanguage';

import { SLIDE_URLS } from '@/constants';
import { Product } from '@/models/products.model';

interface MenuItem {
  label: string;
  key: string;
  expaned?: boolean;
}

export default function Header() {
  const [showBoard, setShowBoard] = useState<boolean>(false);
  const [productHoved, setProductHoved] = useState<Product | null>();
  const menuRef = useRef<any>(null);
  const router = useRouter();
  const { userInfos } = useUserInfos();
  const translate = useTranslate();

  const { data: products = [], isLoading: isLoadingProducts, refetch } = useGetProducts({ searchKeys: '' });

  const menuItems: MenuItem[] = [
    { label: translate.menus.aboutUs, key: 'about', expaned: true },
    { label: translate.menus.products, key: 'products', expaned: true },
    { label: translate.menus.collections, key: 'collection' },
    { label: translate.menus.catalog, key: 'catalog' },
    { label: translate.menus.news, key: 'news' },
    { label: translate.menus.contacts, key: 'contacts' },
    { label: translate.menus.inquiry, key: 'inquiry' },
  ];

  const handleGoToLogin = () => {
    router.push(userInfos ? '/dashboard' : '/login');
  }

  const handleMenuItemClick = (item: MenuItem) => {
    if (item.key === 'catalog') {
      router.push('/catalog');
    }
    if (item.key === 'collection') {
      router.push('/collection');
    }
    if (item?.expaned) {
      setShowBoard(!showBoard);
    } else {
      setShowBoard(false);
    }
  };

  const handleMouseEnter = (item: Product) => {
    setProductHoved(item);
  };

  const handleMouseLeave = () => {
    setProductHoved(null);
  };

  const handleGoToProductDetails = (product: Product) => {
    setShowBoard(false);
    router.push({
      pathname: '/product/details',
      query: { id: product.id },
    })
  }


  const renderMenuProducts = () => {
    return products.map((item: Product) => {
      return (
        <div
          key={item.id}
          className='mt-6 mb-6'>
          <Typography
            onMouseEnter={() => handleMouseEnter(item)}
            onMouseLeave={() => handleMouseLeave()}
            onClick={() => handleGoToProductDetails(item)}
            className='cursor-pointer hover:text-cyan-600'>
            {item.name}
          </Typography>
        </div>
      )
    })
  }

  return (
    <div className='relative h-[600px]'>
      <div className='absolute top-5 right-12 z-10 flex space-x-4'>
        <a
          href='#'
          className='flex items-center text-white hover:text-gray-400'
          onClick={handleGoToLogin}
        >
          <UserOutlined className='text-[20px] text-white hover:text-gray-300' />
          <Typography className='ml-2 text-white hover:text-gray-300'>
            {userInfos ? userInfos?.fullName : 'Login'}
          </Typography>
        </a>
        <a
          href='#'
          className='flex items-center text-gray-500 hover:text-gray-300'
        >
          <ShoppingCartOutlined className='text-[20px] text-white hover:text-gray-300' />
        </a>
        <SwitchLanguage />
      </div>
      <div className='relative'>
        <div className='absolute top-12 z-10 flex w-full items-end justify-center'>
          <img
            src='https://www.panelplus.com/images/logo-panelplus.png'
            className='w-[100px] cursor-pointer'
            onClick={() => router.push('/')}
          />
          <ul
            className='ml-4 flex h-[50px] items-center space-x-6 relative'
            style={{ background: 'rgba(68, 121, 178, 0.7)' }}
          >
            {menuItems.map((item) => (
              <li
                ref={menuRef}
                key={item?.key}
                className='flex h-[50px] w-[140px] items-center justify-center hover:bg-gray-200 cursor-pointer'
                onClick={() => handleMenuItemClick(item)}
              >
                <a
                  href='#'
                  className='text-[14px] font-medium text-white hover:text-gray-900'
                >
                  {item?.label}
                </a>
              </li>
            ))}
            {showBoard && (
              <Col
                span={24}
                className='flex space-x-6 pr-10 pl-10 w-full h-[400px] bg-white opacity-95 top-12 absolute z-20 right-0' >
                <Col span={12}>
                  {renderMenuProducts()}
                </Col>
                <Col
                  span={12}
                  className='flex items-end'>
                  {productHoved?.fileResources?.length && (<img
                    className='w-full h-[400px]'
                    src={productHoved?.fileResources[0].fileUrl} />)}
                </Col>
              </Col>
            )}
          </ul>
        </div>
      </div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className='absolute top-0 left-0 h-full w-full'
        loop
      >
        {SLIDE_URLS.map((slide: any) => (
          <SwiperSlide key={slide.src}>
            <img
              src={slide.src}
              className='w-full object-cover' />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

  )
}