export const isCategoryComplete = (tasks) => {
    return tasks.every(task => task.completed);
  };
  