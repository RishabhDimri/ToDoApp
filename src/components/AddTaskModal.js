import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

const AddTaskModal = ({ visible, onClose, onAdd }) => {
  const [taskName, setTaskName] = useState('');
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [dueDate, setDueDate] = useState(dayjs());

  const handleSubmit = () => {
    if (taskName.trim()) {
      onAdd({
        name: taskName.trim(),
        dueDate: dueDate ? dueDate.format('YYYY-MM-DD') : null,
        notes: '',
        important: false,
        completed: false,
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setTaskName('');
    setDueDate(dayjs());
    setOpenDatePicker(false);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>New Task</Text>
            <TouchableOpacity onPress={handleClose}>
            <Image 
              source={require('../assets/close.png')} 
              style={{ width: 34, height: 34}} 
            />
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Task name"
            value={taskName}
            onChangeText={setTaskName}
            autoFocus
          />

          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setOpenDatePicker(!openDatePicker)}
          >
            <Image 
              source={require('../assets/event.png')} 
              style={{ width: 20, height: 20}} 
            />
            <Text style={styles.dateButtonText}>
              {dueDate ? dueDate.format('MMM DD, YYYY') : 'Add due date'}
            </Text>
          </TouchableOpacity>

          {openDatePicker && (
            <DateTimePicker
              mode="single"
              date={dueDate}
              onChange={(params) => {
                setDueDate(params.date);
                setOpenDatePicker(false);
              }}
              minDate={dayjs()} // Prevent past dates
            />
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleClose}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.addButton]}
              onPress={handleSubmit}
            >
              <Text style={[styles.buttonText, styles.addButtonText]}>
                Add Task
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '85%',
    elevation: 5,
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
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginLeft: 12,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  addButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  addButtonText: {
    color: '#fff',
  },
});

export default AddTaskModal;