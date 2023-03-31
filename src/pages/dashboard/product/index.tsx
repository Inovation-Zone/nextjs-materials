/* eslint-disable react/no-danger-with-children */
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { Breadcrumb, Button, Card, Checkbox, Col, Empty, Input, Popconfirm, Row, Skeleton, Space, Tag, Typography } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import useGetCategories from '@/hooks/categories/useGetCategories';
import useDeleteProduct from '@/hooks/product/useDeleteProduct';
import useGetProducts from '@/hooks/product/useGetProducts';
import useDebounce from '@/hooks/useDebounce';
import { useTranslate } from '@/hooks/useTranslate';

import { TOAST_CONFIG } from '@/configs/toast';
import { DEFAULT_IMAGE } from '@/constants';
import { Category } from '@/models/categories.model';
import { Product } from '@/models/products.model';
import { Params } from '@/models/response.model';

const Product: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [params, setPrams] = useState<Params | undefined>();
  const { data: categories = [], isLoading } = useGetCategories();
  const { data: products = [], isLoading: isLoadingProducts, refetch } = useGetProducts(params);
  const { mutate: deleteProductMutate, isLoading: isLoadingUpdateProduct } = useDeleteProduct();
  const translate = useTranslate();
  const router = useRouter();

  const indeterminate = selectedCategories.length > 0 && selectedCategories.length < categories.length;
  const selectAllChecked = selectedCategories.length === categories.length;

  useEffect(() => {
    refetch();
  }, [params]);

  const handleCategoryChange = (checkedValues: string[]) => {
    setPrams({ ...params, categoryIds: checkedValues.join(',') });
    setSelectedCategories(checkedValues);
  };

  const handleSelectAll = (e: any) => {
    if (e.target.checked) {
      const categoryIds = categories.map((category: Category) => category.id);
      setSelectedCategories(categoryIds);
      setPrams({ ...params, categoryIds: '' });
    } else {
      setSelectedCategories([]);
    }
  };

  const handleAddProduct = () => {
    router.push('/dashboard/product/add');
  }

  const handleEditProduct = (product: Product) => {
    router.push(`/dashboard/product/edit?productId=${product.id}`);
  }

  const handleDeleteProduct = (product: Product) => {
    deleteProductMutate({ id: product?.id || '' },
      {
        onSuccess: () => {
          toast.success('Item successfully deleted.', TOAST_CONFIG);
          refetch();
        },
        onError: () => {
          toast.error('Failed to delete item. Please try again later.', TOAST_CONFIG);
        },
      }
    );
  }

  const handleSearchProduct = useDebounce((event: any) => {
    setPrams({ searchKeys: encodeURIComponent(event?.target?.value) });
    // router.push(`/dashboard/product?search=${}`);
  }, 300);

  return (
    <Space direction="vertical" size="middle" className='flex'>
      <Breadcrumb>
        <Breadcrumb.Item>{translate.home.title}</Breadcrumb.Item>
        <Breadcrumb.Item>{translate.products.title}</Breadcrumb.Item>
      </Breadcrumb>
      <Typography.Title level={2}>{translate.products.title}</Typography.Title>
      <Row gutter={[16, 16]} className='h-full'>
        <Col span={6}>
          <Col className='border h-full'>
            <Row className='h-[70px] flex items-center ml-4'>
              <Typography.Title level={5}>{translate.common.filter}</Typography.Title>
            </Row>
            <Row className='w-full h-[1px] bg-gray-200'></Row>
            <Checkbox
              indeterminate={indeterminate}
              checked={selectAllChecked}
              onChange={handleSelectAll}
              className='ml-4 mt-4 font-bold'
            >
              {translate.common.all}
            </Checkbox>
            <Row className='flex flex-col ml-4'>
              <Checkbox.Group
                value={selectedCategories}
                className='flex flex-col'
                onChange={handleCategoryChange}
              >
                {categories.map((category: Category) => (
                  <Checkbox className='mt-4' key={category.id} value={category.id}>
                    {category.name}
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </Row>
          </Col>
        </Col>
        <Col span={18}>
          <Row className='border h-16 flex items-center justify-between pl-6 pr-6'>
            <Input
              prefix={<SearchOutlined />}
              placeholder={`${translate.common.search}...`}
              className='h-8 w-64'
              onChange={handleSearchProduct}
            />
            <Button
              type="primary"
              className='flex items-center justify-center h-8'
              onClick={handleAddProduct}
              icon={<PlusOutlined />}>
              {translate.common.createBtn}
            </Button>
          </Row>
          {isLoadingProducts && <Skeleton className='mt-4' active />}
          <Row className={`border h-full mt-4 p-4 ${products.length ? 'grid grid-cols-3 gap-4' : 'flex items-center justify-center'}`}>
            {!products.length && <Empty description={false} />}
            {products.map((item: Product, index: number) => {
              const { fileResources = [] } = item;
              return (
                <Col key={index}>
                  <Card
                    cover={<img src={fileResources.length ? fileResources[0].fileUrl : DEFAULT_IMAGE} alt="product" className='object-cover h-48' />}
                    hoverable
                    className='h-[450px]'
                  >
                    <Tag color="green">{item?.category?.name}</Tag>
                    <Col className='h-[150px]'>
                      <Typography.Title level={5} className="overflow-ellipsis overflow-hidden h-16">{item.name}</Typography.Title>
                      <Typography className='mb-4 h-[80px]' dangerouslySetInnerHTML={{ __html: item.description.length > 100 ? item.description.substring(0, 80) + '...' : item.description }}>{ }</Typography>
                    </Col>
                    <Col>
                      <Row className='w-full flex items-center justify-between mt-4'>
                        <Button
                          type="primary"
                          icon={<EditOutlined />}
                          className='w-[45%] flex items-center justify-center'
                          onClick={() => handleEditProduct(item)}>
                          {translate.products.viewDetailBtn}
                        </Button>
                        <Popconfirm
                          title="Do you want to delete this item?"
                          onConfirm={() => handleDeleteProduct(item)}
                        >
                          <Button
                            type='default'
                            icon={<DeleteOutlined />}
                            danger
                            className='w-[45%] flex items-center justify-center'>
                            {translate.products.delete}
                          </Button>
                        </Popconfirm>
                      </Row>
                    </Col>
                  </Card>
                </Col>
              )
            })}
          </Row>

        </Col>
      </Row>
    </Space>
  )
};

export default Product;
