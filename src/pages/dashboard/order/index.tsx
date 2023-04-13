import { Breadcrumb, Button, Row, Space, Tag, Typography } from 'antd';
import { Table } from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React from 'react';

import useGetCustomerOrders from '@/hooks/customerOrders/useGetCustomerOrders';
import { useTranslate } from '@/hooks/useTranslate';

interface TagColor {
  new: string;
  process: string;
  done: string;
  closed: string;
}

const App = (): JSX.Element => {
  const translate = useTranslate();
  const router = useRouter();

  const { data } = useGetCustomerOrders();

  const tagColor: TagColor = {
    'new': 'success',
    'process': 'orange',
    'done': 'blue',
    'closed': 'gray'
  }

  const statusFormat = {
    new: translate.order.statusLabel.new,
    process: translate.order.statusLabel.process,
    done: translate.order.statusLabel.done,
    closed: translate.order.statusLabel.closed,
  }

  const columns = [
    {
      title: translate.order.code,
      dataIndex: 'code',
      key: 'code',
      width: '10%'
    },
    {
      title: translate.order.createdTime,
      dataIndex: 'createdTime',
      key: 'createdTime',
      width: '20%',
      render: (text: string, record: any) => (
        <Typography>{dayjs(record.createdAt).format('hh:mm A - DD-MM-YYYY')}</Typography>
      )
    },
    {
      title: translate.common.fullName,
      dataIndex: 'fullName',
      width: '30%',
      key: 'fullName',
    },
    {
      title: translate.common.phone,
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: '20%'
    },
    {
      title: translate.order.status,
      dataIndex: 'status',
      key: 'status',
      width: '10%',
      onFilter: (value: string, record: any) => record.status.startsWith(value),
      filterSearch: true,
      render: (status: string) => {
        return (
          <Tag
            color={tagColor?.[status as keyof TagColor]}
            className='uppercase'>
            {statusFormat?.[status as keyof TagColor]}
          </Tag>
        )
      },
    },
    {
      title: translate.common.actions,
      key: 'action',
      width: '10%',
      render: (text: string, record: any) => (
        <Button onClick={() => router.push(`/dashboard/order/details?id=${record.id}`)}>
          {translate.common.detail}
        </Button>
      ),
    },
  ];

  return (
    <Space
      direction="vertical"
      size="middle"
      className='flex'>
      <Breadcrumb>
        <Breadcrumb.Item>{translate.home.title}</Breadcrumb.Item>
        <Breadcrumb.Item>{translate.order.title}</Breadcrumb.Item>
      </Breadcrumb>
      <Typography.Title level={2}>{translate.order.title}</Typography.Title>
      <Row className='flex flex-row-reverse'>
        {/* <Button
          type="primary"
          className='flex items-center justify-center'
          onClick={handleAddCatalogGroup}
          icon={<PlusOutlined />}>
          {translate.common.createBtn}
        </Button> */}
      </Row>
      <Table
        columns={columns as any}
        dataSource={data} />
    </Space>
  );
};
export default App;

