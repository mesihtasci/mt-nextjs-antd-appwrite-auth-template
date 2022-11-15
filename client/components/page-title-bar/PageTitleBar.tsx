import { Button, PageHeader, Form, Input, Col, Row, Typography, Alert } from 'antd';
const { Title } = Typography;
import React, { useContext, useEffect, useState } from 'react';
import styles from './PageTitleBar.module.css';

const PageTitleBar: React.FC<{ title: String; subTitle?: String }> = (props) => {
  const [title, setTitle] = useState<String>('');
  const [subTitle, setSubTitle] = useState<String>('');

  useEffect(() => {
    setTitle(props.title);

    if (props.subTitle) setSubTitle(props.subTitle);
  }, []);

  return (
    <div className={styles['page-header__wrapper']}>
      <div className={styles['page-header_background']}></div>
      <PageHeader className='site-page-header' title={title} subTitle={subTitle} />
    </div>
  );
};

export default PageTitleBar;
