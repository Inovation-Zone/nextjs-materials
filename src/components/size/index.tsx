import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Tag, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import useCreateSize from '@/hooks/sizes/useCreateSize';
import useDeleteSize from '@/hooks/sizes/useDeleteSize';
import useGetSizes from '@/hooks/sizes/useGetSizes';
import useUpdateSize from '@/hooks/sizes/useUpdateSize';
import { useLanguage, useTranslate } from '@/hooks/useTranslate';

import { TOAST_CONFIG } from '@/configs/toast';
import { Size } from '@/models/products.model';
import { ActionType } from '@/pages/dashboard/product/categories';

function Size() {
  const [tags, setTags] = useState<Array<Size>>([]);
  const [isAction, setIsAction] = useState<ActionType>('add');
  const [sizeSelected, setSizeSelected] = useState<Size | null>(null);
  const translate = useTranslate();
  const { value } = useLanguage();
  const [visible, setVisible] = useState(false);

  const { data: sizes = [], refetch } = useGetSizes();
  const { mutate: createSizeMutate, isLoading: isCreateSizeLoading } = useCreateSize();
  const { mutate: deleteSizeMutate, isLoading: isDeleteSizeLoading } = useDeleteSize();
  const { mutate: updateSizeMutate, isLoading: isUpdateSizeLoading } = useUpdateSize();

  useEffect(() => {
    setTags(sizes);
  }, [sizes]);

  const [form] = Form.useForm<Size>();

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = (values: Size) => {
    const data = {
      width: values.width,
      height: values.height
    }

    if (isAction === 'add') {
      createSizeMutate(data,
        {
          onSuccess: () => {
            refetch();
            toast.success(translate.messageToast.form.success.add, TOAST_CONFIG);
            form.setFieldValue('width', null);
            form.setFieldValue('height', null);
            setVisible(false);
          },
          onError: () => {
            toast.error(translate.messageToast.form.failed.add, TOAST_CONFIG);
          },
        }
      );
    } else {
      updateSizeMutate({ ...data, id: sizeSelected?.id },
        {
          onSuccess: () => {
            refetch();
            toast.success(translate.messageToast.form.success.update, TOAST_CONFIG);
            form.setFieldValue('width', null);
            form.setFieldValue('height', null);
            setVisible(false);
          },
          onError: () => {
            toast.error(translate.messageToast.form.failed.update, TOAST_CONFIG);
          },
        }
      );
    }
  };

  const validateFields = async (rule: any, value: any) => {
    if (!value) {
      throw new Error(translate.common.form.required);
    }
    if (isNaN(value)) {
      throw new Error(translate.common.form.required);
    }
  };

  const handleDeleteSize = (size: Size) => {
    deleteSizeMutate(size,
      {
        onSuccess: () => {
          refetch();
          toast.success(translate.messageToast.form.success.delete, TOAST_CONFIG);
        },
        onError: () => {
          toast.error(translate.messageToast.form.failed.delete, TOAST_CONFIG);
        },
      }
    )
  }

  return (
    <div className="flex w-full flex-wrap gap-y-2">
      {tags.map((tag, index) => (
        <Tag
          key={index}
          closable
          onClose={() => {
            handleDeleteSize(tag);
          }}
          onClick={() => {
            setVisible(true),
              setSizeSelected(tag),
              setIsAction('edit'),
              form.setFieldValue('width', tag.width),
              form.setFieldValue('height', tag.height)
          }}
          className="flex items-center justify-center w-auto bg-gray-100 text-gray-800 hover:bg-gray-200 transition-all duration-100 cursor-pointer h-8"
        >
          <Typography className='text-4'>{`${tag?.width} cm x ${tag?.height} cm`}</Typography>
        </Tag>
      ))}
      <Button
        onClick={() => {
          setVisible(true),
            setIsAction('add')
        }}
        icon={<PlusOutlined />}
        className="flex items-center justify-center bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-100 cursor-pointer"
      >
      </Button>
      <Modal
        open={visible}
        onOk={handleOk}
        okText={translate.common.saveBtn}
        cancelText={translate.common.cancelBtn}
        closable={false}
        onCancel={handleCancel}>
        <Form
          form={form}
          layout='vertical'
          onFinish={onFinish}>
          <Form.Item
            label={<Typography className='font-bold'>{translate.sizes.width}</Typography>}
            name="width"
            rules={[
              {
                validator: validateFields,
              },
            ]}
          >
            <Input
              type="number"
              size='middle'
              className='rounded-md'
              suffix="cm" />
          </Form.Item>
          <Form.Item
            label={<Typography className='font-bold'>{translate.sizes.height}</Typography>}
            name="height"
            rules={[
              {
                validator: validateFields,
              },
            ]}
          >
            <Input
              type="number"
              size='middle'
              className='rounded-md'
              suffix="cm" />
          </Form.Item>
        </Form>
      </Modal>
    </div >
  );
}

export default Size;
