import React from 'react';

function StreakPage({ categories }) {
  const streaks = categories.map((category) => {
    const allTasksCompleted = category.tasks.every((task) => task.completed);
    return allTasksCompleted ? 1 : 0;
  });

  const totalStreak = streaks.reduce((total, streak) => total + streak, 0);

  return (
    <div>
      <h2>Streak</h2>
      <p>Total Streak: {totalStreak}</p>
      {categories.map((category, index) => (
        <div key={index}>
          <h3>{category.name} Streak</h3>
          <p>{category.tasks.every((task) => task.completed) ? 'Completed' : 'Not Completed'}</p>
        </div>
      ))}
    </div>
  );
}

export default StreakPage;
