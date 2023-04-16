import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Tag, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useLanguage, useTranslate } from '@/hooks/useTranslate';
import useCreateWoodType from '@/hooks/woodTypes/useCreateWoodType';
import useDeleteWoodType from '@/hooks/woodTypes/useDeleteWoodType';
import useGetWoodTypes from '@/hooks/woodTypes/useGetWoodTypes';
import useUpdateWoodType from '@/hooks/woodTypes/useUpdateWoodType';

import { TOAST_CONFIG } from '@/configs/toast';
import { WoodType } from '@/models/products.model';

function WoodType() {
  const [tags, setTags] = useState<Array<WoodType>>([]);
  const [showInput, setShowInput] = useState(false);
  const translate = useTranslate();
  const { value } = useLanguage();

  const { data: woodTypes = [], refetch } = useGetWoodTypes();
  const { mutate: createWoodTypeMutate, isLoading: isCreateWoodTypeLoading } = useCreateWoodType();
  const { mutate: deleteWoodTypeMutate, isLoading: isDeleteWoodTypeLoading } = useDeleteWoodType();
  const { mutate: updateWoodTypeMutate, isLoading: isUpdateWoodTypeLoading } = useUpdateWoodType();
  useEffect(() => {
    setTags(woodTypes);
  }, [woodTypes]);

  const handleAddTag = (value: string) => {
    createWoodTypeMutate({ vi_name: value, en_name: value },
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

  const handleEditTag = (woodType: WoodType, value: string) => {
    updateWoodTypeMutate({ id: woodType?.id, vi_name: value, en_name: value },
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

  const handleDeleteWoodType = (woodType: WoodType) => {
    deleteWoodTypeMutate(woodType,
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
            handleDeleteWoodType(tag);
          }}
          onClick={() => {
            const newTags = [...tags];
            newTags[index] = {
              ...tag,
              [`${value}_name`]: (
                <Input
                  defaultValue={tag[`${value}_name` as keyof WoodType]}
                  className="rounded-md px-3 h-8"
                  onPressEnter={(e: any) => {
                    const value = e.target.value;
                    handleEditTag(tag, value);
                    e.target.blur();
                  }}
                  onBlur={(e) => {
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
          <Typography className='text-4'>{tag?.[`${value}_name` as keyof WoodType]}</Typography>
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

export default WoodType;
