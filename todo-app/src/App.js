// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import StreakPage from './pages/StreakPage';
import RealTimeApp from './components/RealTimeApp'; // Import the real-time component
import './App.css';

function App() {
  const [categories, setCategories] = useState([]);
  
  const addCategory = (category) => {
    setCategories([...categories, { name: category, tasks: [] }]);
  };

  return (
    <Router>
      <div className="App">
        <h1 className="app-header">Todo App</h1>
        <Routes>
          <Route
            path="/"
            element={<HomePage categories={categories} addCategory={addCategory} />}
          />
          <Route
            path="/category/:id"
            element={<CategoryPage categories={categories} setCategories={setCategories} />}
          />
          <Route
            path="/streak"
            element={<StreakPage categories={categories} />}
          />
          <Route
            path="/realtime"
            element={<RealTimeApp />} // New route for real-time app
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
