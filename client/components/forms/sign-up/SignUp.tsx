import { Button, Checkbox, Form, Input, Col, Row, Typography, Alert } from 'antd';
const { Title } = Typography;
import Link from 'next/link';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import AuthformWrapper from '../authform-wrapper/AuthformWrapper';
import React, { useContext, useEffect, useState } from 'react';
import { AppwriteContext } from '../../wrappers/appwrite/Appwrite';
import { useRouter } from 'next/router';

const SignIn: React.FC = () => {
  const appwrite = useContext(AppwriteContext);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const onFinish = async (values: any) => {
    console.log('Success:', values);

    try {
      await appwrite?.account.create(appwrite.ID.unique(), values.email, values.password, values.email.split('@')[0]);
      await appwrite?.account.createEmailSession(values.email, values.password);
      await appwrite?.account.createVerification(process.env.NEXT_PUBLIC_DOMAIN!);
      router.push('/');

      setError(false);
    } catch (e) {
      console.log(e);
      setDisabled(false);
      setError(true);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <AuthformWrapper>
      <Title level={3}>Sign Up</Title>
      <Form disabled={disabled} size='large' name='normal_login' className='login-form' initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item name='email' rules={[{ required: true, message: 'Please input your Email!' }]}>
          <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Email' />
        </Form.Item>
        <Form.Item name='password' rules={[{ required: true, message: 'Please input your Password!' }]}>
          <Input prefix={<LockOutlined className='site-form-item-icon' />} type='password' placeholder='Password' />
        </Form.Item>
        <Row gutter={[0, error ? 8 : 0]}>
          <Col span={24}>
            <Alert className={error ? '' : 'hidden'} message='The email address is already in use.' type='error' showIcon />
          </Col>
          <Col span={24}>
            <Button size='large' block type='primary' htmlType='submit' className='login-form-button'>
              Sign Up
            </Button>
          </Col>
        </Row>
        <Row>
          <span>
            Or <Link href='/sign-in'>Sign In!</Link>
          </span>
        </Row>
      </Form>
    </AuthformWrapper>
  );
};

export default SignIn;
