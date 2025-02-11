import React from 'react';
import { FlatList, StyleSheet, useColorScheme, View } from 'react-native';
import TaskItem from './TaskItem';
import { useApp } from '../context/AppContext';

const TaskList = ({ tasks }) => {
  const { isGridView } = useApp();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const themeStyles = {
    container: {
      backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
    }
  };

  return (
    <View style={[styles.wrapper, themeStyles.container]}>
      <FlatList
        data={tasks}
        key={isGridView ? 'grid' : 'list'}
        numColumns={isGridView ? 2 : 1}
        renderItem={({ item }) => <TaskItem task={item} isDarkMode={isDarkMode} />} 
        keyExtractor={item => item.id}
        contentContainerStyle={styles.container}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    padding: 15,
  },
});

export default TaskList;