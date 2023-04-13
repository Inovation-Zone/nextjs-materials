import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Popconfirm, Row, Space, Table, Typography } from 'antd';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

import useDeleteCategory from '@/hooks/categories/useDeleteCategory';
import useGetCategories from '@/hooks/categories/useGetCategories';
import { useLanguage, useTranslate } from '@/hooks/useTranslate';

import Dialog from '@/components/dialog';
import CategoryForm from '@/components/forms/categories';

import { TOAST_CONFIG } from '@/configs/toast';
import { DEFAULT_IMAGE } from '@/constants';

interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export type ActionType = 'add' | 'edit';

const ComponentPage: React.FC = () => {
  const dialogRef = useRef<any>();
  const [isAction, setIsAction] = useState<ActionType>('add');
  const [categorySelected, setCategorySelected] = useState<Category>();
  const { data: categories, isLoading, refetch } = useGetCategories();
  const { mutate: deleteCategoryMutate } = useDeleteCategory();
  const translate = useTranslate();
  const { value } = useLanguage();

  const handleAddCategory = () => {
    setIsAction('add');
    dialogRef.current.open();
  };

  const handleEdit = (record: Category) => {
    setCategorySelected(record);
    setIsAction('edit');
    dialogRef.current.open();
  };

  const handleDelete = (record: Category) => {
    deleteCategoryMutate({ id: record.id },
      {
        onSuccess: () => {
          toast.success(translate.messageToast.form.success.delete, TOAST_CONFIG);
          refetch();
        },
        onError: () => {
          toast.error(translate.messageToast.form.failed.delete, TOAST_CONFIG);
        },
      }
    )
  };

  const columns = [
    {
      title: translate.common.name,
      dataIndex: `${value}_name`,
      key: `${value}_name`,
      width: '20%',
    },
    {
      title: translate.common.description,
      dataIndex: `${value}_description`,
      key: `${value}_description`,
      width: '50%',
    },
    {
      title: translate.common.thumbnail,
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      width: '20%',
      render: (text: string, record: Category) => {
        return <img
          srcSet={record.imageUrl ? record?.imageUrl : DEFAULT_IMAGE}
          className='w-16 h-16 border rounded-lg object-cover' />;
      },
    },
    {
      title: translate.common.actions,
      key: 'actions',
      width: '10%',
      render: (text: string, record: Category) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            className='flex items-center justify-center'
            onClick={() => handleEdit(record)}
          >
            {translate.common.editBtn}
          </Button>
          <Popconfirm
            title={translate.common.confirm}
            description={translate.common.confirmDelete(record?.[`${value}_name` as keyof Category])}
            onConfirm={() => handleDelete(record)}
            okText={translate.common.yes}
            cancelText={translate.common.no}
          >
            <Button
              type="primary"
              danger
              className='flex items-center justify-center'
              icon={<DeleteOutlined />}>
              {translate.common.deleteBtn}
            </Button>
          </Popconfirm>
        </Space>
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
        <Breadcrumb.Item>{translate.categories.title}</Breadcrumb.Item>
      </Breadcrumb>
      <Typography.Title level={2}>{translate.categories.title}</Typography.Title>
      <Row className='flex flex-row-reverse'>
        <Button
          type="primary"
          className='flex items-center justify-center'
          onClick={handleAddCategory}
          icon={<PlusOutlined />}>
          {translate.common.createBtn}
        </Button>
      </Row>
      <Table<Category>
        columns={columns}
        loading={isLoading}
        dataSource={categories} />
      <Dialog
        title={isAction === 'add' ? translate.categories.add : translate.categories.edit}
        width={700}
        ref={dialogRef}
      >
        <CategoryForm
          dialogRef={dialogRef}
          action={isAction}
          category={categorySelected}
          onSuccess={() => {
            refetch();
          }}
        />
      </Dialog>
    </Space>
  );
};

export default ComponentPage;
