import { SyncOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { useRouter } from 'next/router';
import { useRef } from 'react';

interface LoginFormValues {
  username: string;
  password: string;
  remember: boolean;
}

const Login = () => {
  const formRef = useRef<FormInstance<LoginFormValues>>(null);
  const router = useRouter();

  const onFinish = (values: LoginFormValues) => {
    router.push('/dashboard')
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[400px] bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        <Form
          name="basic"
          initialValues={{ remember: true }}
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

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-12 bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-white font-bold py-2 px-4 rounded-md items-center flex justify-center text-[16px]"
              icon={<SyncOutlined />}
            >
              Reset
            </Button>
          </Form.Item>
          <Form.Item>
            <a
              onClick={() => router.push('/login')}
              href="#">Login now</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
