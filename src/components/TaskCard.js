import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TaskCard = ({ task, onToggleComplete, onToggleImportant, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={() => onPress(task)}
    >
      <TouchableOpacity 
        style={styles.checkbox}
        onPress={() => onToggleComplete(task.id)}
      >
        <Image 
          source={task.completed 
            ? require('../assets/select.png') 
            : require('../assets/square.png')} 
          style={{ width: 24, height: 24 }} 
        />
      </TouchableOpacity>
      
      <Text style={[
        styles.taskName,
        task.completed && styles.completedTask
      ]}>
        {task.name}
      </Text>
      
      <TouchableOpacity 
        style={styles.starButton}
        onPress={() => onToggleImportant(task.id)}
      >
        <Image 
          source={task.important 
            ? require('../assets/star.png') 
            : require('../assets/starchecked.png')} 
          style={{ width: 24, height: 24}} 
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 4,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  checkbox: {
    marginRight: 10,
  },
  taskName: {
    flex: 1,
    fontSize: 16,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#666',
  },
  starButton: {
    marginLeft: 10,
  },
});

export default TaskCard;