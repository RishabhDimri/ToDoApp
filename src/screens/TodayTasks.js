import React from 'react';
import { useGlobalTasks } from '../context/TaskContext';
import BaseTaskScreen from './BaseTaskScreen';
import { filterTasks } from '../data/data';

const TodayTasks = () => {
  const { tasks, setTasks } = useGlobalTasks();
  
  return (
    <BaseTaskScreen
      tasks={tasks}
      setTasks={setTasks}
      filterFunction={filterTasks.today}
    />
  );
};

export default TodayTasks;