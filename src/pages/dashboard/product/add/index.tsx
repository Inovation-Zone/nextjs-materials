

import { Breadcrumb, Button, Col, Form, Input, Row, Select, Space, Typography } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef } from 'react';
// Import React dependencies.
import React from 'react'
import { toast } from 'react-toastify';

// Import the Slate editor factory.
// Import the Slate components and React plugin.
import useGetAdhesives from '@/hooks/adhesives/useGetAdhesives';
import useGetCategories from '@/hooks/categories/useGetCategories';
import useCreateProduct from '@/hooks/product/useCreateProduct';
import useUpdateProduct from '@/hooks/product/useUpdateProduct';
import useGetSizes from '@/hooks/sizes/useGetSizes';
import useGetThicknesses from '@/hooks/thicknesses/useGetThicknesses';
// Import the Slate components and React plugin.
import { useLanguage, useTranslate } from '@/hooks/useTranslate';
import useGetWoodTypes from '@/hooks/woodTypes/useGetWoodTypes';

import Editor from '@/components/editor';
import SearchAndTagInput from '@/components/searchAndTag';
import SwitchComponent from '@/components/switch';
import UploadImages from '@/components/uploadImages';

import { TOAST_CONFIG } from '@/configs/toast';
import { Category } from '@/models/categories.model';
import { Adhesive, Option, Product, Size, Thickness, WoodType } from '@/models/products.model';

interface AddProductProps {
  product: Product;
}

