import { Injectable } from '@nestjs/common';
import { Task } from 'src/task/domain/entities/task.entity';
import { TaskRepositoryPort } from 'src/task/domain/ports/task-repository.port';

@Injectable()
export class InMemoryTaskRepository extends TaskRepositoryPort {
  private readonly tasks: Task[] = [];

  async create(task: Task): Promise<Task> {
    this.tasks.push(task);
    return task;
  }

  async findAll(): Promise<Task[]> {
    return this.tasks;
  }

  async findById(id: number): Promise<Task | null> {
    const task = this.tasks.find((item) => item.id === id.toString());
    return task ?? null;
  }

  async update(task: Task): Promise<Task> {
    const index = this.tasks.findIndex((item) => item.id === task.id);

    if (index === -1) {
      throw new Error('Task not found');
    }

    this.tasks[index] = task;
    return task;
  }
}
