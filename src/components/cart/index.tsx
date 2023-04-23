import { DeleteOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, InputNumber, Result, Row, Steps, Table, Typography } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import useCreateCustomerOrder from '@/hooks/customerOrders/useCreateCustomerOrder';
import { useLanguage, useTranslate } from '@/hooks/useTranslate';

import Footer from '@/components/footer';
import Header from '@/components/header';

import { TOAST_CONFIG } from '@/configs/toast';
import { DEFAULT_IMAGE } from '@/constants';
import { CustomerOrderBody, OrderProduct } from '@/models/customerOrder.model';
import { Adhesive, Product, Size, Thickness, WoodType } from '@/models/products.model';
import { generateOrderCode } from '@/utils/string';

export interface CartItem {
  key?: number;
  product: Product;
  woodType: WoodType;
  adhesive: Adhesive;
  thickness: Thickness;
  size: Size;
  quantity: number;
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  phoneNumber: string;
  contactAddress: string;
  note: string;
}

const Order = () => {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [carts, setCarts] = useState<CartItem[]>([]);
  const translate = useTranslate();
  const { value } = useLanguage();
  const { mutate: createCustomerOrderMutate, isLoading } = useCreateCustomerOrder();

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage?.getItem('productOrders')) {
      const productOrders = JSON.parse(localStorage.getItem('productOrders') || '');
      const productOrdersTemp = productOrders.map((item: OrderProduct, index: number) => {
        return {
          key: index,
          ...item
        }
      })
      setCarts(productOrdersTemp);
    }
  }, []);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleQuantityChange = (value: number | null, record: CartItem) => {
    setCarts(prevState => {
      const itemIndex = prevState.findIndex((item) => item.key === record.key);
      const updatedItem = { ...prevState[itemIndex], quantity: value || 1 };
      const newData = [...prevState.slice(0, itemIndex), updatedItem, ...prevState.slice(itemIndex + 1)];
      localStorage.setItem('productOrders', JSON.stringify(newData));
      return newData;
    });
  };

  const clearCart = () => {
    setCarts([]);
    localStorage.setItem('productOrders', JSON.stringify([]));
  };

  const handleDelete = (record: CartItem) => {
    let productOrders: CartItem[] = [];
    if (localStorage.getItem('productOrders')) {
      productOrders = JSON.parse(localStorage.getItem('productOrders') || '');
    }

    productOrders.forEach((item: CartItem, index: number) => {
      const productOrdersNew = [...productOrders];
      productOrdersNew.splice(index, 1);
      setCarts(productOrdersNew);
      localStorage.setItem('productOrders', JSON.stringify(productOrdersNew));
    })
  }

  const columns = [
    {
      title: translate.common.image,
      dataIndex: 'image',
      key: 'image',
      width: '10%',
      render: (text: number, record: CartItem) => (
        <img
          className='h-16 w-16 rounded-md'
          src={record.product.fileResources?.length ? record.product.fileResources[0].fileUrl : DEFAULT_IMAGE} />
      ),
    },
    {
      title: translate.common.name,
      dataIndex: 'product',
      key: 'product',
      width: '30%',
      render: (text: number, record: CartItem) => (
        <Typography>{record.product?.[`${value}_name` as keyof Product] as string}</Typography>
      ),
    },
    {
      title: translate.common.description,
      dataIndex: 'description',
      key: 'description',
      width: '30%',
      render: (text: number, record: CartItem) => (
        <Row className='gap-2'>
          {record?.woodType ? (
            <Row className='w-full'>
              <Col
                lg={8}>{translate.woodTypes.name}:</Col>
              <Col lg={16}>{record?.woodType?.[`${value}_name` as keyof WoodType]}</Col>
            </Row>
          ) : undefined}
          {record?.adhesive ? (
            <Row className='w-full'>
              <Col lg={8}>{translate.adhesives.name}:</Col>
              <Col lg={16}>{record?.adhesive?.name}</Col>
            </Row>
          ) : undefined}
          {record?.thickness ? (
            <Row className='w-full'>
              <Col lg={8}>{translate.thicknesses.name}:</Col>
              <Col lg={16}>{record?.thickness?.name} mm</Col>
            </Row>
          ) : undefined}
          {record?.size ? (
            <Row className='w-full'>
              <Col lg={8}>{translate.sizes.name}:</Col>
              <Col lg={16}>[{record?.size?.name}]</Col>
            </Row>
          ) : undefined}
        </Row>
      ),
    },
    {
      title: translate.common.quantity,
      dataIndex: 'quantity',
      key: 'quantity',
      width: '20%',
      render: (text: number, record: CartItem) => (
        <InputNumber
          min={1}
          max={10}
          type='number'
          defaultValue={text}
          onChange={(value) => handleQuantityChange(value, record)}
        />
      ),
    },
    {
      title: translate.common.actions,
      key: 'actions',
      width: '10%',
      render: (text: string, record: CartItem) => (
        <Button
          type="primary"
          danger
          className='flex items-center justify-center'
          onClick={() => handleDelete(record)}
          icon={<DeleteOutlined />}>
          {translate.common.deleteBtn}
        </Button>
      ),
    },
  ];

  const onFinish = (values: CustomerInfo) => {
    const cartIds = carts.map((item) => {
      return {
        productId: item?.product?.id,
        woodTypeId: item?.woodType?.value,
        adhesiveId: item?.adhesive?.value,
        thicknessId: item?.thickness?.value,
        sizeId: item?.size?.value,
        quantity: item?.quantity,
      }
    })
    const data: CustomerOrderBody = {
      ...values,
      code: generateOrderCode(),
      carts: cartIds as any,
      status: 'new'
    }

    createCustomerOrderMutate(data,
      {
        onSuccess: () => {
          // toast.success(translate.messageToast.order.success.createOrder, TOAST_CONFIG);
          next();
          localStorage.setItem('productOrders', JSON.stringify([]));
        },
        onError: () => {
          toast.error(translate.messageToast.order.failed.createOrder, TOAST_CONFIG);
        },
      });
  };

  const steps = [
    {
      title: (
        <Row className='h-8 font-bold flex items-center justify-center'>
          <Typography className='text-[16px]'>{translate.cart.orders}</Typography>
        </Row>
      ),
      content: (
        <>
          <Table
            className='lg:mt-12 md:mt-8 sm:mt-4 sm:w-full'
            dataSource={carts}
            columns={columns}
            pagination={false}
            scroll={{ x: 800 }}
            footer={() => (
              <>

              </>
            )}
          />
          {carts.length ? (
            <div className='flex justify-end mt-4 gap-4'>
              <Button onClick={clearCart}>{translate.cart.clearCart}</Button>
              <Button
                type="primary"
                onClick={next}
              >
                {translate.common.continue}
              </Button>
            </div>
          ) : undefined}
        </>
      ),
    },
    {
      title: (
        <Row className='h-8 font-bold flex items-center justify-center'>
          <Typography className='text-[16px]'>{translate.cart.customerInfo}</Typography>
        </Row>
      ),
      content: (
        <>
          <Form
            name="order-form"
            layout='vertical'
            onFinish={onFinish}
            className="bg-white p-8"
          >
            <Form.Item
              label={<Typography className='font-bold'>{translate.common.fullName}</Typography>}
              name="fullName"
              rules={[{ required: true, message: translate.common.form.required }]}
            >
              <Input className='rounded-md' />
            </Form.Item>

            <Form.Item
              label={<Typography className='font-bold'>{translate.common.email}</Typography>}
              name="email"
              rules={[{ required: true, message: translate.common.form.required }]}
            >
              <Input
                type="email"
                className='rounded-md' />
            </Form.Item>

            <Form.Item
              label={<Typography className='font-bold'>{translate.common.phone}</Typography>}
              name="phoneNumber"
              rules={[{ required: true, message: translate.common.form.required }]}
            >
              <Input
                type='number'
                className='rounded-md' />
            </Form.Item>

            <Form.Item
              label={<Typography className='font-bold'>{translate.common.contactAddress}</Typography>}
              name="contactAddress"
              rules={[{ required: true, message: translate.common.form.required }]}
            >
              <Input.TextArea
                rows={4}
                className='rounded-md' />
            </Form.Item>

            <Form.Item
              label={<Typography className='font-bold'>{translate.common.note}</Typography>}
              name="note"
            >
              <Input.TextArea
                rows={4}
                className='rounded-md' />
            </Form.Item>

            <div className='flex justify-end mt-4 gap-4'>
              <Button onClick={prev}>{translate.common.back}</Button>
              <Button
                type="primary"
                htmlType='submit'
                loading={isLoading}
              >
                {translate.common.continue}
              </Button>
            </div>
          </Form>
        </>
      ),
    },
    {
      title: (
        <Row className='h-8 font-bold flex items-center justify-center'>
          <Typography className='text-[16px]'>{translate.cart.done}</Typography>
        </Row>
      ),
      content: (
        <Result
          status="success"
          title={translate.cart.result.title}
          subTitle={translate.cart.result.description}
          extra={[
            <Button
              type="primary"
              key="console"
              onClick={() => router.push('/')}
            >
              {translate.common.backToHome}
            </Button>,
            <Button
              key="buy"
              onClick={() => router.push('/')}>{translate.common.buyMore}</Button>,
          ]}
        />
      ),
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <div className='bg-white'>
      <Head>
        <title>Gỗ Việt Thái</title>
        <meta
          name='description'
          content='Gỗ Việt Thái description' />
        <link
          rel='icon'
          href='/favicon.ico' />
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/antd/dist/antd.min.css' />
        <link
          href='https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css'
          rel='stylesheet' />
      </Head>
      <Header showSlider={false} />
      <div className='lg:px-12 lg:py-10 md:px-4 md:py-12 sm:px-2 py-4'>
        <h1>{translate.cart.title}</h1>
        <Steps
          className='lg:px-12 lg:mt-12 md:px-12 sm:px-2 sm:mt-8'
          current={current}
          items={items} />
        <div>{steps[current].content}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Order;
