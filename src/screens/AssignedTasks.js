import React from 'react';
import { useGlobalTasks } from '../context/TaskContext';
import BaseTaskScreen from './BaseTaskScreen';
import { filterTasks } from '../data/data';

const AssignedTasks = () => {
  const { tasks, setTasks } = useGlobalTasks();
  
  return (
    <BaseTaskScreen
      tasks={tasks}
      setTasks={setTasks}
      filterFunction={filterTasks.assigned}
    />
  );
};

export default AssignedTasks;