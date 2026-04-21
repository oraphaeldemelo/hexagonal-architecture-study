import { Injectable } from '@nestjs/common';
import { TaskRepositoryPort } from 'src/task/domain/ports/task-repository.port';

@Injectable()
export class FindTaskByIdUseCase {
  constructor(private readonly taskRepository: TaskRepositoryPort) {}

  async execute(id: number) {
    return await this.taskRepository.findById(id);
  }
}
