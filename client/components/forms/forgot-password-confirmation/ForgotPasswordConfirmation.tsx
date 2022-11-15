import { Button, Checkbox, Form, Input, Col, Row, Typography, Alert } from 'antd';
const { Title } = Typography;
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import AuthformWrapper from '../authform-wrapper/AuthformWrapper';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { AppwriteContext } from '../../wrappers/appwrite/Appwrite';
import AuthUserContext from '../../../context/authentication/AuthUserContext';
import Router, { useRouter } from 'next/router';

type Values = {
  password: String;
  passwordRepeat: String;
};

const ForgotPasswordConfirmation: React.FC = () => {
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);
  const [appwriteError, setAppwriteError] = useState(false);
  const appwrite = useContext(AppwriteContext);
  const router = useRouter();
  const [values, setValues] = useState<Values | null>(null);
  const { secret, userId } = router.query;

  const onFinish = async (values: any) => {
    setDisabled(true);
    try {
      console.log(values.email);
      await appwrite?.account.updateRecovery(userId!.toString(), secret!.toString(), values.password, values.passwordRepeat);
      router.push('/sign-in');
    } catch (e) {
      setAppwriteError(true);
      console.log(e);
      setDisabled(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    setDisabled(false);
    setError(true);
  };

  const checkValues = (changedValues: any, allValues: any) => {
    console.log(allValues);
    setValues(allValues);
  };

  useEffect(() => {
    if (values) {
      if (
        !values.password ||
        !values.passwordRepeat ||
        (values.password &&
          values.password.length > 0 &&
          values.passwordRepeat &&
          values.passwordRepeat.length > 0 &&
          values.passwordRepeat === values.password)
      ) {
        setError(false);
      } else setError(true);
    }
  }, [values]);

  return (
    <AuthformWrapper>
      <Title level={3}>Update Password</Title>
      <Form
        disabled={disabled}
        size='large'
        name='normal_login'
        className='login-form'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={checkValues}
      >
        <Form.Item name='password' rules={[{ required: true, message: 'Please input your Password!' }]}>
          <Input prefix={<LockOutlined className='site-form-item-icon' />} type='password' placeholder='Password' />
        </Form.Item>
        <Form.Item name='passwordRepeat' rules={[{ required: true, message: 'Please repeat your Password' }]}>
          <Input prefix={<LockOutlined className='site-form-item-icon' />} type='password' placeholder='Password Repeat' />
        </Form.Item>
        <Row gutter={[0, error || appwriteError ? 8 : 0]}>
          <Col span={24}>
            <Alert className={error ? '' : 'hidden'} message='Passwords do not match' type='error' showIcon />
          </Col>
          <Col span={24}>
            <Alert className={appwriteError ? '' : 'hidden'} message='Invalid tokens passed. Please request a new Password reest link.' type='error' showIcon />
          </Col>
          <Col span={24}>
            <Button size='large' block type='primary' htmlType='submit' className='login-form-button'>
              Update password
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

export default ForgotPasswordConfirmation;
