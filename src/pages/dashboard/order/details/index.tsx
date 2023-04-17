import { Badge, Breadcrumb, Button, Col, Row, Select, Space, Table, Tag, Typography } from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { toast } from 'react-toastify';

import useGetCustomerOrderDetails from '@/hooks/customerOrders/useGetCustomerOrderDetails';
import useUpdateCustomerOrder from '@/hooks/customerOrders/useUpdateCustomerOrder';
import { useLanguage, useTranslate } from '@/hooks/useTranslate';

import { TOAST_CONFIG } from '@/configs/toast';
import { OrderProduct, TagColor } from '@/models/customerOrder.model';
import { Product, WoodType } from '@/models/products.model';

const { Title } = Typography;
const { Option } = Select;

function OrderInfoPage() {
  const router = useRouter();
  const translate = useTranslate();
  const { value } = useLanguage();
  const { id = '' } = router.query;
  const { data, refetch } = useGetCustomerOrderDetails(id as string);
  const { mutate: updateCustomerOrderMutate } = useUpdateCustomerOrder();

  const tagColor: TagColor = {
    new: 'green',
    process: 'orange',
    done: 'blue',
    closed: 'gray'
  }

  const statusDefines = [
    'new',
    'process',
    'done',
    'closed'
  ]

  const statusFormat = {
    new: translate.order.statusLabel.new,
    process: translate.order.statusLabel.process,
    done: translate.order.statusLabel.done,
    closed: translate.order.statusLabel.closed,
  }

  const handleOnChangeStatus = (status: string) => {
    updateCustomerOrderMutate({ id: data?.id as string, status },
      {
        onSuccess: () => {
          refetch();
          toast.success(translate.messageToast.order.success.changeStatus, TOAST_CONFIG);
        },
        onError: () => {
          toast.error(translate.messageToast.order.success.changeStatus, TOAST_CONFIG);
        },
      }
    );
  }

  const dataSource = useMemo(() => {
    return data?.orderProducts.length && data.orderProducts.map((item: OrderProduct) => {
      return {
        name: item.product?.[`${value}_name` as keyof Product],
        woodType: item?.woodType?.[`${value}_name` as keyof WoodType],
        adhesive: item?.adhesive?.name,
        thickness: item?.thickness && `${item?.thickness?.value} mm`,
        size: item?.size && `${item?.size?.width} x ${item?.size?.height}`,
        quantity: item?.quantity
      }
    })
  }, [data]);
  const columns = [
    {
      title: translate.common.name,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: translate.woodTypes.name,
      dataIndex: 'woodType',
      key: 'woodType',
    },
    {
      title: translate.adhesives.name,
      dataIndex: 'adhesive',
      key: 'adhesive',
    },
    {
      title: translate.thicknesses.name,
      dataIndex: 'thickness',
      key: 'thickness',
    },
    {
      title: translate.sizes.name,
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: translate.common.quantity,
      dataIndex: 'quantity',
      key: 'quantity',
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
        <Breadcrumb.Item>{translate.order.detail.title}</Breadcrumb.Item>
      </Breadcrumb>
      <Typography.Title level={2}>{translate.order.detail.title}</Typography.Title>
      <Row className='flex items-center justify-between'>
        <Col>
          <Row className='flex items-center'>
            {translate.order.code}:
            <Typography.Title
              level={4}
              className='mt-3 ml-2'>
              <Tag
                color='blue'
                className='text-lg font-bold'>{data?.code}
              </Tag>
            </Typography.Title>

          </Row>
          <Row>
            <Typography className='flex'>
              {translate.order.createdTime}:
              <Typography className='ml-2 font-bold'>
                {dayjs(data?.createdAt).format('hh:mm A DD-MM-YYYY')}
              </Typography>
            </Typography>
          </Row>
        </Col>
        <Col>
          <Select
            value={data?.status}
            className='w-[200px]'
            size='large'
            onChange={handleOnChangeStatus}>
            {statusDefines.map((item: string) => (
              <Option
                value={item}
                key={item}>
                <Badge
                  color={tagColor?.[item as keyof TagColor]}
                  className='capitalize'
                  text={statusFormat?.[item as keyof TagColor]}
                />
              </Option>
            ))}
          </Select>
          <Typography className='text-[12px]'>
            {translate.order.clickToChangeStatus}
          </Typography>
        </Col>
      </Row>
      <Col
        xs={24}
        sm={12}
        className='rounded-sm border p-4 mt-12'>
        <Title level={5}>{translate.order.customerInfo}</Title>
        <div className='w-full h-[1px] bg-gray-200 mb-4'></div>
        <div className='flex flex-col gap-1'>
          <Row>
            <Col span={8}><Typography>{translate.common.fullName}:</Typography></Col>
            <Col span={8}>{data?.fullName}</Col>
          </Row>
          <Row>
            <Col span={8}><Typography>{translate.common.email}:</Typography></Col>
            <Col span={8}>{data?.email}</Col>
          </Row>
          <Row>
            <Col span={8}><Typography>{translate.common.phone}:</Typography></Col>
            <Col span={8}>{data?.phoneNumber}</Col>
          </Row>
          <Row>
            <Col span={8}><Typography>{translate.common.contactAddress}:</Typography></Col>
            <Col span={8}>{data?.contactAddress}</Col>
          </Row>
          <Row>
            <Col span={8}><Typography>{translate.common.note}:</Typography></Col>
            <Col span={8}>{data?.note}</Col>
          </Row>
        </div>

      </Col>
      <Col
        span={24}
        className='rounded-sm border p-4 mt-4'>
        <Title level={5}>{translate.order.details}</Title>
        <div className='w-full h-[1px] bg-gray-200 mb-4'></div>
        <Table
          dataSource={dataSource as any}
          columns={columns} />
      </Col>
      <Row className='flex flex-row-reverse mt-6'>
        <Button onClick={() => router.push('/dashboard/order')}>
          {translate.common.back}
        </Button>
      </Row>
    </Space>
  );
}

export default OrderInfoPage;
