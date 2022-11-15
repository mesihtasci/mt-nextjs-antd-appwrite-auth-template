import { useRouter } from 'next/router';

import { MenuFoldOutlined, MenuUnfoldOutlined, PoweroffOutlined, DashboardOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Avatar, Layout, Menu, Dropdown, Button, Alert, PageHeader, Row, Col, Typography, notification } from 'antd';
import Link from 'next/link';
import type { MenuProps } from 'antd';
import React, { MutableRefObject, ReactNode, Ref, useContext, useEffect, useRef, useState } from 'react';
import styles from './SliderLayout.module.css';

import AppwriteContext from '../../context/appwrite/AppwriteContext';
import AuthUserContext from '../../context/authentication/AuthUserContext';
import Column from 'antd/lib/table/Column';
const { Text } = Typography;

const { Header, Sider, Content } = Layout;
const itemsLoggedIn = [
  {
    key: 'logout',
    label: 'Logout',
  },
];

const itemsNotLoggedIn = [
  {
    key: 'signIn',
    label: 'Sign In',
  },
  {
    key: 'signUp',
    label: 'Sign Up',
  },
];
type Props = {
  children: ReactNode;
};

const SliderLayout: React.FC<Props> = (props) => {
  const mailSendButton = useRef<HTMLElement>(null);
  const [collapsed, setCollapsed] = useState(false);
  const appwrite = useContext(AppwriteContext);
  const { authUser, userUpdated } = useContext(AuthUserContext)!;
  const router = useRouter();

  const showLayout = !(router.pathname.includes('sign-in') || router.pathname.includes('sign-up') || router.pathname.includes('forgot-password'));

  const resendVerificationMail = () => {
    appwrite?.account.createVerification(process.env.NEXT_PUBLIC_DOMAIN!);
    const button = mailSendButton.current;

    if (button) {
      button.setAttribute('disabled', '');
      notification.info({
        message: `Mail was sent.`,
        description: 'Please check your mail box and click on the activation link.',
        placement: 'top',
        duration: 7,
      });
    }
  };

  const dropdownOnClickHandler: MenuProps['onClick'] = async ({ key }) => {
    switch (key) {
      case 'logout':
        await appwrite?.account.deleteSession('current');
        router.replace('/sign-in');
        break;
      case 'signIn':
        router.replace('/sign-in');
        break;
      case 'signUp':
        router.replace('/sign-up');
        break;
      default:
        return;
    }
  };
  return showLayout ? (
    <Layout>
      <Sider className={styles['side-navigation']} trigger={null} collapsible collapsed={collapsed}>
        <div className={styles['logo']} />
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={router.pathname === '/' ? ['home'] : ['']}
          items={[
            {
              key: 'home',
              icon: <DashboardOutlined />,
              label: <Link href='/'>Home</Link>,
            },
          ]}
        />
      </Sider>
      <Layout className='site-layout'>
        <Header className={styles['header']} style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: styles['trigger'],
            onClick: () => setCollapsed(!collapsed),
          })}
          {authUser ? (
            <Dropdown menu={{ items: itemsLoggedIn, onClick: dropdownOnClickHandler }} trigger={['click']}>
              <Avatar className={styles['dropdown-button']} style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                {authUser.email[0].toUpperCase()}
              </Avatar>
            </Dropdown>
          ) : (
            <Dropdown menu={{ items: itemsNotLoggedIn, onClick: dropdownOnClickHandler }} trigger={['click']}>
              <Button className={styles['dropdown-button']} shape='circle' icon={<PoweroffOutlined />} />
            </Dropdown>
          )}
        </Header>
        {authUser && !authUser.emailVerification ? (
          <Alert
            message={
              <Row justify={'space-between'} align={'middle'}>
                <Text>Not verified yet, please confirm your E-Mail.</Text>
                <Button ref={mailSendButton} onClick={resendVerificationMail} icon={<MailOutlined />}>
                  Resend Verification E-Mail
                </Button>
              </Row>
            }
            type='warning'
          ></Alert>
        ) : (
          <></>
        )}

        <Content className={styles['content']}>{props.children}</Content>
      </Layout>
    </Layout>
  ) : (
    <Content>{props.children}</Content>
  );
};

export default SliderLayout;
