import { Task } from '../entities/task.entity';

export abstract class TaskRepositoryPort {
  abstract create(task: Task): Promise<Task>;
  abstract findAll(): Promise<Task[]>;
  abstract findById(id: number): Promise<Task | null>;
  abstract update(task: Task): Promise<Task>;
}
