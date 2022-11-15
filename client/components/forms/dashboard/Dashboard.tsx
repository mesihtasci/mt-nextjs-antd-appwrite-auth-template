import { Button, Checkbox, Form, Input, Col, Row, Typography, Alert, Card } from 'antd';
const { Title } = Typography;
import React, { useState } from 'react';
import styles from './Dashboard.module.css';
import DashboardTile from '../dashboard-tile/DashboardTile';

const Dashboard: React.FC = () => {
  return (
    <div className={styles['wrapper']}>
      <Row className={styles['row-max-width']} gutter={[24, 24]}>
        <Col span={12}>
          <Card className='dashboard-card__height'>
            <canvas id='myChart' height='300px'></canvas>
          </Card>
        </Col>
        <Col span={12}>
          <Card className='dashboard-card__height'>
            <canvas id='myChart2' height='300px'></canvas>
          </Card>
        </Col>

        <Col span={6}>
          <DashboardTile count={0} title='Ad Clicks'></DashboardTile>
        </Col>
        <Col span={6}>
          <DashboardTile count={0} title='Detected IPs'></DashboardTile>
        </Col>
        <Col span={6}>
          <DashboardTile count={0} title='Paying Visitors'></DashboardTile>
        </Col>
        <Col span={6}>
          <DashboardTile count={0} title='Clicks per Visit'></DashboardTile>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
