// src/components/ReadingGoals.js
import React, { useState } from 'react'; // No useEffect needed if books are props
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import '../pages/Dashboard.css'; // Use dashboard styles for overall container

const COLORS = ['#2ecc71', '#e74c3c', '#f1c40f', '#3498db', '#9b59b6']; // More colors

const ReadingGoals = ({ books }) => {
  const [goal, setGoal] = useState(10);

  const statusCounts = {
    'Read': 0,
    'Currently Reading': 0,
    'Wishlist': 0
  };

  books.forEach(book => {
    if (statusCounts.hasOwnProperty(book.status)) {
      statusCounts[book.status]++;
    }
  });

  const totalRead = statusCounts['Read'];
  const goalLeft = Math.max(0, goal - totalRead);

  const pieData = [
    { name: 'Read', value: totalRead },
    { name: 'Remaining', value: goalLeft }
  ];

  const barData = Object.entries(statusCounts).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="reading-goals-stats-container"> {/* Container for goals and stats */}
      <div className="goal-input-section">
        <label>
          Set Annual Goal:
          <input
            type="number"
            value={goal}
            onChange={(e) => setGoal(Math.max(1, parseInt(e.target.value) || 0))}
            min="1"
            className="goal-input" /* Added class for styling */
          />
        </label>
      </div>

      <div className="charts-wrapper"> {/* Flex container for the two charts */}
        <div className="chart-card">
          <h3>📘 Goal Completion</h3>
          <p className="chart-info">{totalRead} of {goal} books read</p> {/* Central info */}
          <ResponsiveContainer width="100%" height={250}> {/* Adjusted height slightly */}
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80} /* Slightly smaller radius */
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                dataKey="value"
                fill="#8884d8" /* Default fill for the pie */
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value} books`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>📚 Status Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}> {/* Adjusted height slightly */}
            <BarChart data={barData}>
              <XAxis dataKey="name" stroke="var(--text-medium)" /> {/* Use color variable */}
              <YAxis allowDecimals={false} stroke="var(--text-medium)" />
              <Tooltip />
              <Bar dataKey="value" fill="var(--primary-color)" radius={[4, 4, 0, 0]}>
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ReadingGoals;