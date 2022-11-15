import { Card, Button, Checkbox, Form, Input } from 'antd';
import React, { ReactNode } from 'react';
import styles from './AuthformWrapper.module.css';

type Props = {
  children: ReactNode;
};

const AuthformWrapper: React.FC<Props> = (props) => {
  return (
    <div className={styles['authentication-form__wrapper']}>
      <Card className={styles['authentication-form']}>{props.children}</Card>
    </div>
  );
};

export default AuthformWrapper;
