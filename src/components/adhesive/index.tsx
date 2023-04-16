import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Tag, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import useCreateAdhesive from '@/hooks/adhesives/useCreateAdhesive';
import useDeleteAdhesive from '@/hooks/adhesives/useDeleteAdhesive';
import useGetAdhesives from '@/hooks/adhesives/useGetAdhesives';
import useUpdateAdhesive from '@/hooks/adhesives/useUpdateAdhesive';
import { useLanguage, useTranslate } from '@/hooks/useTranslate';

import { TOAST_CONFIG } from '@/configs/toast';
import { Adhesive } from '@/models/products.model';

function Adhesive() {
  const [tags, setTags] = useState<Array<Adhesive>>([]);
  const [showInput, setShowInput] = useState(false);
  const translate = useTranslate();
  const { value } = useLanguage();

  const { data: adhesives = [], refetch } = useGetAdhesives();
  const { mutate: createAdhesiveMutate, isLoading: isCreateAdhesiveLoading } = useCreateAdhesive();
  const { mutate: deleteAdhesiveMutate, isLoading: isDeleteAdhesiveLoading } = useDeleteAdhesive();
  const { mutate: updateAdhesiveMutate, isLoading: isUpdateAdhesiveLoading } = useUpdateAdhesive();
  useEffect(() => {
    setTags(adhesives);
  }, [adhesives]);

  const handleAddTag = (value: string) => {
    createAdhesiveMutate({ name: value },
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

  const handleEditTag = (adhesive: Adhesive, value: string) => {
    updateAdhesiveMutate({ id: adhesive?.id, name: value },
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

  const handleDeleteAdhesive = (adhesive: Adhesive) => {
    deleteAdhesiveMutate(adhesive,
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
            handleDeleteAdhesive(tag);
          }}
          onClick={() => {
            const newTags = [...tags];
            newTags[index] = {
              ...tag,
              name: (
                <Input
                  defaultValue={tag[`name` as keyof Adhesive]}
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
          <Typography className='text-4'>{tag?.name}</Typography>
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

export default Adhesive;
