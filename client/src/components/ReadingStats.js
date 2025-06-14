import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';
import '../pages/Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ReadingStats = ({ books }) => {
  const countByStatus = (status) =>
    books.filter((book) => book.status === status).length;

  const data = {
    labels: ['Wishlist', 'Currently Reading', 'Read'],
    datasets: [
      {
        label: 'Number of Books',
        data: [
          countByStatus('Wishlist'),
          countByStatus('Currently Reading'),
          countByStatus('Read')
        ],
        backgroundColor: ['#f39c12', '#3498db', '#2ecc71'],
        borderRadius: 8,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: 'var(--text-medium)',
        },
        grid: {
          color: 'var(--border-color)', 
        }
      },
      x: {
        ticks: {
          color: 'var(--text-medium)', 
        },
        grid: {
          display: false,
        }
      }
    }
  };

  return (
    <div className="reading-stats-chart">
      <h3 className="stats-chart-title">Book Status Overview</h3> 
      <div style={{ height: '300px', width: '100%' }}> 
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ReadingStats;