import React from 'react';
import { useGlobalTasks } from '../context/TaskContext'; // We'll create this context later
import BaseTaskScreen from './BaseTaskScreen';
import { filterTasks } from '../data/data';

const AllTasks = () => {
  const { tasks, setTasks } = useGlobalTasks();
  
  return (
    <BaseTaskScreen
      tasks={tasks}
      setTasks={setTasks}
      filterFunction={filterTasks.all}
    />
  );
};

export default AllTasks;