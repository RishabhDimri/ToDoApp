// AppContext.js
import React, { createContext, useState, useContext } from 'react';
import { dummyTasks } from '../utils/dummyData';
import { Appearance } from 'react-native';
import dayjs from 'dayjs';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [tasks, setTasks] = useState(dummyTasks);
  const [categories, setCategories] = useState([
    'All Tasks',
    'Today',
    'Important',
    'Planned',
    'Assigned to me'
  ]);
  const [isGridView, setIsGridView] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(Appearance.getColorScheme() === 'dark');

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now().toString() }]);
  };

  const updateTask = (taskId, updatedTask) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, ...updatedTask } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleTaskComplete = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const toggleTaskImportant = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, important: !task.important } : task
    ));
  };

  const addCategory = (category) => {
    setCategories([...categories, category]);
  };

  const filterTasks = (category) => {
    let filtered = tasks;

    // If a search query exists (nonempty) filter tasks by name.
    if (searchQuery && searchQuery.trim() !== '') {
      filtered = filtered.filter(task =>
        task.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    const today = dayjs().format('YYYY-MM-DD');
    const now = dayjs();

    switch (category) {
      case "Today":
        return filtered.filter(task => {
          const taskDate = dayjs(task.dueDate).format('YYYY-MM-DD');
          return taskDate === today;
        });
      case "Important":
        return filtered.filter(task => task.important);
      case "Planned":
        return filtered.filter(task => {
          if (!task.dueDate || !dayjs(task.dueDate).isValid()) {
            return false;
          }
          const taskDate = dayjs(task.dueDate);
          return taskDate.isSame(now, 'day') || taskDate.isAfter(now);
        });
      case "Assigned to me":
        return filtered.filter(task => task.assignedToMe);
      case "All Tasks":
      default:
        return filtered;
    }
  };

  return (
    <AppContext.Provider value={{
      tasks,
      isDarkMode,
      toggleDarkMode,
      categories,
      isGridView,
      searchVisible,
      searchQuery,
      addTask,
      updateTask,
      deleteTask,
      toggleTaskComplete,
      toggleTaskImportant,
      addCategory,
      setIsDarkMode,
      setIsGridView,
      setSearchVisible,
      setSearchQuery,
      filterTasks
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
export default AppContext;
