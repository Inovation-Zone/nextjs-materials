

import { Editor } from '@tinymce/tinymce-react';
import { Breadcrumb, Button, Form, Input, Row, Select, Space, Typography } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef } from 'react';
import { toast } from 'react-toastify';

import useGetAdhesives from '@/hooks/adhesives/useGetAdhesives';
import useGetCategories from '@/hooks/categories/useGetCategories';
import useCreateProduct from '@/hooks/product/useCreateProduct';
import useUpdateProduct from '@/hooks/product/useUpdateProduct';
import useGetSizes from '@/hooks/sizes/useGetSizes';
import useGetThicknesses from '@/hooks/thicknesses/useGetThicknesses';
// Import the Slate components and React plugin.
import { useTranslate } from '@/hooks/useTranslate';
import useGetWoodTypes from '@/hooks/woodTypes/useGetWoodTypes';

import SearchAndTagInput from '@/components/searchAndTag';
import UploadImages from '@/components/uploadImages';

import { TOAST_CONFIG } from '@/configs/toast';
import { Category } from '@/models/categories.model';
import { Adhesive, Option, Product, Size, Thickness, WoodType } from '@/models/products.model';

interface AddProductProps {
  product: Product;
}

interface AddProductForm {
  name: string;
  categoryId: string;
  description: string;
}

const AddProduct: React.FC<AddProductProps> = ({ product }) => {
  const translate = useTranslate();
  const [form] = Form.useForm<AddProductForm>();
  const woodTypesRef = useRef<any>(null);
  const adhesivesRef = useRef<any>(null);
  const thicknessesRef = useRef<any>(null);
  const sizesRef = useRef<any>(null);
  const uploadImagesRef = useRef<any>(null);
  const editorRef = useRef<any>(null);

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
      const { woodTypes, adhesives, thicknesses, sizes, fileResources = [] } = product;
      form.setFieldsValue(product);

      if (woodTypes?.length) {
        const woodTypesFormat = woodTypes.map((item: WoodType) => {
          return {
            name: item?.name,
            value: item?.id
          }
        })
        woodTypesRef.current.setValues(woodTypesFormat);
      }

      if (adhesives?.length) {
        const adhesivesFormat = adhesives.map((item: WoodType) => {
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
        label: item.name,
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
        name: item.name,
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
      const content = editorRef.current.getContent();
      const woodTypeIds = formatObjectToIds(woodTypesRef.current.getValues());
      const adhesiveIds = formatObjectToIds(adhesivesRef.current.getValues());
      const thicknessIds = formatObjectToIds(thicknessesRef.current.getValues());
      const sizeIds = formatObjectToIds(sizesRef.current.getValues());
      const imageUrls = uploadImagesRef.current.getValues();

      const data = {
        name: values.name,
        description: content,
        categoryId: values.categoryId,
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
    <Space direction="vertical" size="middle" className='flex'>
      <Breadcrumb>
        <Breadcrumb.Item>{translate.home.title}</Breadcrumb.Item>
        <Breadcrumb.Item>{translate.products.title}</Breadcrumb.Item>
        <Breadcrumb.Item>{isEdit ? translate.common.edit : translate.common.addNew}</Breadcrumb.Item>
      </Breadcrumb>
      <Typography.Title level={2}>{isEdit ? translate.products.edit : translate.products.add}</Typography.Title>
      <Form form={form} onFinish={handleSave} layout="vertical">
        <Form.Item
          name="name"
          label={translate.common.name}
          rules={[{ required: true, message: translate.common.form.required }]}
        >
          <Input className='rounded-lg' size='large' />
        </Form.Item>

        <Form.Item
          name="categoryId"
          label="Category"
          rules={[{ required: true, message: translate.common.form.required }]}
        >
          <Select
            className='w-full'
            loading={isLoadingCategories}
            size='large'
            options={categoriesFormat}
          />
        </Form.Item>
        <Editor
          apiKey="p6ztomd4w6uf6v89xty6ye1e33nibaikoi4a7wfw4eb5cibh"
          onInit={(evt, editor) => editorRef.current = editor}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              'advlist autolink lists link image',
              'charmap print preview anchor help',
              'searchreplace visualblocks code',
              'insertdatetime media table paste wordcount'
            ],
            toolbar:
              'undo redo | formatselect | bold italic | \
              alignleft aligncenter alignright | \
              bullist numlist outdent indent | help'
          }}
          initialValue={isEdit ? product.description : ''}
        />
        <Form.Item label="Wood Types">
          <SearchAndTagInput options={woodTypesFormat} ref={woodTypesRef} />
        </Form.Item>
        <Form.Item label="Adhesives">
          <SearchAndTagInput options={adhesivesFormat} ref={adhesivesRef} />
        </Form.Item>
        <Form.Item label="Thicknesses">
          <SearchAndTagInput options={thicknessesFormat} ref={thicknessesRef} />
        </Form.Item>
        <Form.Item label="Sizes">
          <SearchAndTagInput options={sizesFormat} ref={sizesRef} />
        </Form.Item>
        <Form.Item label="Images">
          <UploadImages name='file' ref={uploadImagesRef} />
        </Form.Item>
        <Row className='w-full flex flex-row-reverse'>
          <Form.Item>
            <Button onClick={handleCancel} size='large'>
              Cancel
            </Button>
            <Button className='ml-4' type="primary" htmlType="submit" size='large'>
              Save
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Space>
  )
};

export default AddProduct;
