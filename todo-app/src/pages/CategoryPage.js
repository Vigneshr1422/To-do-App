import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function CategoryPage({ categories, setCategories }) {
  const { id } = useParams();
  const category = categories[id];
  const [taskName, setTaskName] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleAddTask = () => {
    if (taskName) {
      const updatedCategory = { ...category, tasks: [...category.tasks, { name: taskName, completed }] };
      const updatedCategories = [...categories];
      updatedCategories[id] = updatedCategory;
      setCategories(updatedCategories);
      setTaskName('');
      setCompleted(false);
    }
  };

  const handleCompleteTask = (taskIndex) => {
    const updatedCategory = { ...category };
    updatedCategory.tasks[taskIndex].completed = !updatedCategory.tasks[taskIndex].completed;
    const updatedCategories = [...categories];
    updatedCategories[id] = updatedCategory;
    setCategories(updatedCategories);
  };

  return (
    <div>
      <h2>{category.name}</h2>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Enter task name"
      />
      <button onClick={handleAddTask}>Add Task</button>

      <h3>Tasks</h3>
      <ul>
        {category.tasks.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleCompleteTask(index)}
            />
            {task.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryPage;
