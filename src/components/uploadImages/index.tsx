/* eslint-disable @next/next/no-img-element */
import { DeleteFilled, LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { Col, Form, message, Row, Typography, Upload } from 'antd';
import { FormItemProps } from 'antd/lib/form';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import useUploadFiles from '@/hooks/files/useUploadFiles';
import { useTranslate } from '@/hooks/useTranslate';

interface UploadImagesProps extends Omit<FormItemProps, 'name'> {
  name: string;
  accept?: string;
  multiple?: boolean;
}

type Ref = {
  getValues: () => string[];
  setValues: (url: string[]) => void;
};

const UploadImages = forwardRef<Ref, UploadImagesProps>(
  ({ name, accept = 'image/*', multiple = false, ...restProps }, ref) => {
    const { mutate, data: fileUrlData, isLoading } = useUploadFiles();
    const [fileUrls, setFileUrls] = useState<string[] | any[]>([]);
    const translate = useTranslate();
    const { Text } = Typography;

    useEffect(() => {
      if (fileUrlData?.[0]) {
        const fileUrlsResult = [...fileUrls, ...fileUrlData];
        setFileUrls(fileUrlsResult);
      }
    }, [fileUrlData]);

    useImperativeHandle(ref, () => ({
      getValues() {
        console.log('fileUrls', fileUrls);

        return fileUrls;
      },
      setValues(url: string[]) {
        setFileUrls(url);
      },
    }));

    const handleChange = (info: any) => {
      const formData = new FormData();
      formData.append('uploadFiles', info.file.originFileObj);
      mutate(formData);
    };

    const handleRemove = (index: number) => {
      const fileUrlsResult = fileUrls.filter((_, i) => i !== index);
      setFileUrls(fileUrlsResult);
    };

    const renderImagesPreview = () => {
      return (
        <div className="flex flex-wrap">
          {fileUrls &&
            fileUrls.map((item, index) => (
              <div
                key={item}
                className="relative mr-4 mb-4">
                <img
                  src={item}
                  alt={item}
                  className="w-[120px] h-[120px] border rounded-lg cursor-pointer object-cover"
                />
                <div className="absolute top-0 right-0 m-1">
                  <DeleteFilled
                    className='text-red-600'
                    onClick={() => handleRemove(index)} />
                </div>
              </div>
            ))}
        </div>
      );
    };

    return (
      <Form.Item
        name={name}
        {...restProps}>
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
        <Row className='flex w-full mt-4'>
          {renderImagesPreview()}
        </Row>
      </Form.Item>
    );
  }
);

export default UploadImages;
