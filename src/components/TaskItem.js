// TaskItem.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { useApp } from '../context/AppContext';
import TaskModal from './TaskModal';

const { width } = Dimensions.get('window');

const TaskItem = ({ task, isDarkMode, isLast, hideDivider }) => {
  const { toggleTaskComplete, toggleTaskImportant, isGridView } = useApp();
  const [modalVisible, setModalVisible] = useState(false);

  // Define inline color values based on the isDarkMode prop
  const bgColor = isDarkMode ? '#000000' : '#FFFFFF';
  const textColor = isDarkMode ? '#FFFFFF' : '#000000';
  const iconColor = isDarkMode ? '#FFFFFF' : '#000000';

  return (
    <>
      <TouchableOpacity
        style={[
          styles.container,
          isGridView ? styles.gridItem : styles.listItem,
          { backgroundColor: bgColor },
          // Only add the divider line if this is not the last item and not immediately before a header.
          !isLast && !hideDivider && {
            borderBottomWidth: 1,
            borderBottomColor: isDarkMode ? '#FFFFFF' : '#CCCCCC',
          },
        ]}
        onPress={() => setModalVisible(true)}
      >
        {isGridView ? (
          <View style={[styles.gridContent, { backgroundColor: bgColor }]}>
            <Text
              style={[
                styles.taskName,
                task.completed && styles.completedTask,
                styles.flexText,
                { color: textColor },
              ]}
            >
              {task.name}
            </Text>
            <View style={styles.gridIconContainer}>
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => toggleTaskComplete(task.id)}
              >
                <Image 
                  source={
                    task.completed 
                      ? require('../assets/select.png') 
                      : require('../assets/square.png')
                  }
                  style={[
                    { width: 24, height: 24 },
                    !task.completed && isDarkMode && { tintColor: '#FFFFFF' },
                  ]}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => toggleTaskImportant(task.id)}>
                <Image
                  source={require('../assets/star.png')}
                  style={[
                    styles.starIcon,
                    task.important
                      ? styles.importantTask
                      : { tintColor: iconColor },
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={[styles.listContent, { backgroundColor: bgColor }]}>
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => toggleTaskComplete(task.id)}
            >
              <Image 
                source={
                  task.completed 
                    ? require('../assets/select.png') 
                    : require('../assets/square.png')
                }
                style={[
                  { width: 24, height: 24 },
                  !task.completed && isDarkMode && { tintColor: '#FFFFFF' },
                ]}
              />
            </TouchableOpacity>
            <Text
              style={[
                styles.taskName,
                task.completed && styles.completedTask,
                styles.flexText,
                { color: textColor },
              ]}
            >
              {task.name}
            </Text>
            <TouchableOpacity onPress={() => toggleTaskImportant(task.id)}>
              <Image
                source={require('../assets/star.png')}
                style={[
                  styles.starIcon,
                  task.important
                    ? styles.importantTask
                    : { tintColor: iconColor },
                ]}
              />
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
      <TaskModal
        task={task}
        isDarkMode={isDarkMode}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 10,
    width: '100%',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    width: '100%',
  },
  gridItem: {
    padding: 10,
    height: 80,
    width: '100%',
  },
  gridContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  gridIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  taskName: {
    fontSize: 16,
    textAlign: 'left',
    padding: 5,
    borderRadius: 4,
  },
  flexText: {
    flex: 1,
  },
  completedTask: {
    textDecorationLine: 'line-through',
  },
  starIcon: {
    width: 24,
    height: 24,
  },
  importantTask: {
    tintColor: '#FFD700', // Gold tint for important tasks
  },
});

export default TaskItem;
