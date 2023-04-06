/* eslint-disable @next/next/no-img-element */
import { DeleteFilled, LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { Col, Form, Row, Upload } from 'antd';
import { FormItemProps } from 'antd/lib/form';
import Link from 'next/link';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import useUploadFiles from '@/hooks/files/useUploadFiles';

interface UploadAttachmentProps extends Omit<FormItemProps, 'name'> {
  name: string;
  accept?: string;
  multiple?: boolean;
}

type Ref = {
  getValue: () => string | null;
  setValue: (url: string) => void;
};

const UploadAttachment = forwardRef<Ref, UploadAttachmentProps>(
  ({ name, accept = '.pdf', multiple = false, ...restProps }, ref) => {
    const { mutate, data: fileUrlData, isLoading } = useUploadFiles();
    const [fileUrl, setFileUrl] = useState<string | null>('');

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
          <Row>
            <Link
              href={fileUrl}
              className='truncate w-auto h-6 border rounded-md px-2'
              target="_blank">Click To Open File</Link>
            <DeleteFilled
              className='text-red-600 text-[20px] ml-4'
              onClick={() => handleRemove()} />
          </Row>
        ) : (
          <Col>
            <Upload.Dragger
              accept={accept}
              multiple={multiple}
              onChange={handleChange}
              showUploadList={false}
              beforeUpload={(file) => {
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

export default UploadAttachment;
