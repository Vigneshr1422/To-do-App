// script.js

document.addEventListener("DOMContentLoaded", () => {
    const categoriesContainer = document.getElementById("categories-container");
    const streakDisplay = document.getElementById("streak-display");
    const addCategoryBtn = document.getElementById("add-category-btn");
    const viewCategoriesBtn = document.getElementById("view-categories-btn");
    const streakBtn = document.getElementById("streak-btn");
  
    // Initialize categories from localStorage or set to an empty array
    let categories = JSON.parse(localStorage.getItem("categories"));
    if (!Array.isArray(categories)) {
      categories = [];
    }
  
    // Initialize streak counter
    let streakCount = parseInt(localStorage.getItem("streakCount")) || 0;
  
    // Function to render categories
    const renderCategories = () => {
      categoriesContainer.innerHTML = ""; // Clear existing categories
  
      if (categories.length === 0) {
        categoriesContainer.innerHTML = "<p>No categories available.</p>";
      } else {
        categories.forEach((category, index) => {
          const categoryCard = document.createElement("div");
          categoryCard.className = "category-card";
  
          const taskList = category.tasks
            .map(
              (task, taskIndex) => `
              <li class="${task.completed ? "completed" : ""}">
                <span>${task.name}</span>
                <button onclick="toggleTask(${index}, ${taskIndex})">
                  ${task.completed ? "Undo" : "Complete"}
                </button>
              </li>
            `
            )
            .join("");
  
          categoryCard.innerHTML = `
            <h3>${category.name}</h3>
            <ul>
              ${taskList}
            </ul>
            <button onclick="addTask(${index})">Add Task</button>
            <button onclick="checkStreak(${index})">Check Streak</button>
          `;
  
          categoriesContainer.appendChild(categoryCard);
        });
      }
    };
  
    // Function to toggle task completion
    window.toggleTask = (categoryIndex, taskIndex) => {
      categories[categoryIndex].tasks[taskIndex].completed =
        !categories[categoryIndex].tasks[taskIndex].completed;
      localStorage.setItem("categories", JSON.stringify(categories));
      renderCategories();
    };
  
    // Function to add a task to a category
    window.addTask = (categoryIndex) => {
      const taskName = prompt("Enter task name:");
      if (taskName) {
        categories[categoryIndex].tasks.push({ name: taskName, completed: false });
        localStorage.setItem("categories", JSON.stringify(categories));
        renderCategories();
      }
    };
  
    // Function to check if all tasks in a category are completed
    window.checkStreak = (categoryIndex) => {
      const allCompleted = categories[categoryIndex].tasks.every(
        (task) => task.completed
      );
      if (allCompleted) {
        alert(`${categories[categoryIndex].name} category completed!`);
        streakCount++;
        localStorage.setItem("streakCount", streakCount);
        renderStreak();
      } else {
        alert(`Not all tasks in ${categories[categoryIndex].name} are completed.`);
      }
    };
  
    // Function to render streak
    const renderStreak = () => {
      streakDisplay.style.display = "block";
      streakDisplay.innerHTML = `<p>Your current streak: ${streakCount} days</p>`;
    };
  
    // Event listener for adding a category
    addCategoryBtn.addEventListener("click", () => {
      const categoryName = prompt("Enter category name:");
      if (categoryName) {
        categories.push({ name: categoryName, tasks: [] });
        localStorage.setItem("categories", JSON.stringify(categories));
        renderCategories();
      }
    });
  
    // Event listener for viewing categories
    viewCategoriesBtn.addEventListener("click", renderCategories);
  
    // Event listener for checking streak
    streakBtn.addEventListener("click", renderStreak);
  
    renderCategories(); // Initial render
  });
  