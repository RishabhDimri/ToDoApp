import React, { createContext, useContext, useState } from 'react';
import { initialTasks } from '../data/data';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(initialTasks);

  const value = {
    tasks,
    setTasks,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

export const useGlobalTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useGlobalTasks must be used within a TaskProvider');
  }
  return context;
};