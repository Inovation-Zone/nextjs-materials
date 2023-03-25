import {
  AppstoreOutlined,
  ColumnHeightOutlined,
  DashboardOutlined,
  FontSizeOutlined,
  HighlightOutlined,
  LogoutOutlined,
  MailOutlined,
  MergeCellsOutlined,
  RadarChartOutlined,
  SearchOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Avatar, Badge, Dropdown, Input, Layout, Menu, Row } from 'antd';
import { useRouter } from 'next/router';
import { memo, useState } from 'react';
import { toast } from 'react-toastify';

import useLogout from '@/hooks/auth/useLogout';
import { useUserInfos } from '@/hooks/auth/userContext';
import useDebounce from '@/hooks/useDebounce';

import SwitchLanguage from '@/components/switchLanguage';

import { TOAST_CONFIG } from '@/configs/toast';

const { Header, Content, Sider } = Layout;

function Dashboard({ children }: { children: React.ReactNode }) {
  const [menuKey, setMenuKey] = useState<string[]>([]);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const router = useRouter();
  const { userInfos } = useUserInfos();
  const { mutate } = useLogout();

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
        router.push('/login');
      },
      onError: () => {
        toast.error('Logout failed. Please try again.', TOAST_CONFIG);
      },
    })
  }, 300);

  const menu = (
    <Menu>
      <Menu.Item key="2" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
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
          <Menu.Item key="/dashboard" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="apps" icon={<AppstoreOutlined />}>
            Apps
          </Menu.Item>
          <Menu.Item key="messages" icon={<MailOutlined />}>
            Messages
            <Badge count={5} offset={[8, 0]} />
          </Menu.Item>
          <Menu.SubMenu key="/dashboard/product" icon={<MergeCellsOutlined />} title="Product" onTitleClick={handleMenuClick}>
            <Menu.Item key="/dashboard/product/categories" icon={<UnorderedListOutlined />}>
              Categories
            </Menu.Item>
            <Menu.Item key="woodTypes" icon={<RadarChartOutlined />}>
              WoodTypes
            </Menu.Item>
            <Menu.Item key="adhesives" icon={<HighlightOutlined />}>
              Adhesives
            </Menu.Item>
            <Menu.Item key="thicknesses" icon={<ColumnHeightOutlined />}>
              Thicknesses
            </Menu.Item>
            <Menu.Item key="sizes" icon={<FontSizeOutlined />}>
              Sizes
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key="settings" icon={<SettingOutlined />} title="Settings">
            <Menu.Item key="general">General</Menu.Item>
            <Menu.Item key="privacy">Privacy</Menu.Item>
            <Menu.Item key="notifications">Notifications</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Header
          className='flex items-center justify-between'
          style={{
            background: '#fff',
            padding: 0,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search..."
            className='h-10 w-64 ml-10'
          />
          <Row className='flex items-center'>
            <SwitchLanguage />
            <Dropdown overlay={menu} className='mr-10 ml-5'>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <Avatar className='flex items-center justify-center' icon={<UserOutlined />} />
                <span style={{ marginLeft: 8 }}>{userInfos?.fullName}</span>
              </div>
            </Dropdown>
          </Row>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: '#fff',
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default memo(Dashboard);
