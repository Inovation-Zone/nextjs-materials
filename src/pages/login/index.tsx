import { LoadingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Row } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { toast } from 'react-toastify';

import useAuth from '@/hooks/auth/useLogin';
import useDebounce from '@/hooks/useDebounce';
import { useTranslate } from '@/hooks/useTranslate';

import { TOAST_CONFIG } from '@/configs/toast';
import { hashPassword } from '@/utils/auth';

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login = () => {
  const formRef = useRef<FormInstance<LoginFormValues>>(null);
  const router = useRouter();
  const { mutate, isLoading } = useAuth();
  const translate = useTranslate();

  const onFinish = useDebounce((values: LoginFormValues) => {
    mutate({ email: values.email, password: hashPassword(values.password) },
      {
        onSuccess: () => {
          router.push('/dashboard/order');
        },
        onError: () => {
          toast.error(translate.messageToast.auth.failed.logout, TOAST_CONFIG);
        },
      },
    )
  }, 300);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[400px] bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">{translate.login.title}</h2>
        <Form
          name="basic"
          initialValues={{ rememberMe: true }}
          onFinish={onFinish}
          ref={formRef}
          layout="vertical"
          className='mt-12'
        >
          <Form.Item
            label={<span className="font-bold">{translate.common.email}</span>}
            name="email"
            rules={[{ required: true, message: translate.common.form.required }]}
          >
            <Input
              className="rounded-md border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              placeholder={translate.login.enterYourEmail}
            />
          </Form.Item>

          <Form.Item
            label={<span className="font-bold">{translate.common.password}</span>}
            name="password"
            rules={[{ required: true, message: translate.common.form.required }]}
          >
            <Input.Password
              className="rounded-md border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              placeholder={translate.login.enterYourPassword}
            />
          </Form.Item>

          <Form.Item
            name="rememberMe"
            valuePropName="checked">
            <Checkbox>{translate.login.rememberMe}</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-12 mt-12 bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-white font-bold py-2 px-4 rounded-md items-center flex justify-center text-[16px]"
              disabled={isLoading}
              icon={isLoading ? <LoadingOutlined /> : <LogoutOutlined />}
            >
              {translate.login.title}
            </Button>
          </Form.Item>
          <Row className='flex items-center justify-between'>
            <a
              onClick={() => router.push('/forgot-password')}
              href="#">{translate.login.forgotPassword}</a>
            <a
              onClick={() => router.push('/')}
              className='cursor-pointer'
              href='#'>{translate.common.backToHome}</a>
          </Row>
          <Row>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default Login;
