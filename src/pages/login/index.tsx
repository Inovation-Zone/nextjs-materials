import { LoadingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { toast } from 'react-toastify';

import useAuth from '@/hooks/auth/useLogin';
import useDebounce from '@/hooks/useDebounce';

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

  const onFinish = useDebounce((values: LoginFormValues) => {
    mutate({ email: values.email, password: hashPassword(values.password) },
      {
        onSuccess: () => {
          router.push('/dashboard');
        },
        onError: () => {
          toast.error('Incorrect email or password. Please try again.', TOAST_CONFIG);
        },
      },
    )
  }, 300);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[400px] bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <Form
          name="basic"
          initialValues={{ rememberMe: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          ref={formRef}
          layout="vertical"
          className='mt-12'
        >
          <Form.Item
            label={<span className="font-bold">Email</span>}
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input
              className="rounded-md border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              placeholder="Enter your email"
            />
          </Form.Item>

          <Form.Item
            label={<span className="font-bold">Password</span>}
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              className="rounded-md border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              placeholder="Enter your password"
            />
          </Form.Item>

          <Form.Item name="rememberMe" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-12 mt-12 bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-white font-bold py-2 px-4 rounded-md items-center flex justify-center text-[16px]"
              disabled={isLoading}
              icon={isLoading ? <LoadingOutlined /> : <LogoutOutlined />}
            >
              Login
            </Button>
          </Form.Item>
          <Form.Item>
            <a onClick={() => router.push('/forgot-password')} href="#">Forgot password?</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
