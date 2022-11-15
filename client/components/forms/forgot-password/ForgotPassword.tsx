import { Button, Checkbox, Form, Input, Col, Row, Typography, Alert } from 'antd';
const { Title } = Typography;
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import AuthformWrapper from '../authform-wrapper/AuthformWrapper';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { AppwriteContext } from '../../wrappers/appwrite/Appwrite';
import AuthUserContext from '../../../context/authentication/AuthUserContext';
import Router, { useRouter } from 'next/router';

const ForgotPassword: React.FC = () => {
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);
  const appwrite = useContext(AppwriteContext);
  const router = useRouter();

  const onFinish = async (values: any) => {
    setDisabled(true);
    try {
      console.log(values.email);
      await appwrite?.account.createRecovery(values.email, process.env.NEXT_PUBLIC_DOMAIN! + '/forgot-password-confirmation');
      router.push('/sign-in');

      setError(false);
    } catch (e) {
      console.log(e);
      setDisabled(false);
      setError(true);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    setDisabled(false);
    setError(true);
  };

  return (
    <AuthformWrapper>
      <Title level={3}>Forgot password</Title>
      <Form
        disabled={disabled}
        size='large'
        name='normal_login'
        className='login-form'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item name='email' rules={[{ required: true, message: 'Please input your Email!' }]}>
          <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Email' />
        </Form.Item>
        <Row gutter={[0, error ? 8 : 0]}>
          <Col span={24}>
            <Alert className={error ? '' : 'hidden'} message='The email address does not exist.' type='error' showIcon />
          </Col>
          <Col span={24}>
            <Button size='large' block type='primary' htmlType='submit' className='login-form-button'>
              Request new password
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

export default ForgotPassword;
