import { TaskStatusEnum } from '../enums';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatusEnum;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
