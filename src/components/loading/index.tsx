import { LoadingOutlined } from '@ant-design/icons';
import { Row, Spin } from 'antd';
import React from 'react';

const antIcon = <LoadingOutlined
  style={{ fontSize: 32 }}
  spin />;

const Loading: React.FC = () => <Row className='w-full items-center justify-center'><Spin indicator={antIcon} /></Row>;

export default Loading;