import {
  AlignLeftOutlined,
  ShoppingCartOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Col, Drawer, Typography } from 'antd';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import useGetProducts from '@/hooks/product/useGetProducts';
import useGetSettings from '@/hooks/settings/useGetSettings';
import { useLanguage, useTranslate } from '@/hooks/useTranslate';

import SwitchLanguage from '@/components/switchLanguage';

import { SLIDE_URLS } from '@/constants';
import { USER_INFOS } from '@/constants/api';
import { Product } from '@/models/products.model';
import { Setting } from '@/models/settings.model';

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
  const translate = useTranslate();
  const boardRef = useRef<any>(null);
  const { value } = useLanguage();
  const { data: settings = [] } = useGetSettings();
  const settingLogo = settings.find((item: Setting) => item.key === 'logo');
  const userInfos = useMemo(() => Cookies.get(USER_INFOS) && JSON?.parse(Cookies.get(USER_INFOS) as string), []);
  const [open, setOpen] = useState(false);

  const { data: products = [], isLoading: isLoadingProducts, refetch } = useGetProducts({ searchKeys: '', isHidden: false });

  const menuItems: MenuItem[] = [
    { label: translate.menus.aboutUs, key: 'about' },
    { label: translate.menus.products, key: 'products', expaned: true },
    { label: translate.menus.collections, key: 'collection' },
    { label: translate.menus.catalog, key: 'catalog' },
    { label: translate.menus.news, key: 'news' },
    { label: translate.menus.contacts, key: 'contact' },
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
    router.push(userInfos ? '/dashboard/order' : '/login');
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
    if (item.key === 'contact') {
      router.push('/contact');
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

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
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
      className={`relative ${showSlider ? 'h-[500px] lg:h-[500px] md:h-[300px] sm:h-[220px]' : 'h-[300px]'} lg:bg-repeat-space sm:bg-repeat-round`}
      style={{ backgroundImage: `url('https://all-project-resources.s3.ap-southeast-1.amazonaws.com/others/1681380508582_ygmciknpond.jpg')` }}>
      <div className='flex items-center justify-between lg:hidden'>
        <img
          src={settingLogo?.value ? settingLogo?.value : 'https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png'}
          className='w-[60px] h-[60px] left-3 top-4 cursor-pointer absolute z-10 rounded-md md:w-[80px] md:h-[80px] md:left-8'
          onClick={() => router.push('/')}
        />
        <div
          className='absolute flex gap-5 z-10 right-5 top-5 md:right-8'>
          <a
            href='#'
            className='flex items-center text-gray-500 hover:text-gray-300'
          >
            <ShoppingCartOutlined
              className='text-[30px] text-white hover:text-gray-300'
              onClick={() => router.push('/cart')} />
          </a>
          <div
            onClick={() => showDrawer()}>
            <AlignLeftOutlined className='text-white text-[25px]' />
            <Typography className='text-white'>Menu</Typography>
          </div>
        </div>
      </div>
      <div className='absolute top-5 right-12 z-10 flex space-x-4 lg:flex sm:hidden'>
        <a
          href='#'
          className='flex items-center text-white hover:text-gray-400'
          onClick={handleGoToLogin}
        >
          <UserOutlined className='text-[20px] text-white hover:text-gray-300' />
          <Typography className='ml-2 text-white hover:text-gray-300'>
            {(userInfos ? translate.common.dashboardControl : translate.common.login) || ''}
          </Typography>
        </a>
        <a
          href='#'
          className='flex items-center text-gray-500 hover:text-gray-300'
        >
          <ShoppingCartOutlined
            className='text-[20px] text-white hover:text-gray-300'
            onClick={() => router.push('/cart')} />
        </a>
        <SwitchLanguage />
      </div>
      <div className='relative lg:flex sm:hidden'>
        <div className='absolute top-12 z-10 flex w-full items-end justify-center'>
          <img
            src={settingLogo?.value ? settingLogo?.value : 'https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png'}
            className='w-[100px] h-[100px] cursor-pointer lg:flex sm:hidden'
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
                className='w-full object-cover lg:h-[500px] md:h-[300px] sm:h-[220px]' />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <Drawer
        title={<div className='flex items-center justify-between'>
          <Typography>Menu</Typography>
          <SwitchLanguage />
        </div>}
        onClose={onClose}
        className='w-full'
        open={open}>
        <div className='flex flex-col gap-5'>
          {menuItems.map((item) => {
            return (
              <li
                ref={menuRef}
                key={item?.key}
                className='flex items-center px-5 cursor-pointer'
                onClick={() => {
                  handleMenuItemClick(item)
                  setOpen(false)
                }}
              >
                <div>
                  <a
                    href='#'
                    className='text-[14px] hover:text-gray-900 font-bold'
                  >
                    {item?.label}
                  </a>
                  {item.expaned ? <div className='h-auto px-4 flex flex-col gap-2 mt-3'>
                    {products.slice(0, 8).map((item: Product) => {
                      return (
                        <div
                          key={item.id}
                          className='h-auto flex gap-2'>
                          -<Typography
                            onMouseEnter={() => handleMouseEnter(item)}
                            onMouseLeave={() => handleMouseLeave()}
                            onClick={() => handleGoToProductDetails(item)}
                            className='cursor-pointer hover:text-cyan-600 capitalize text-[13px]'>
                            {item?.[`${value}_name` as keyof Product]?.toString().toLowerCase() as string}
                          </Typography>
                        </div>
                      )
                    })}
                  </div> : undefined}
                </div>
              </li>
            )
          })}
        </div>
      </Drawer>
    </div>

  )
}

export default Header;