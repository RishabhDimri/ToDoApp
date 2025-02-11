export const dummyTasks = [
  {
    id: '1',
    name: 'Complete project presentation',
    completed: false,
    important: true,
    dueDate: '2025-02-15',
    reminder: '2025-02-15T09:00:00.000Z',
    repeat: false,
    notes: 'Include Q4 metrics and future roadmap',
    category: 'Important'
  },
  {
    id: '2',
    name: 'Schedule team meeting',
    completed: true,
    important: false,
    dueDate: '2025-02-10',
    category: "Today's Tasks"
  },
  {
    id: '3',
    name: 'Review code PR',
    completed: false,
    important: true,
    dueDate: '2025-02-12',
    assignedToMe: true, // Ensure this field exists
    category: 'Assigned to Me'
  },
  {
    id: '4',
    name: 'Update documentation',
    completed: false,
    important: false,
    dueDate: '2025-02-20',
    category: 'Planned'
  },
  {
    id: '5',
    name: 'Weekly report submission',
    completed: false,
    important: true,
    repeat: true,
    dueDate: '2025-02-10',
    category: "Today's Tasks"
  },
  {
    id: '6',
    name: 'Fix login bug',
    completed: false,
    important: false,
    assignedToMe: true, // Additional assigned task
    category: 'Assigned to Me'
  }
];
