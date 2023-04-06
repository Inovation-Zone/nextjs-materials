import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Col, Form, Input, Modal, Popconfirm, Row, Select, Space, Table, Typography } from 'antd';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

import useCreateCollection from '@/hooks/collections/useCreateCollection';
import useDeleteCollection from '@/hooks/collections/useDeleteCollection';
import useGetCollectionGroups from '@/hooks/collections/useGetCollectionGroups';
import useGetCollections from '@/hooks/collections/useGetCollections';
import useUpdateCollection from '@/hooks/collections/useUpdateCollection';
import { useLanguage, useTranslate } from '@/hooks/useTranslate';

import UploadImages from '@/components/uploadImages';

import { TOAST_CONFIG } from '@/configs/toast';
import { Collection, CollectionGroup } from '@/models/collections.model';
import { ActionType } from '@/pages/dashboard/product/categories';

const { Option } = Select;

const ComponentPage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isAction, setIsAction] = useState<ActionType>('add');
  const [collectionSelected, setCollectionSelected] = useState<Collection>();
  const translate = useTranslate();
  const { value } = useLanguage();
  const [form] = Form.useForm<Collection>();
  const uploadImagesRef = useRef<any>(null);
  const { data: collectionGroups = [], isLoading: isLoadingList } = useGetCollectionGroups();
  const { data: collections = [], refetch, isLoading: isLoadingCollectionList } = useGetCollections();
  const { mutate: createMutate, isLoading: isCreateLoading } = useCreateCollection();
  const { mutate: updateMutate, isLoading: isUpdateLoading } = useUpdateCollection();
  const { mutate: deleteMutate, isLoading: isDeleteLoading } = useDeleteCollection();

  const handleAddCollection = () => {
    setIsAction('add');
    setModalVisible(true);
  };

  const handleEdit = (record: Collection) => {
    setIsAction('edit');
    setModalVisible(true);
    setCollectionSelected(record);
    uploadImagesRef.current.setValues(record.fileUrls);
    form.setFieldsValue(record);
  };

  const handleDelete = (record: Collection) => {
    deleteMutate(record.id,
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

  const handleCreateCollection = () => {
    form.validateFields().then(values => {
      if (isAction === 'add') {
        createMutate({ ...values, fileUrls: uploadImagesRef.current.getValues() },
          {
            onSuccess: () => {
              toast.success(translate.messageToast.form.success.add, TOAST_CONFIG);
              setModalVisible(false);
              form.resetFields();
              uploadImagesRef.current.setValues([]);
              refetch();
            },
            onError: () => {
              toast.error(translate.messageToast.form.failed.add, TOAST_CONFIG);
            },
          })
      } else {
        updateMutate({ ...values, id: collectionSelected?.id || '', fileUrls: uploadImagesRef.current.getValues() },
          {
            onSuccess: () => {
              toast.success(translate.messageToast.form.success.update, TOAST_CONFIG);
              setModalVisible(false);
              form.resetFields();
              uploadImagesRef.current.setValues([]);
              refetch();
            },
            onError: () => {
              toast.error(translate.messageToast.form.failed.update, TOAST_CONFIG);
            },
          }
        );
      }
    });
  }

  const columns = [
    {
      title: translate.table.collection.name,
      dataIndex: 'name',
      key: 'name',
      width: '20%',
    },
    {
      title: translate.table.collection.group,
      dataIndex: 'collectionGroupId',
      key: 'collectionGroupId',
      width: '20%',
      render: (collectionGroupId: string) => {
        const cg: CollectionGroup | any = collectionGroups.find((item: CollectionGroup) => item.id === collectionGroupId);
        return (
          <Typography>{cg?.[`${value}_name` as keyof CollectionGroup]}</Typography>
        )
      },
    },
    {
      title: translate.table.collection.color,
      dataIndex: 'color',
      key: 'color',
      width: '10%',
    },
    {
      title: translate.table.collection.code,
      dataIndex: 'code',
      key: 'code',
      width: '10%',
    },
    {
      title: translate.table.collection.size,
      dataIndex: 'size',
      key: 'size',
      width: '10%',
    },
    {
      title: translate.table.collection.surface,
      dataIndex: 'surface',
      key: 'surface',
      width: '10%',
    },
    {
      title: translate.common.actions,
      key: 'actions',
      width: '10%',
      render: (text: string, record: Collection) => (
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
            description={translate.common.confirmDelete(record.name)}
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
        <Breadcrumb.Item>{translate.collection.title}</Breadcrumb.Item>
      </Breadcrumb>
      <Typography.Title level={2}>{translate.collection.title}</Typography.Title>
      <Row className='flex flex-row-reverse'>
        <Button
          type="primary"
          className='flex items-center justify-center'
          onClick={handleAddCollection}
          icon={<PlusOutlined />}>
          {translate.common.createBtn}
        </Button>
      </Row>
      <Table<Collection>
        columns={columns}
        loading={isLoadingCollectionList}
        dataSource={collections} />
      <Modal
        title={isAction === 'add' ? translate.collection.add : translate.collection.edit}
        open={modalVisible}
        confirmLoading={isCreateLoading || isUpdateLoading}
        onOk={handleCreateCollection}
        okText={translate.common.saveBtn}
        cancelText={translate.common.cancelBtn}
        onCancel={() => {
          form.resetFields();
          setModalVisible(false);
          uploadImagesRef.current.setValues([]);
        }}
      >
        <Form
          form={form}
          layout='vertical'>
          <Form.Item
            label={translate.table.collection.name}
            name="name"
            rules={[{ required: true, message: translate.common.form.required }]}
          >
            <Input
              className="block w-full rounded-md shadow-sm"
            />
          </Form.Item>
          <Row gutter={[12, 12]}>
            <Col span={12}>
              <Form.Item
                label={translate.table.collection.color}
                name="color"
                rules={[{ required: true, message: translate.common.form.required }]}
              >
                <Input
                  className="block w-full rounded-md shadow-sm"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={translate.table.collection.code}
                name="code"
                rules={[{ required: true, message: translate.common.form.required }]}
              >
                <Input
                  className="block w-full rounded-md shadow-sm"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[12, 12]}>
            <Col span={12}>
              <Form.Item
                label={translate.table.collection.size}
                name="size"
                rules={[{ required: true, message: translate.common.form.required }]}
              >
                <Input
                  className="block w-full rounded-md shadow-sm"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={translate.table.collection.surface}
                name="surface"
                rules={[{ required: true, message: translate.common.form.required }]}
              >
                <Input
                  className="block w-full rounded-md shadow-sm"
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label={translate.table.collection.group}
            name="collectionGroupId"
            rules={[{ required: true, message: translate.common.form.required }]}
          >
            <Select
              size='large'
              loading={isLoadingList}
            >
              {collectionGroups.map((item: CollectionGroup | any) => (
                <Option
                  key={item.id}
                  value={item.id}>
                  {item[`${value}_name` as keyof CollectionGroup]}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label={translate.collection.image}
            name="image"
          >
            <UploadImages
              name='file'
              ref={uploadImagesRef} />
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
};

export default ComponentPage;
