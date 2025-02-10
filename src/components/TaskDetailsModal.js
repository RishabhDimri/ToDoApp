import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

const TaskDetailsModal = ({ visible, task, onClose, onUpdate, onDelete }) => {
  const [name, setName] = useState(task?.name || '');
  const [notes, setNotes] = useState(task?.notes || '');
  const [dueDate, setDueDate] = useState(task?.dueDate ? dayjs(task.dueDate) : dayjs());
  const [isCompleted, setIsCompleted] = useState(task?.completed || false);
  const [isImportant, setIsImportant] = useState(task?.important || false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (task) {
      setName(task.name);
      setNotes(task.notes || '');
      setDueDate(task.dueDate ? dayjs(task.dueDate) : dayjs());
      setIsCompleted(task.completed || false);
      setIsImportant(task.important || false);
    }
  }, [task]);

  const handleSave = () => {
    if (name.trim()) {
      onUpdate(task.id, {
        name: name.trim(),
        notes: notes.trim(),
        dueDate: dueDate ? dueDate.format('YYYY-MM-DD') : null,
        completed: isCompleted,
        important: isImportant,
      });
      onClose();
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => onDelete(task.id), style: 'destructive' },
      ]
    );
  };

  if (!task) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Task Details</Text>
            <TouchableOpacity onPress={onClose}>
            <Image 
              source={require('../assets/close.png')} 
              style={{ width: 34, height: 34}} 
            />

            </TouchableOpacity>
          </View>

          <ScrollView>
            {/* Task Name Input */}
            <TextInput
              style={styles.nameInput}
              value={name}
              onChangeText={setName}
              placeholder="Task name"
            />

            {/* Completion & Importance Icons */}
            <View style={styles.row}>
              <TouchableOpacity onPress={() => setIsCompleted(!isCompleted)} style={styles.iconButton}>
                <Image 
                  source={task.completed 
                    ? require('../assets/select.png') 
                    : require('../assets/square.png')} 
                  style={{ width: 24, height: 24 }} 
                />
                <Text style={styles.iconText}>Completed</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setIsImportant(!isImportant)} style={styles.iconButton}>
                <Image 
                  source={task.important 
                    ? require('../assets/star.png') 
                    : require('../assets/starchecked.png')} 
                  style={{ width: 24, height: 24}} 
                />
                <Text style={styles.iconText}>Important</Text>
              </TouchableOpacity>
            </View>
            
            {/* Due Date Section */}
            <Text style={styles.label}>Due Date</Text>
            <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(!showDatePicker)}>
            <Image 
              source={require('../assets/event.png')} 
              style={{ width: 20, height: 20, tintColor: 'rgba(248, 5, 5, 0.5)' }} 
            />

              <Text style={styles.dateButtonText}>
                {dueDate ? dueDate.format('MMM DD, YYYY') : 'Select due date'}
              </Text>
            </TouchableOpacity>

            {/* New Date Picker */}
            {showDatePicker && (
              <DateTimePicker
                mode="single"
                date={dueDate}
                onChange={(params) => {
                  setDueDate(params.date);
                  setShowDatePicker(false);
                }}
                minDate={dayjs()} // Prevent past dates
              />
            )}

            {/* Notes Input */}
            <Text style={styles.label}>Notes</Text>
            <TextInput
              style={styles.notesInput}
              value={notes}
              onChangeText={setNotes}
              placeholder="Add notes"
              multiline
              textAlignVertical="top"
            />

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
                <Text style={[styles.buttonText, styles.deleteButtonText]}>Delete</Text>
              </TouchableOpacity>

              <View style={styles.rightButtons}>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
                  <Text style={[styles.buttonText, styles.saveButtonText]}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  nameInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#666',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
  },
  dateButtonText: {
    marginLeft: 8,
    color: '#007AFF',
    fontSize: 16,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    height: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  rightButtons: {
    flexDirection: 'row',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginLeft: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#FFF0F0',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  deleteButtonText: {
    color: '#FF3B30',
    marginLeft: 8,
  },
  saveButtonText: {
    color: '#fff',
  },
});

export default TaskDetailsModal;