const AddProduct: React.FC<AddProductProps> = ({ product }) => {
  const translate = useTranslate();
  const [form] = Form.useForm<Product>();
  const woodTypesRef = useRef<any>(null);
  const adhesivesRef = useRef<any>(null);
  const thicknessesRef = useRef<any>(null);
  const sizesRef = useRef<any>(null);
  const uploadImagesRef = useRef<any>(null);
  const editorViRef = useRef<any>(null);
  const editorEnRef = useRef<any>(null);
  const { value } = useLanguage();

  const isEdit = useMemo(() => {
    if (product) {
      return true;
    }
    return false;
  }, [product]);

  const { data: categories = [], isLoading: isLoadingCategories } = useGetCategories();
  const { data: adhesives = [] } = useGetAdhesives();
  const { data: woodTypes = [] } = useGetWoodTypes();
  const { data: thicknesses = [] } = useGetThicknesses();
  const { data: sizes = [] } = useGetSizes();
  const { mutate: createProductMutate, isLoading: isLoadingCreateProduct } = useCreateProduct();
  const { mutate: updateProductMutate, isLoading: isLoadingUpdateProduct } = useUpdateProduct();
  const router = useRouter();

  useEffect(() => {
    if (isEdit) {
      editorViRef.current.setValue(product?.vi_description);
      editorEnRef.current.setValue(product?.en_description);

      // hiddenRef.current.setValue(product?.isHidden);

      const { woodTypes, adhesives, thicknesses, sizes, fileResources = [] } = product;

      form.setFieldsValue(product);

      if (woodTypes?.length) {
        const woodTypesFormat = woodTypes.map((item: WoodType) => {
          return {
            name: item?.[`${value}_name` as keyof WoodType],
            value: item?.id
          }
        })
        woodTypesRef.current.setValues(woodTypesFormat);
      }

      if (adhesives?.length) {
        const adhesivesFormat = adhesives.map((item: Adhesive) => {
          return {
            name: item?.name,
            value: item?.id
          }
        })
        adhesivesRef.current.setValues(adhesivesFormat);
      }

      if (thicknesses?.length) {
        const thicknessesFormat = thicknesses.map((item: Thickness) => {
          return {
            name: item.value,
            value: item.id
          }
        })
        thicknessesRef.current.setValues(thicknessesFormat);
      }

      if (sizes?.length) {
        const sizesFormat = sizes.map((item: Size) => {
          return {
            name: `${item.width} x ${item.height}`,
            value: item.id
          }
        })
        sizesRef.current.setValues(sizesFormat);
      }

      if (fileResources.length) {
        uploadImagesRef.current.setValues(fileResources.map(item => item.fileUrl));
      }
    }
  }, [form, isEdit, product]);

  const categoriesFormat = useMemo(() => {
    return categories.map((item: Category) => {
      return {
        label: item?.[`${value}_name` as keyof Category],
        value: item.id
      }
    })
  }, [categories]);

  const adhesivesFormat = useMemo(() => {
    return adhesives.map((item: Adhesive) => {
      return {
        name: item.name,
        value: item.id
      }
    })
  }, [adhesives]);

  const woodTypesFormat = useMemo(() => {
    return woodTypes.map((item: WoodType) => {
      return {
        name: item?.[`${value}_name` as keyof WoodType],
        value: item.id
      }
    })
  }, [woodTypes]);

  const thicknessesFormat = useMemo(() => {
    return thicknesses.map((item: Thickness) => {
      return {
        name: item.value,
        value: item.id
      }
    })
  }, [thicknesses]);

  const sizesFormat = useMemo(() => {
    return sizes.map((item: Size) => {
      return {
        name: `${item.width} x ${item.height}`,
        value: item.id
      }
    })
  }, [sizes]);

  const formatObjectToIds = (arr: Option[]) => {
    return arr.map(item => item.value);
  }

  const handleSave = () => {
    form.validateFields().then((values) => {
      console.log('values', values);
      const woodTypeIds = formatObjectToIds(woodTypesRef.current.getValues());
      const adhesiveIds = formatObjectToIds(adhesivesRef.current.getValues());
      const thicknessIds = formatObjectToIds(thicknessesRef.current.getValues());
      const sizeIds = formatObjectToIds(sizesRef.current.getValues());
      const imageUrls = uploadImagesRef.current.getValues();

      const data = {
        ...values,
        vi_description: editorViRef.current.getValue(),
        en_description: editorEnRef.current.getValue(),
        woodTypeIds,
        adhesiveIds,
        thicknessIds,
        sizeIds,
        imageUrls
      };
      if (isEdit) {
        updateProductMutate({ ...data, id: product.id }, {
          onSuccess: () => {
            toast.success('Item successfully updated.', TOAST_CONFIG);
            router.push('/dashboard/product');
          },
          onError: () => {
            toast.error('Failed to update item. Please try again later.', TOAST_CONFIG);
          },
        })
      } else {
        createProductMutate(data, {
          onSuccess: () => {
            toast.success('Item successfully added.', TOAST_CONFIG);
            router.push('/dashboard/product');
          },
          onError: () => {
            toast.error('Failed to add item. Please try again later.', TOAST_CONFIG);
          },
        })
      }

    })
  }

  const handleCancel = () => {
    form.resetFields();
    router.push('/dashboard/product');
  };

  return (
    <Space
      direction="vertical"
      size="middle"
      className='flex'>
      <Breadcrumb>
        <Breadcrumb.Item>{translate.home.title}</Breadcrumb.Item>
        <Breadcrumb.Item>{translate.products.title}</Breadcrumb.Item>
        <Breadcrumb.Item>{isEdit ? translate.common.edit : translate.common.addNew}</Breadcrumb.Item>
      </Breadcrumb>
      <Typography.Title level={2}>{isEdit ? translate.products.edit : translate.products.add}</Typography.Title>
      <Form
        form={form}
        onFinish={handleSave}
        layout="vertical">
        <Form.Item
          name="vi_name"
          label={<Typography className='font-bold'>{`${translate.common.name} (Vietnamese)`}</Typography>}
          rules={[{ required: true, message: translate.common.form.required }]}
        >
          <Input
            className='rounded-lg'
            size='large' />
        </Form.Item>
        <Form.Item
          name="en_name"
          label={<Typography className='font-bold'>{`${translate.common.name} (English)`}</Typography>}
          rules={[{ required: true, message: translate.common.form.required }]}
        >
          <Input
            className='rounded-lg'
            size='large' />
        </Form.Item>

        <Form.Item
          name="categoryId"
          label={<Typography className='font-bold'>{translate.categories.name}</Typography>}
          rules={[{ required: true, message: translate.common.form.required }]}
        >
          <Select
            className='w-full'
            loading={isLoadingCategories}
            size='large'
            options={categoriesFormat}
          />
        </Form.Item>
        <Form.Item
          name="content"
          label={<Typography className='font-bold'>{`${translate.common.description} (Vietnamese)`}</Typography>}>
          <Editor ref={editorViRef} />
        </Form.Item>
        <Form.Item
          name="content"
          label={<Typography className='font-bold'>{`${translate.common.description} (English)`}</Typography>}>
          <Editor ref={editorEnRef} />
        </Form.Item>
        <Form.Item label={<Typography className='font-bold'>{translate.woodTypes.name}</Typography>}>
          <SearchAndTagInput
            options={woodTypesFormat}
            ref={woodTypesRef} />
        </Form.Item>
        <Form.Item label={<Typography className='font-bold'>{translate.adhesives.name}</Typography>}>
          <SearchAndTagInput
            options={adhesivesFormat}
            ref={adhesivesRef} />
        </Form.Item>
        <Form.Item label={<Typography className='font-bold'>{translate.thicknesses.name}</Typography>}>
          <SearchAndTagInput
            options={thicknessesFormat}
            ref={thicknessesRef} />
        </Form.Item>
        <Form.Item label={<Typography className='font-bold'>{translate.sizes.name}</Typography>}>
          <SearchAndTagInput
            options={sizesFormat}
            ref={sizesRef} />
        </Form.Item>
        <Row>
          <Col span={4}>
            <Form.Item
              name="isHidden"
              valuePropName="checked"
              label={<Typography className='font-bold'>{translate.products.hidden}</Typography>}>
              <SwitchComponent />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              name="isOutOfStock"
              valuePropName="checked"
              initialValue={isEdit ? product.isOutOfStock : true}
              label={<Typography className='font-bold'>{translate.products.status}</Typography>}>
              <SwitchComponent />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label={<Typography className='font-bold'>{translate.common.image}</Typography>}>
          <UploadImages
            name='file'
            ref={uploadImagesRef} />
        </Form.Item>
        <Row className='w-full flex flex-row-reverse'>
          <Form.Item>
            <Button
              onClick={handleCancel}
              size='large'
              className='w-24'>
              {translate.common.cancelBtn}
            </Button>
            <Button
              className='ml-4 w-24'
              type="primary"
              htmlType="submit"
              loading={isLoadingCreateProduct || isLoadingUpdateProduct}
              size='large'>
              {translate.common.saveBtn}
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Space>
  )
};

export default AddProduct;
