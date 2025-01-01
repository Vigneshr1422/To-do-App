import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function HomePage({ categories, addCategory }) {
  const [categoryName, setCategoryName] = useState('');

  const handleAddCategory = () => {
    if (categoryName) {
      addCategory(categoryName);
      setCategoryName('');
    }
  };

  return (
    <div>
      <h2>Home</h2>
      <input
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        placeholder="Enter category name"
      />
      <button onClick={handleAddCategory}>Add Category</button>

      <h3>Categories</h3>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <Link to={`/category/${index}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
      <Link to="/streak">View Streak</Link>
    </div>
  );
}

export default HomePage;
