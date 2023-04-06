import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Form, Input, List, Modal, Row, Space, Typography } from 'antd';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import useCreateCatalogGroup from '@/hooks/catalogs/useCreateCatalogGroup';
import useDeleteCatalogGroup from '@/hooks/catalogs/useDeleteCatalogGroup';
import useGetCatalogGroups from '@/hooks/catalogs/useGetCatalogGroups';
import useUpdateCatalogGroup from '@/hooks/catalogs/useUpdateCatalogGroup';
import { useLanguage, useTranslate } from '@/hooks/useTranslate';

import { TOAST_CONFIG } from '@/configs/toast';
import { Group } from '@/models/catalogs.model';
import { ActionType } from '@/pages/dashboard/product/categories';

const { confirm } = Modal;

const App = (): JSX.Element => {
  const [form] = Form.useForm<Group>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isAction, setIsAction] = useState<ActionType>('add');
  const [catalogGroupSelected, setCatalogGroupSelected] = useState<Group>();

  const { data: catalogGroups = [], refetch, isLoading: isLoadingList } = useGetCatalogGroups();
  const { mutate: createMutate, isLoading: isCreateLoading } = useCreateCatalogGroup();
  const { mutate: updateMutate, isLoading: isUpdateLoading } = useUpdateCatalogGroup();
  const { mutate: deleteMutate, isLoading: isDeleteLoading } = useDeleteCatalogGroup();

  const translate = useTranslate();
  const { value } = useLanguage();

  const handleAddCatalogGroup = (): void => {
    setModalVisible(true);
  };

  const handleCreateCatalogGroup = (): void => {
    form.validateFields().then(values => {
      if (isAction === 'add') {
        createMutate({
          vi_name: values.vi_name,
          en_name: values.en_name
        },
          {
            onSuccess: () => {
              toast.success(translate.messageToast.form.success.add, TOAST_CONFIG);
              setModalVisible(false);
              form.resetFields();
              refetch();
            },
            onError: () => {
              toast.error(translate.messageToast.form.failed.add, TOAST_CONFIG);
            },
          }
        );
      } else {
        updateMutate({
          id: catalogGroupSelected?.id,
          vi_name: values.vi_name,
          en_name: values.en_name
        },
          {
            onSuccess: () => {
              toast.success(translate.messageToast.form.success.update, TOAST_CONFIG);
              setModalVisible(false);
              form.resetFields();
              refetch();
            },
            onError: () => {
              toast.error(translate.messageToast.form.failed.update, TOAST_CONFIG);
            },
          }
        );
      }
    });
  };

  const handleEditCatalogGroup = (catalogGroup: Group): void => {
    setIsAction('edit');
    setModalVisible(true);
    setCatalogGroupSelected(catalogGroup)
    form.setFieldsValue(catalogGroup);
  };

  const handleDeleteCatalogGroup = (catalogGroup: Group): void => {
    confirm({
      content: <Typography className='font-bold'>
        {translate.common.confirmDelete(catalogGroup?.[`${value}_name` as keyof Group])}</Typography>,
      okText: translate.common.deleteBtn,
      okType: 'danger',
      cancelText: translate.common.cancelBtn,
      onOk() {
        deleteMutate(catalogGroup?.id || '',
          {
            onSuccess: () => {
              toast.success(translate.messageToast.form.success.delete, TOAST_CONFIG);
              refetch();
            },
            onError: () => {
              toast.error(translate.messageToast.form.failed.delete, TOAST_CONFIG);
            },
          })
      },
    });
  };

  return (
    <Space
      direction="vertical"
      size="middle"
      className='flex'>
      <Breadcrumb>
        <Breadcrumb.Item>{translate.home.title}</Breadcrumb.Item>
        <Breadcrumb.Item>{translate.catalog.title}</Breadcrumb.Item>
        <Breadcrumb.Item>{translate.catalog.group.title}</Breadcrumb.Item>
      </Breadcrumb>
      <Typography.Title level={2}>{translate.catalog.group.title}</Typography.Title>
      <Row className='flex flex-row-reverse'>
        <Button
          type="primary"
          className='flex items-center justify-center'
          onClick={handleAddCatalogGroup}
          icon={<PlusOutlined />}>
          {translate.common.createBtn}
        </Button>
      </Row>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 4,
          xxl: 4,
        }}
        loading={isLoadingList}
        dataSource={catalogGroups as Group[]}
        renderItem={(item) => (
          <List.Item style={{ maxWidth: 360 }}>
            <Card title={item[`${value}_name` as keyof Group]}>
              <Row className='gap-2 flex items-center justify-center'>
                <Button
                  onClick={() => handleEditCatalogGroup(item)}
                  icon={<EditOutlined />}
                  className="flex items-center justify-center"
                >
                  {translate.common.editBtn}
                </Button>
                <Button
                  danger
                  className='flex items-center justify-center'
                  onClick={() => handleDeleteCatalogGroup(item)}
                  icon={<DeleteOutlined />}
                >
                  {translate.common.deleteBtn}
                </Button>
              </Row>
            </Card>
          </List.Item>
        )}
      />
      <Modal
        title={isAction === 'add' ? translate.catalog.group.add : translate.catalog.group.edit}
        open={modalVisible}
        confirmLoading={isCreateLoading || isUpdateLoading}
        onOk={handleCreateCatalogGroup}
        okText={translate.common.saveBtn}
        cancelText={translate.common.cancelBtn}
        onCancel={() => {
          form.resetFields();
          setModalVisible(false);
        }}
      >
        <Form
          form={form}
          layout='vertical'>
          <Form.Item
            name="vi_name"
            label={`${translate.common.name} (Vietnamese)`}
            rules={[{ required: true, message: translate.common.form.required }]}>
            <Input
              className="block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </Form.Item>
          <Form.Item
            name="en_name"
            label={`${translate.common.name} (English)`}
            rules={[{ required: true, message: translate.common.form.required }]}>
            <Input
              className="block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
};
export default App;

