import React from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, onToggleComplete, onToggleImportant, onTaskPress }) => {
  const sections = [
    {
      title: 'In Progress',
      data: tasks.filter(task => !task.completed),
    },
    {
      title: 'Completed',
      data: tasks.filter(task => task.completed),
    },
  ];

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TaskCard
          task={item}
          onToggleComplete={onToggleComplete}
          onToggleImportant={onToggleImportant}
          onPress={onTaskPress}
        />
      )}
      renderSectionHeader={({ section: { title } }) => (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
      )}
      stickySectionHeadersEnabled={false}
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingTop: 8,
    paddingBottom: 20,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f8f8f8',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
});

export default TaskList;