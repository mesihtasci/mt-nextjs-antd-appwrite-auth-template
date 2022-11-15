import { Button, Checkbox, Form, Input, Col, Row, Typography, Alert, Card } from 'antd';
const { Title } = Typography;
import React, { useEffect, useState } from 'react';
import styles from './DashboardTile.module.css';

const DashboardTile: React.FC<{ count: Number; title: String }> = (props) => {
  const [count, setCount] = useState<Number>(0);
  const [title, setTitle] = useState<String>('');
  useEffect(() => {
    setCount(props.count);
    setTitle(props.title);
  }, []);

  return (
    <Card className='dashboard-card__height'>
      <Row>
        <Col span={4}>
          <Title>{count.toString()}</Title>
        </Col>
        <Col span={20}>
          <Title level={3}>{title}</Title>
        </Col>
      </Row>
    </Card>
  );
};

export default DashboardTile;
