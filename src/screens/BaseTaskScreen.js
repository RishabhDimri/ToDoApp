import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity,Image } from 'react-native';
import TaskList from '../components/TaskList';
import AddTaskModal from '../components/AddTaskModal';
import TaskDetailsModal from '../components/TaskDetailsModal';
import { taskManager } from '../data/data';

const BaseTaskScreen = ({ tasks, setTasks, filterFunction }) => {
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [isDetailsModalVisible, setDetailsModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const filteredTasks = filterFunction ? filterFunction(tasks) : tasks;

  const handleAddTask = (newTask) => {
    setTasks(taskManager.addTask(tasks, newTask));
    setAddModalVisible(false);
  };

  const handleUpdateTask = (taskId, updates) => {
    setTasks(taskManager.updateTask(tasks, taskId, updates));
    setDetailsModalVisible(false);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(taskManager.deleteTask(tasks, taskId));
    setDetailsModalVisible(false);
  };

  const handleTaskPress = (task) => {
    setSelectedTask(task);
    setDetailsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <TaskList
        tasks={filteredTasks}
        onToggleComplete={(taskId) => setTasks(taskManager.toggleComplete(tasks, taskId))}
        onToggleImportant={(taskId) => setTasks(taskManager.toggleImportant(tasks, taskId))}
        onTaskPress={handleTaskPress}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setAddModalVisible(true)}
      >
        <Image 
          source={require('../assets/plus.png')} 
          style={{ width: 54, height: 54 }} 
        />
      </TouchableOpacity>

      <AddTaskModal
        visible={isAddModalVisible}
        onClose={() => setAddModalVisible(false)}
        onAdd={handleAddTask}
      />

      <TaskDetailsModal
        visible={isDetailsModalVisible}
        task={selectedTask}
        onClose={() => {
          setDetailsModalVisible(false);
          setSelectedTask(null);
        }}
        onUpdate={handleUpdateTask}
        onDelete={handleDeleteTask}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default BaseTaskScreen;