import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Col, Form, Input, Modal, Popconfirm, Row, Select, Space, Table, Typography } from 'antd';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

import useCreateCatalog from '@/hooks/catalogs/useCreateCatalog';
import useDeleteCatalog from '@/hooks/catalogs/useDeleteCatalog';
import useGetCatalogGroups from '@/hooks/catalogs/useGetCatalogGroups';
import useGetCatalogs from '@/hooks/catalogs/useGetCatalogs';
import useUpdateCatalog from '@/hooks/catalogs/useUpdateCatalog';
import { useLanguage, useTranslate } from '@/hooks/useTranslate';

import UploadAttachment from '@/components/uploadAttachment';
import UploadFile from '@/components/uploadFile';

import { TOAST_CONFIG } from '@/configs/toast';
import { Group } from '@/models/catalogs.model';
import { Catalog } from '@/models/catalogs.model';
import { ActionType } from '@/pages/dashboard/product/categories';
const { Option } = Select;

const ComponentPage: React.FC = () => {
  const thumbnailFileRef = useRef<any>(null);
  const uploadFileViRef = useRef<any>(null);
  const uploadFileEnRef = useRef<any>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isAction, setIsAction] = useState<ActionType>('add');
  const [catalogSelected, setCatalogSelected] = useState<Catalog>();
  const translate = useTranslate();
  const { value } = useLanguage();
  const [form] = Form.useForm<Catalog>();

  const { data: catalogGroups = [], isLoading: isLoadingList } = useGetCatalogGroups();
  const { data: catalogs = [], refetch, isLoading: isLoadingCatalogList } = useGetCatalogs();
  const { mutate: createMutate, isLoading: isCreateLoading } = useCreateCatalog();
  const { mutate: updateMutate, isLoading: isUpdateLoading } = useUpdateCatalog();
  const { mutate: deleteMutate, isLoading: isDeleteLoading } = useDeleteCatalog();

  const handleAddCatalog = () => {
    setIsAction('add');
    setModalVisible(true);
  };

  const handleEdit = (record: Catalog) => {
    setIsAction('edit');
    setModalVisible(true);
    setCatalogSelected(record);
    form.setFieldsValue(record);
    uploadFileViRef.current.setValue(record.vi_fileUrl);
    uploadFileEnRef.current.setValue(record.en_fileUrl);
    thumbnailFileRef?.current?.setValue(record.thumbnailUrl);
  };

  const handleDelete = (record: Catalog) => {
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

  const handleCreateCatalog = () => {
    form.validateFields().then(values => {
      if (isAction === 'add') {
        createMutate({
          ...values,
          vi_fileUrl: uploadFileViRef.current.getValue(),
          en_fileUrl: uploadFileEnRef.current.getValue(),
          thumbnailUrl: thumbnailFileRef.current.getValue()
        },
          {
            onSuccess: () => {
              toast.success(translate.messageToast.form.success.add, TOAST_CONFIG);
              setModalVisible(false);
              uploadFileViRef.current.setValue(null);
              uploadFileEnRef.current.setValue(null);
              thumbnailFileRef.current.setValue(null);
              form.resetFields();
              refetch();
            },
            onError: () => {
              toast.error(translate.messageToast.form.failed.add, TOAST_CONFIG);
            },
          })
      } else {
        updateMutate({
          ...values,
          vi_fileUrl: uploadFileViRef.current.getValue(),
          en_fileUrl: uploadFileEnRef.current.getValue(),
          thumbnailUrl: thumbnailFileRef.current.getValue(),
          id: catalogSelected?.id || ''
        },
          {
            onSuccess: () => {
              toast.success(translate.messageToast.form.success.update, TOAST_CONFIG);
              setModalVisible(false);
              uploadFileViRef.current.setValue(null);
              uploadFileEnRef.current.setValue(null);
              thumbnailFileRef.current.setValue(null);
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
  }

  const columns = [
    {
      title: translate.table.catalog.viName,
      dataIndex: 'vi_name',
      key: 'vi_name',
      width: '30%',
    },
    {
      title: translate.table.catalog.enName,
      dataIndex: 'en_name',
      key: 'en_name',
      width: '30%',
    },
    {
      title: translate.table.catalog.group,
      dataIndex: 'groupId',
      key: 'groupId',
      width: '30%',
      render: (groupId: string) => {
        const cg: any = catalogGroups.find((item: Group) => item.id === groupId);
        return (
          <Typography>{cg?.[`${value}_name` as keyof Group]}</Typography>
        )
      },
    },
    {
      title: translate.common.actions,
      key: 'actions',
      width: '10%',
      render: (text: string, record: Catalog | any) => (
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
            description={translate.common.confirmDelete(record?.[`${value}_name`])}
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
        <Breadcrumb.Item>{translate.catalog.title}</Breadcrumb.Item>
      </Breadcrumb>
      <Typography.Title level={2}>{translate.catalog.title}</Typography.Title>
      <Row className='flex flex-row-reverse'>
        <Button
          type="primary"
          className='flex items-center justify-center'
          onClick={handleAddCatalog}
          icon={<PlusOutlined />}>
          {translate.common.createBtn}
        </Button>
      </Row>
      <Table<Catalog>
        columns={columns}
        loading={isLoadingCatalogList}
        dataSource={catalogs} />
      <Modal
        title={isAction === 'add' ? translate.catalog.add : translate.catalog.edit}
        open={modalVisible}
        confirmLoading={isCreateLoading || isUpdateLoading}
        onOk={handleCreateCatalog}
        okText={translate.common.saveBtn}
        cancelText={translate.common.cancelBtn}
        onCancel={() => {
          form.resetFields();
          setModalVisible(false);
          uploadFileViRef.current.setValue(null);
          uploadFileEnRef.current.setValue(null);
          thumbnailFileRef.current.setValue(null);
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

          <Form.Item
            label={translate.table.catalog.group}
            name="groupId"
            rules={[{ required: true, message: translate.common.form.required }]}
          >
            <Select
              size='large'
              loading={isLoadingList}
            >
              {catalogGroups.map((item: Group | any) => (
                <Option
                  key={item.id}
                  value={item.id}>
                  {item[`${value}_name` as keyof Group]}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Col span={8}>
            <Form.Item
              label={translate.catalog.thumbnail}>
              <UploadFile
                name="imageUrl"
                ref={thumbnailFileRef}
                heightPreview='170px'
              />
            </Form.Item>
          </Col>
          <Form.Item
            label={`${translate.catalog.targetFile} (Vietnamese)`}>
            <UploadAttachment
              name="imageUrl"
              ref={uploadFileViRef}
            />
          </Form.Item>
          <Form.Item
            label={`${translate.catalog.targetFile} (English)`}>
            <UploadAttachment
              name="imageUrl"
              ref={uploadFileEnRef}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
};

export default ComponentPage;
