import {
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Col, Typography } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { useUserInfos } from '@/hooks/auth/userContext';
import useGetProducts from '@/hooks/product/useGetProducts';
import { useLanguage, useTranslate } from '@/hooks/useTranslate';

import SwitchLanguage from '@/components/switchLanguage';

import { SLIDE_URLS } from '@/constants';
import { Product } from '@/models/products.model';

interface MenuItem {
  label: string;
  key: string;
  expaned?: boolean;
}

interface HeaderProps {
  showSlider?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showSlider = true }) => {
  const [showBoard, setShowBoard] = useState<boolean>(false);
  const [productHoved, setProductHoved] = useState<Product | null>();
  const menuRef = useRef<any>(null);
  const router = useRouter();
  const { userInfos } = useUserInfos();
  const translate = useTranslate();
  const boardRef = useRef<any>(null);
  const { value } = useLanguage();

  const { data: products = [], isLoading: isLoadingProducts, refetch } = useGetProducts({ searchKeys: '', isHidden: false });

  const menuItems: MenuItem[] = [
    { label: translate.menus.aboutUs, key: 'about' },
    { label: translate.menus.products, key: 'products', expaned: true },
    { label: translate.menus.collections, key: 'collection' },
    { label: translate.menus.catalog, key: 'catalog' },
    { label: translate.menus.news, key: 'news' },
    { label: translate.menus.contacts, key: 'contacts' },
    { label: translate.menus.inquiry, key: 'cart' },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        boardRef.current &&
        !boardRef.current.contains(event.target)
      ) {
        setShowBoard(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef, boardRef]);

  const handleGoToLogin = () => {
    router.push(userInfos ? '/dashboard' : '/login');
  }

  const handleMenuItemClick = (item: MenuItem) => {
    if (item.key === 'about') {
      router.push('/about');
    }
    if (item.key === 'catalog') {
      router.push('/catalog');
    }
    if (item.key === 'collection') {
      router.push('/collection');
    }
    if (item.key === 'cart') {
      router.push('/cart');
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
    return products.slice(0, 8).map((item: Product) => {
      return (
        <div
          key={item.id}
          className='mt-6 mb-6'>
          <Typography
            onMouseEnter={() => handleMouseEnter(item)}
            onMouseLeave={() => handleMouseLeave()}
            onClick={() => handleGoToProductDetails(item)}
            className='cursor-pointer hover:text-cyan-600'>
            {item?.[`${value}_name` as keyof Product] as string}
          </Typography>
        </div>
      )
    })
  }

  return (
    <div
      className={`relative ${showSlider ? 'h-[500px]' : 'h-[300px]'}`}
      style={{ backgroundImage: `url('https://all-project-resources.s3.ap-southeast-1.amazonaws.com/69e39-shutterstock_1402283801.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLXNvdXRoZWFzdC0xIkgwRgIhAPe05QHGnJcaNC60A8Mm2tgfDeoNCfSgFAow%2B9aUYUEUAiEAk71q4sMdVsVxBZ27ZjEV0vHJAvnjPIr2YU1jVkcdtT4q7QII0v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgw3MjIyMDgyODI0MjQiDLk21t0Rwp5qZtT8lyrBAp9%2FNCj%2BW7OgBlw%2BMBDFd8xudDY1gnKGrtkMYTTkwx%2FLg4ybILaC60gI9YALf88hsfM58xi4L%2F0IbVi%2BX2ctzSMj%2BSpndJGbumqqulVHi6u8F1zPHxTQ%2BjvFb%2F2ocCXaUT3T2IyrKfq0c1lm0tBGooC5y35%2FX3DfHudA7w%2FajxVEk9QL6IP1VbRDrvJMCh%2FUdCvfPBitqqtv22Sf0tMaCklbm6U1FV9bg%2BMPOXeyLbCdN787rcTPsxuIOp0qPlQLNj4y55qubeNk2aS%2F8d91%2F7oxfJ8QF6%2BWv6th6ZPgsqJp%2BS%2Fk4RRy9YtzVg3wgOPrw%2F%2Fp%2BmaBeMOIe6jhXxs1fXQsyksMMQ5NR2eoHtYfAJfcVHmfnmkamcWhq6%2BeDzgvq7SUck%2BWJKGAXM6N7%2Fqg6bdZdmtOtJux1oMf21hkDlJwKTD4jd%2BhBjqyAgG5Dcq3s%2Bg39O0EaPgzdjqH%2FP6PZpeVYVfxWnsua8x0lPYTOpeECwrVLAHLG9WDJd4vyW5rzp55eATl6wTFjD4eDSCtgOkcMWTcIR45MavuULdilm5QFn4%2BpEnuYIHMa4MuhpV8pqCQ3vOXHQa5ediEDRnYqlK95O4EumbLtdg%2F71GTKU1EJ1b%2FjY0Lb47qsPgYF2nDcA3xqbyJE16PkVWu6b5Jm4CYsc42%2BlDq7SojfE%2FFB6FC8VMWxLzrIYjATcM3sU9uhLIrqjW32OPFW37kNOUc4oPgpnu8vJ0AHNMZsiuf4ek3vDSyyqRSFcsIwPWk3gNzmgSmfvWMJgudQYt8RhMSYrxXdBLfBHPXAXejAc466OodVIR8ECzsMJkJlxpe5oCL699O%2FZ54O5Cykji2Tg%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230413T095242Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA2QJXX244DZSIXAN2%2F20230413%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Signature=ad093a82581f52bd2403c19c06a9116c5d5917634add0bf9e31e70d9521f4591')`, objectFit: 'contain' }}>
      <div className='absolute top-5 right-12 z-10 flex space-x-4'>
        <a
          href='#'
          className='flex items-center text-white hover:text-gray-400'
          onClick={handleGoToLogin}
        >
          <UserOutlined className='text-[20px] text-white hover:text-gray-300' />
          <Typography className='ml-2 text-white hover:text-gray-300'>
            {userInfos ? userInfos?.fullName : translate.common.login}
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
                ref={boardRef}
                span={24}
                className='flex space-x-6 pr-10 pl-10 w-full h-[400px] bg-white opacity-95 top-12 absolute z-20 right-0' >
                <Col span={12}>
                  {renderMenuProducts()}
                </Col>
                <Col
                  span={12}
                  className='flex items-end'>
                  {productHoved?.fileResources?.length && (
                    <img
                      className='w-full h-[400px] object-cover'
                      src={productHoved?.fileResources[0].fileUrl} />
                  )}
                </Col>
              </Col>
            )}
          </ul>
        </div>
      </div>
      {showSlider && (
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
      )}
    </div>

  )
}

export default Header;