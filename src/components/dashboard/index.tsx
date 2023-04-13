import {
  ColumnHeightOutlined,
  DashboardOutlined,
  FolderOpenOutlined,
  FontSizeOutlined,
  GroupOutlined,
  HighlightOutlined,
  HomeOutlined,
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
import { useRouter } from 'next/router';
import { memo, useState } from 'react';
import { toast } from 'react-toastify';

import useLogout from '@/hooks/auth/useLogout';
import { useUserInfos } from '@/hooks/auth/userContext';
import useDebounce from '@/hooks/useDebounce';
import { useTranslate } from '@/hooks/useTranslate';

import SwitchLanguage from '@/components/switchLanguage';

import { TOAST_CONFIG } from '@/configs/toast';

const { Header, Sider } = Layout;

function Dashboard({ children }: { children: React.ReactNode }) {
  const [menuKey, setMenuKey] = useState<string[]>([]);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const router = useRouter();
  const { userInfos, updateUserInfos } = useUserInfos();
  const { mutate } = useLogout();
  const translate = useTranslate();

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
        console.log('123213');
        updateUserInfos(null);
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
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={240}
        className="sidebar"
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
            key="/dashboard"
            icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
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
            title="Settings">
            {/* <Menu.Item key="general">General</Menu.Item>
            <Menu.Item key="privacy">Privacy</Menu.Item>
            <Menu.Item key="notifications">Notifications</Menu.Item> */}
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
                  <span style={{ marginLeft: 8 }}>{userInfos?.fullName}</span>
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
