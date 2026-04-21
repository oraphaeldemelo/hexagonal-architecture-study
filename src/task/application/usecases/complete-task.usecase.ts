import { Injectable } from '@nestjs/common';
import { TaskStatusEnum } from 'src/task/domain/enums';
import {
  TaskAlreadyCompletedError,
  TaskNotFoundError,
} from 'src/task/domain/errors/task.errors';
import { TaskRepositoryPort } from 'src/task/domain/ports/task-repository.port';

@Injectable()
export class CompleteTaskUseCase {
  constructor(private readonly taskRepository: TaskRepositoryPort) {}

  async execute(id: number) {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new TaskNotFoundError();
    }

    if (task.status === TaskStatusEnum.COMPLETED) {
      throw new TaskAlreadyCompletedError();
    }

    const taskUpdated = {
      ...task,
      status: TaskStatusEnum.COMPLETED,
      updatedAt: new Date(),
    };
    return await this.taskRepository.update(taskUpdated);
  }
}
