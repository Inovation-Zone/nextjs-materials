import { Modal } from 'antd';
import React, { forwardRef, useImperativeHandle, useState } from 'react';

interface DialogProps {
  title: string;
  width?: number | string;
  onOk?: () => void;
  onCancel?: () => void;
  children?: React.ReactNode;
}

export interface DialogRef {
  open: () => void;
  close: () => void;
}

const CustomDialog = forwardRef<DialogRef, DialogProps>((props, ref) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setVisible(true),
    close: () => setVisible(false),
  }));

  const handleOk = () => {
    setVisible(false);
    if (props.onOk) {
      props.onOk();
    }
  };

  const handleCancel = () => {
    setVisible(false);
    if (props.onCancel) {
      props.onCancel();
    }
  };

  return (
    <Modal
      title={props.title}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={props.width}
      footer={null}
      closable={false}
      maskClosable={false}
    >
      {props.children}
    </Modal>
  );
});

export default CustomDialog;
