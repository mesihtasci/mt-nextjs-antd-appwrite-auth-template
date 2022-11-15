import { Layout, Menu, Row, Col, Card, Typography } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
const { Title } = Typography;

import { AppwriteContext } from '../components/wrappers/appwrite/Appwrite';
import AuthUserContext from '../context/authentication/AuthUserContext';
import Link from 'next/link';
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title as ChartTitle,
  Tooltip,
  SubTitle,
} from 'chart.js';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  ChartTitle,
  Tooltip,
  SubTitle,
);

import styles from './index.module.css';
import DashboardTile from '../components/forms/dashboard-tile/DashboardTile';
import Dashboard from '../components/forms/dashboard/Dashboard';
import PageTitleBar from '../components/page-title-bar/PageTitleBar';

const App: React.FC = () => {
  const { authUser, userUpdated } = useContext(AuthUserContext)!;
  const [chart, setChart] = useState<Chart>();
  const [chart2, setChart2] = useState<Chart>();

  useEffect(() => {
    if (authUser && userUpdated) {
      if (chart) chart.destroy();
      if (chart2) chart2.destroy();

      const ctx = document.getElementById('myChart') as HTMLCanvasElement;
      ctx.innerHTML = 'null';
      const data = {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [
          {
            type: 'bar',
            label: 'Bar Dataset',
            data: [40, 10, 15, 33],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
          },
          {
            type: 'line',
            label: 'Line Dataset',
            data: [10, 20, 30, 20],
            fill: false,
            borderColor: 'rgb(54, 162, 235)',
          },
        ],
      };

      const config = {
        type: 'scatter',
        data: data,
        options: {
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      };

      const ctx2 = document.getElementById('myChart2') as HTMLCanvasElement;
      ctx.innerHTML = 'null';
      const data2 = {
        labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
        datasets: [
          {
            label: 'My First Dataset',
            data: [11, 16, 7, 3, 14],
            backgroundColor: ['rgb(255, 99, 132)', 'rgb(75, 192, 192)', 'rgb(255, 205, 86)', 'rgb(201, 203, 207)', 'rgb(54, 162, 235)'],
          },
        ],
      };

      const config2 = {
        type: 'polarArea',
        data: data2,
        options: {},
      };

      setChart(new Chart(ctx, config as any));

      setChart2(new Chart(ctx2, config2 as any));
    }
  }, [userUpdated, authUser]);

  return (
    <>
      <PageTitleBar title='Home'></PageTitleBar>
      <Dashboard></Dashboard>
    </>
  );
};

export default App;
