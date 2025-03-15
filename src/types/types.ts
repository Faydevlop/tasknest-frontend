export type TaskStatus = 'done' | 'pending' | 'inProgress';

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  status: TaskStatus;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
}