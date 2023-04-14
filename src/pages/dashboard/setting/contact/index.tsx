import { Breadcrumb, Button, Col, Divider, Row, Space, Typography } from "antd";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";

import useGetSettings from "@/hooks/settings/useGetSettings";
import useUpdateSettings from "@/hooks/settings/useUpdateSettings";
import { useTranslate } from "@/hooks/useTranslate";

import Editor from "@/components/editor";

import { TOAST_CONFIG } from "@/configs/toast";
import { Setting } from "@/models/settings.model";

const General = () => {
  const translate = useTranslate();
  const contactContentViEditorRef = useRef<any>(null);
  const contactContentEnEditorRef = useRef<any>(null);

  const { data: settings = [] } = useGetSettings();
  const { mutate: updateSettingsMutate, isLoading: isUpdateSettingsLoading } = useUpdateSettings();

  useEffect(() => {
    settings.forEach((item: Setting) => {
      if (item?.key === 'contactContentVi') {
        contactContentViEditorRef.current.setValue(item?.value);
      }
      if (item?.key === 'contactContentEn') {
        contactContentEnEditorRef.current.setValue(item?.value);
      }
    });
  }, [settings]);

  const handleSaveSettings = () => {
    const settings = [
      {
        key: 'contactContentVi',
        value: contactContentViEditorRef.current.getValue()
      },
      {
        key: 'contactContentEn',
        value: contactContentEnEditorRef.current.getValue()
      },
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
        <Breadcrumb.Item>{translate.setting.contact.title}</Breadcrumb.Item>
      </Breadcrumb>
      <Typography.Title level={2}>{translate.setting.contact.title}</Typography.Title>
      <Col className="flex flex-col gap-3">
        <Col className="flex flex-col gap-2">
          <Typography className="font-md">{translate.common.content} (Vietnamese)</Typography>
          <Editor ref={contactContentViEditorRef} />
        </Col>
        <Col className="flex flex-col gap-2">
          <Typography className="font-md">{translate.common.content} (English)</Typography>
          <Editor ref={contactContentEnEditorRef} />
        </Col>
      </Col>
      <Divider />
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
