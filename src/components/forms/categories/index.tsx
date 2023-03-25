import { Button, Form, Input, Row } from 'antd';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import useCreateCategory from '@/hooks/categories/useCreateCategory';
import useUpdateCategory from '@/hooks/categories/useUpdateCategory';
import { useTranslate } from '@/hooks/useTranslate';

import UploadFile from '@/components/uploadFile';

import { TOAST_CONFIG } from '@/configs/toast';
import { Category } from '@/models/categories.model';
import { ActionType } from '@/pages/dashboard/product/categories';

interface CategoryFormProps {
  dialogRef?: any;
  action?: ActionType;
  category?: Category;
  onSuccess: () => void;
}

const defaultValues: Category = {
  name: '',
  description: '',
  imageUrl: '',
}

const CategoryForm: React.FC<CategoryFormProps> = ({ action, category, dialogRef, onSuccess }) => {
  const [form] = Form.useForm<Category>();
  const uploadFileRef = useRef<any>(null);
  const translate = useTranslate();

  const { mutate: createMutate } = useCreateCategory();
  const { mutate: updateMutate } = useUpdateCategory();

  useEffect(() => {
    if (action === 'add') {
      form.resetFields();
      uploadFileRef?.current?.setValue(null);
    }
  }, [action]);

  if (action === 'edit') {
    console.log('category', category);
    form.setFieldsValue(category || defaultValues);
    uploadFileRef?.current?.setValue(category?.imageUrl);
  }

  const handleClose = () => {
    dialogRef?.current?.close();
  }

  const handleFinish = (values: Category) => {
    const data = {
      name: values.name,
      description: values.description,
      imageUrl: uploadFileRef?.current?.getValue()
    }
    if (action === 'add') {
      createMutate(data,
        {
          onSuccess: () => {
            toast.success('Item successfully added.', TOAST_CONFIG);
            handleClose();
            onSuccess();
          },
          onError: () => {
            toast.error('Failed to add item. Please try again later.', TOAST_CONFIG);
          },
        }
      )
    } else {
      updateMutate({ ...data, id: category?.id },
        {
          onSuccess: () => {
            toast.success('Item successfully updated.', TOAST_CONFIG);
            handleClose();
            onSuccess();
          },
          onError: () => {
            toast.error('Failed to update item. Please try again later.', TOAST_CONFIG);
          },
        }
      )
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish} initialValues={{}}>
      <Form.Item label={translate.common.name} name="name" rules={[{ required: true, message: translate.common.form.required }]}>
        <Input className='rounded-lg' />
      </Form.Item>
      <Form.Item label={translate.common.description} name="description" rules={[{ required: true, message: translate.common.form.required }]}>
        <Input.TextArea className='rounded-lg' size='large' />
      </Form.Item>
      <UploadFile
        name="imageUrl"
        ref={uploadFileRef} />
      <Row className='flex justify-end'>
        <Button className='mr-1' onClick={handleClose}>
          {translate.common.cancelBtn}
        </Button>
        <Button type="primary" htmlType="submit">
          {action === 'add' ? translate.common.createBtn : translate.common.updateBtn}
        </Button>
      </Row>
    </Form>
  );
};

export default CategoryForm;
