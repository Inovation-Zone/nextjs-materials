import {
  AppstoreAddOutlined,
  ColumnHeightOutlined,
  ContactsOutlined,
  FolderOpenOutlined,
  FontSizeOutlined,
  GroupOutlined,
  HighlightOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  InsertRowRightOutlined,
  LogoutOutlined,
  MergeCellsOutlined,
  RadarChartOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  UnorderedListOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Avatar, Dropdown, Layout, Menu, Row, Typography } from 'antd';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { memo, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import useLogout from '@/hooks/auth/useLogout';
import useDebounce from '@/hooks/useDebounce';
import { useTranslate } from '@/hooks/useTranslate';

import SwitchLanguage from '@/components/switchLanguage';

import { TOAST_CONFIG } from '@/configs/toast';
import { USER_INFOS } from '@/constants/api';

const { Header, Sider } = Layout;

function Dashboard({ children }: { children: React.ReactNode }) {
  const [menuKey, setMenuKey] = useState<string[]>([]);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const router = useRouter();
  const { mutate } = useLogout();
  const translate = useTranslate();
  const userInfos = useMemo(() => Cookies.get(USER_INFOS) && JSON?.parse(Cookies.get(USER_INFOS) as string), []);

  const handleMenuClick = (e: any) => {
    if (e.key !== menuKey) {
      setMenuKey([e.key]);
      router.push(e.key);
    }
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = useDebounce(() => {
    mutate(true, {
      onSuccess: () => {
        Cookies.set(USER_INFOS, '');
        router.push('/');
      },
      onError: () => {
        toast.error(translate.messageToast.auth.failed.logout, TOAST_CONFIG);
      },
    })
  }, 300);

  const menu = (
    <Menu>
      <Menu.Item
        key="2"
        icon={<LogoutOutlined />}
        onClick={handleLogout}>
        {translate.common.logout}
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout
      style={{ minHeight: '100vh' }}>
      <Sider
        width={240}
        className="sidebar py-5"
        collapsible
        collapsed={collapsed}
        onCollapse={toggleSidebar}
      >
        <Menu
          theme="dark"
          mode="inline"
          onClick={handleMenuClick}
          defaultSelectedKeys={['dashboard']}
          selectedKeys={menuKey}
        >
          <Menu.Item
            key="/dashboard/order"
            icon={<ShoppingCartOutlined />}>
            {translate.order.title}
          </Menu.Item>
          {/* <Menu.Item
            key="messages"
            icon={<MailOutlined />}>
            Messages
            <Badge
              count={5}
              offset={[8, 0]} />
          </Menu.Item> */}
          <Menu.SubMenu
            key="/dashboard/product"
            icon={<MergeCellsOutlined />}
            title={translate.products.name}
            onTitleClick={handleMenuClick}>
            <Menu.Item
              key="/dashboard/product/categories"
              icon={<UnorderedListOutlined />}>
              {translate.categories.name}
            </Menu.Item>
            <Menu.Item
              key="/dashboard/product/woodTypes"
              icon={<RadarChartOutlined />}>
              {translate.woodTypes.name}
            </Menu.Item>
            <Menu.Item
              key="adhesives"
              icon={<HighlightOutlined />}>
              {translate.adhesives.name}
            </Menu.Item>
            <Menu.Item
              key="thicknesses"
              icon={<ColumnHeightOutlined />}>
              {translate.thicknesses.name}
            </Menu.Item>
            <Menu.Item
              key="sizes"
              icon={<FontSizeOutlined />}>
              {translate.sizes.name}
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu
            key="/dashboard/collection"
            icon={<FolderOpenOutlined />}
            title={translate.collection.name}
            onTitleClick={handleMenuClick}>
            <Menu.Item
              key="/dashboard/collection/group"
              icon={<GroupOutlined />}>
              {translate.collection.group.name}
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu
            key="/dashboard/catalog"
            icon={<InsertRowRightOutlined />}
            title={translate.catalog.name}
            onTitleClick={handleMenuClick}>
            <Menu.Item
              key="/dashboard/catalog/group"
              icon={<GroupOutlined />}>
              {translate.catalog.group.name}
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu
            key="settings"
            icon={<SettingOutlined />}
            title={translate.setting.title}>
            <Menu.Item
              key="/dashboard/setting/general"
              icon={<AppstoreAddOutlined />}>
              {translate.setting.general.title}
            </Menu.Item>
            <Menu.Item
              key="/dashboard/setting/about"
              icon={<InfoCircleOutlined />}>
              {translate.setting.about.title}
            </Menu.Item>
            <Menu.Item
              key="/dashboard/setting/contact"
              icon={<ContactsOutlined />}>
              {translate.setting.contact.title}
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Header
          className='flex items-center justify-between border'
          style={{
            background: '#fff',
            padding: 0,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Row className='w-full flex items-center justify-between'>
            <Row className='flex items-center justify-center pl-6 cursor-pointer'>
              <HomeOutlined className='text-[20px]' />
              <Typography
                className='ml-2 font-bold'
                onClick={() => router.push('/')}
              >
                {translate.common.home}
              </Typography>
            </Row>
            <Row className='flex items-center justify-center'>
              <SwitchLanguage />
              <Dropdown
                overlay={menu}
                className='mr-10 ml-5'>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <Avatar
                    className='flex items-center justify-center'
                    icon={<UserOutlined />} />
                  <Typography className='ml-2'>{userInfos?.fullName as string}</Typography>
                </div>
              </Dropdown>
            </Row>
          </Row>
        </Header>
        <div
          className='h-full p-6 bg-white min-h-[280px]'
        >
          {children}
        </div>
      </Layout>
    </Layout >
  );
}

export default memo(Dashboard);
