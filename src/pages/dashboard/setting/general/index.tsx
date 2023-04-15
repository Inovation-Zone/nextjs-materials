import { Breadcrumb, Button, Col, Divider, Row, Space, Typography } from "antd";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";

import useGetSettings from "@/hooks/settings/useGetSettings";
import useUpdateSettings from "@/hooks/settings/useUpdateSettings";
import { useTranslate } from "@/hooks/useTranslate";

import Editor from "@/components/editor";
import UploadFile from "@/components/uploadFile";

import { TOAST_CONFIG } from "@/configs/toast";
import { Setting } from "@/models/settings.model";

// const Editor = dynamic(() => import('@/components/editor'), {
//   ssr: false,
//   loading: () => <div>Loading...</div>,
// });

const General = () => {
  const translate = useTranslate();
  const uploadLogoRef = useRef<any>(null);
  const coverContentViEditorRef = useRef<any>(null);
  const coverContentEnEditorRef = useRef<any>(null);
  const footerViEditorRef = useRef<any>(null);
  const footerEnEditorRef = useRef<any>(null);

  const { data: settings = [] } = useGetSettings();
  const { mutate: updateSettingsMutate, isLoading: isUpdateSettingsLoading } = useUpdateSettings();

  useEffect(() => {
    settings.forEach((item: Setting) => {
      if (item?.key === 'logo') {
        uploadLogoRef.current.setValue(item?.value);
      }

      if (item?.key === 'coverContentVi') {
        coverContentViEditorRef.current.setValue(item?.value);
      }
      if (item?.key === 'coverContentEn') {
        coverContentEnEditorRef.current.setValue(item?.value);
      }
      if (item?.key === 'footerContentVi') {
        footerViEditorRef.current.setValue(item?.value);
      }
      if (item?.key === 'footerContentEn') {
        footerEnEditorRef.current.setValue(item?.value);
      }
    });
  }, [settings]);

  const handleSaveSettings = () => {
    const settings = [
      {
        key: 'logo',
        value: uploadLogoRef.current.getValue()
      },
      {
        key: 'coverContentVi',
        value: coverContentViEditorRef.current.getValue()
      },
      {
        key: 'coverContentEn',
        value: coverContentEnEditorRef.current.getValue()
      },
      {
        key: 'footerContentVi',
        value: footerViEditorRef.current.getValue()
      },
      {
        key: 'footerContentEn',
        value: footerEnEditorRef.current.getValue()
      }
    ]

    updateSettingsMutate(settings,
      {
        onSuccess: () => {
          toast.success(translate.messageToast.form.success.update, TOAST_CONFIG);
        },
        onError: () => {
          toast.error(translate.messageToast.form.failed.update, TOAST_CONFIG);
        },
      }
    );
  }

  return (
    <Space
      direction="vertical"
      size="middle"
      className='flex'>
      <Breadcrumb>
        <Breadcrumb.Item>{translate.home.title}</Breadcrumb.Item>
        <Breadcrumb.Item>{translate.setting.title}</Breadcrumb.Item>
        <Breadcrumb.Item>{translate.setting.general.title}</Breadcrumb.Item>
      </Breadcrumb>
      <Typography.Title level={2}>{translate.setting.general.title}</Typography.Title>
      <Col>
        <Typography.Title level={4}>{translate.setting.general.logo}</Typography.Title>
        <Col span={4}>
          <UploadFile
            ref={uploadLogoRef}
            name=""
            heightPreview='200px' />
        </Col>
      </Col>
      <Divider />
      <Col className="flex flex-col gap-3">
        <Typography.Title level={4}>{translate.setting.general.cover}</Typography.Title>
        <Col className="flex flex-col gap-2">
          <Typography className="font-md">{translate.common.content} (Vietnamese)</Typography>
          <Editor ref={coverContentViEditorRef} />
        </Col>
        <Col className="flex flex-col gap-2">
          <Typography className="font-md">{translate.common.content}(English)</Typography>
          <Editor ref={coverContentEnEditorRef} />
        </Col>
      </Col>
      <Divider />
      <Col className="flex flex-col gap-3">
        <Typography.Title level={4}>{translate.setting.general.footer}</Typography.Title>
        <Col className="flex flex-col gap-2">
          <Typography className="font-md">{translate.common.content} (Vietnamese)</Typography>
          <Editor ref={footerViEditorRef} />
        </Col>
        <Col className="flex flex-col gap-2">
          <Typography className="font-md">{translate.common.content}(English)</Typography>
          <Editor ref={footerEnEditorRef} />
        </Col>
      </Col>
      <Row className="flex flex-row-reverse">
        <Button
          className='ml-4 w-24'
          type="primary"
          loading={isUpdateSettingsLoading}
          onClick={handleSaveSettings}
          size='large'>
          {translate.common.saveBtn}
        </Button>
      </Row>
    </Space>
  );
};

export default General;
