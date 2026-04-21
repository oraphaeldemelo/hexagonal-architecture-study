import { Injectable } from '@nestjs/common';
import { TaskRepositoryPort } from 'src/task/domain/ports/task-repository.port';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Task } from 'src/task/domain/entities/task.entity';
import { InvalidTaskDueDateError } from 'src/task/domain/errors/task.errors';
import { TaskStatusEnum } from 'src/task/domain/enums';

@Injectable()
export class CreateTaskUseCase {
  constructor(private readonly taskRepository: TaskRepositoryPort) {}

  async execute(data: CreateTaskDto): Promise<Task> {
    const now = new Date();

    if (new Date(data.dueDate).getTime() < now.getTime()) {
      throw new InvalidTaskDueDateError();
    }

    const task: Task = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      status: TaskStatusEnum.PENDING,
      dueDate: new Date(data.dueDate),
      createdAt: now,
      updatedAt: now,
    };
    return this.taskRepository.create(task);
  }
}
