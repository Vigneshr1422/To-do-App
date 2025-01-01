import React, { useState } from 'react';

const CategoryForm = ({ onSubmit }) => {
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = () => {
    onSubmit({ name: categoryName, tasks: [] });
    setCategoryName('');
  };

  return (
    <div>
      <input
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        placeholder="Enter category name"
      />
      <button onClick={handleSubmit}>Create Category</button>
    </div>
  );
};

export default CategoryForm;
