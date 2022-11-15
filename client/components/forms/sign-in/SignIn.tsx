import { Button, Checkbox, Form, Input, Col, Row, Typography, Alert } from 'antd';
const { Title } = Typography;
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import AuthformWrapper from '../authform-wrapper/AuthformWrapper';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { AppwriteContext } from '../../wrappers/appwrite/Appwrite';
import AuthUserContext from '../../../context/authentication/AuthUserContext';
import Router, { useRouter } from 'next/router';
import styles from './SignIn.module.css';

const SignIn: React.FC = () => {
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);
  const appwrite = useContext(AppwriteContext);
  const router = useRouter();

  const onFinish = async (values: any) => {
    setDisabled(true);
    try {
      await appwrite?.account.createEmailSession(values.email, values.password);
      router.push('/');

      setError(false);
    } catch (e) {
      setDisabled(false);
      setError(true);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    setDisabled(false);
    setError(true);
  };

  const signInWithOkta = async () => {
    try {
      appwrite?.account.createOAuth2Session('okta', 'http://localhost:3000');
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthformWrapper>
      <Title level={3}>Sign In</Title>
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
        <Form.Item name='password' rules={[{ required: true, message: 'Please input your Password!' }]}>
          <Input prefix={<LockOutlined className='site-form-item-icon' />} type='password' placeholder='Password' />
        </Form.Item>
        <Form.Item>
          <Row justify='space-between'>
            <Form.Item name='remember' valuePropName='checked' noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link className='login-form-forgot' href='/forgot-password'>
              Forgot password
            </Link>
          </Row>
        </Form.Item>
        <Row gutter={[0, 8]}>
          <Col className={error ? '' : 'hidden'} span={24}>
            <Alert message='The email address or password is incorrect.' type='error' showIcon />
          </Col>
          <Col span={24}>
            <Button size='large' block type='primary' htmlType='submit' className='login-form-button'>
              Sign In
            </Button>
          </Col>
          <Col span={24}>
            <Button onClick={signInWithOkta} className={styles['okta']} size='large' block type='primary' htmlType='submit'>
              Sign In with Okta
            </Button>
          </Col>
        </Row>
        <Row>
          <span>
            Or <Link href='/sign-up'>Sign Up!</Link>
          </span>
        </Row>
      </Form>
    </AuthformWrapper>
  );
};

export default SignIn;
