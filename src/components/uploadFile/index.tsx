/* eslint-disable @next/next/no-img-element */
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { Col, Form, message, Typography, Upload } from 'antd';
import { FormItemProps } from 'antd/lib/form';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import useUploadFiles from '@/hooks/files/useUploadFiles';
import { useTranslate } from '@/hooks/useTranslate';

interface UploadFileProps extends Omit<FormItemProps, 'name'> {
  name: string;
  accept?: string;
  multiple?: boolean;
  heightPreview?: string;
}

type Ref = {
  getValue: () => string | null;
  setValue: (url: string) => void;
};

const UploadFile = forwardRef<Ref, UploadFileProps>(
  ({ name, accept = 'image/*', multiple = false, heightPreview, ...restProps }, ref) => {
    const { mutate, data: fileUrlData, isLoading } = useUploadFiles();
    const [fileUrl, setFileUrl] = useState<string | null>('');
    const translate = useTranslate();
    const { Text } = Typography;

    useEffect(() => {
      fileUrlData?.length && setFileUrl(fileUrlData?.[0]);
    }, [fileUrlData]);

    useImperativeHandle(ref, () => ({
      getValue() {
        return fileUrl;
      },
      setValue(url: string) {
        setFileUrl(url);
      },
    }));

    const handleChange = (info: any) => {
      const formData = new FormData();
      formData.append('uploadFiles', info.file.originFileObj);
      mutate(formData);
    };

    const handleRemove = () => {
      setFileUrl(null);
    };

    return (
      <Form.Item
        name={name}
        {...restProps}>
        {fileUrl ? (
          <div>
            <img
              onClick={() => handleRemove()}
              src={fileUrl}
              alt={fileUrl}
              style={{ height: heightPreview && heightPreview }}
              className='w-full h-[400px] border rounded-lg cursor-pointer object-cover' />
            <Text
              className='text-gray-400'
              italic>{translate.common.tipRemoveImage}</Text>
          </div>
        ) : (
          <Col>
            <Upload.Dragger
              accept={accept}
              multiple={multiple}
              onChange={handleChange}
              showUploadList={false}
              beforeUpload={(file) => {
                if (file.type.indexOf('image/') !== 0) {
                  message.error('You can only upload image files!');
                  return false;
                }
                return true;
              }}
            >
              <p className="ant-upload-drag-icon">
                {isLoading ? <LoadingOutlined /> : <UploadOutlined />}
              </p>
              <p className="ant-upload-text">{isLoading ? 'Uploading...' : 'Upload File'}</p>
            </Upload.Dragger>
          </Col>
        )}
      </Form.Item>
    );
  }
);

export default UploadFile;
