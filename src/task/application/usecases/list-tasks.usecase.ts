import { Injectable } from '@nestjs/common';
import { Task } from 'src/task/domain/entities/task.entity';
import { TaskRepositoryPort } from 'src/task/domain/ports/task-repository.port';

@Injectable()
export class ListTasksUseCase {
  constructor(private readonly taskRepository: TaskRepositoryPort) {}

  async execute(): Promise<Task[]> {
    return await this.taskRepository.findAll();
  }
}
