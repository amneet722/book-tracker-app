// src/components/ReadingStats.js
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
import '../pages/Dashboard.css'; // Ensure dashboard styles are imported

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
        backgroundColor: ['#f39c12', '#3498db', '#2ecc71'], /* Specific colors for bars */
        borderRadius: 8, /* Rounded bars */
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, /* Allow more control over height */
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: 'var(--text-medium)', /* Use variable for tick labels */
        },
        grid: {
          color: 'var(--border-color)', /* Use variable for grid lines */
        }
      },
      x: {
        ticks: {
          color: 'var(--text-medium)', /* Use variable for tick labels */
        },
        grid: {
          display: false, /* Remove x-axis grid lines */
        }
      }
    }
  };

  return (
    <div className="reading-stats-chart"> {/* Added class for styling */}
      <h3 className="stats-chart-title">Book Status Overview</h3> {/* Added class for title */}
      <div style={{ height: '300px', width: '100%' }}> {/* Wrapper to control chart size */}
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ReadingStats;