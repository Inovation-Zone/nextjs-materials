import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Tag, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import useCreateThickness from '@/hooks/thicknesses/useCreateThickness';
import useDeleteThickness from '@/hooks/thicknesses/useDeleteThickness';
import useGetThicknesses from '@/hooks/thicknesses/useGetThicknesses';
import useUpdateThickness from '@/hooks/thicknesses/useUpdateThickness';
import { useLanguage, useTranslate } from '@/hooks/useTranslate';

import { TOAST_CONFIG } from '@/configs/toast';
import { Thickness } from '@/models/products.model';

function Thickness() {
  const [tags, setTags] = useState<Array<Thickness>>([]);
  const [showInput, setShowInput] = useState(false);
  const translate = useTranslate();
  const { value } = useLanguage();

  const { data: thicknesses = [], refetch } = useGetThicknesses();
  const { mutate: createThicknessMutate, isLoading: isCreateThicknessLoading } = useCreateThickness();
  const { mutate: deleteThicknessMutate, isLoading: isDeleteThicknessLoading } = useDeleteThickness();
  const { mutate: updateThicknessMutate, isLoading: isUpdateThicknessLoading } = useUpdateThickness();
  useEffect(() => {
    setTags(thicknesses);
  }, [thicknesses]);

  const handleAddTag = (value: number) => {
    createThicknessMutate({ value },
      {
        onSuccess: () => {
          refetch();
          toast.success(translate.messageToast.form.success.add, TOAST_CONFIG);
          setShowInput(false);
        },
        onError: () => {
          toast.error(translate.messageToast.form.failed.add, TOAST_CONFIG);
        },
      }
    );
  };

  const handleEditTag = (thickness: Thickness, value: number) => {
    updateThicknessMutate({ id: thickness?.id, value },
      {
        onSuccess: () => {
          refetch();
          toast.success(translate.messageToast.form.success.update, TOAST_CONFIG);
          setShowInput(false);
        },
        onError: () => {
          toast.error(translate.messageToast.form.failed.update, TOAST_CONFIG);
        },
      }
    );
  };

  const handleDeleteThickness = (thickness: Thickness) => {
    deleteThicknessMutate(thickness,
      {
        onSuccess: () => {
          refetch();
          toast.success(translate.messageToast.form.success.delete, TOAST_CONFIG);
          setShowInput(false);
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
            handleDeleteThickness(tag);
          }}
          onClick={() => {
            const newTags = [...tags];
            newTags[index] = {
              ...tag,
              value: (
                <Input
                  defaultValue={tag?.value}
                  className="rounded-md px-3 w-[150px] h-8"
                  type='number'
                  onPressEnter={(e: any) => {
                    const value = e.target.value;
                    handleEditTag(tag, value);
                    e.target.blur();
                  }}
                  onBlur={(e: any) => {
                    const value = e.target.value;
                    handleEditTag(tag, value);
                  }}
                />
              ),
            };
            setTags(newTags);
          }}
          className="flex items-center justify-center w-auto bg-gray-100 text-gray-800 hover:bg-gray-200 transition-all duration-100 cursor-pointer h-8"
        >
          <Typography className='text-4'>{tag?.value} mm</Typography>
        </Tag>
      ))}
      {showInput ? (
        <Input
          autoFocus
          onPressEnter={(e: any) => {
            const value = e.target.value;
            handleAddTag(value);
            e.target.value = '';
          }}
          suffix="mm"
          type='number'
          onBlur={() => setShowInput(false)}
          className="rounded-md px-3 w-64 h-8"
        />
      ) : (
        <Button
          onClick={() => setShowInput(true)}
          icon={<PlusOutlined />}
          className="flex items-center justify-center bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-100 cursor-pointer"
        >
        </Button>
      )}
    </div>
  );
}

export default Thickness;
