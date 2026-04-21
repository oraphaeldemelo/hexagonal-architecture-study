import { Module } from '@nestjs/common';
import { TaskController } from './adapters/input/http/task.controller';
import { CreateTaskUseCase } from './application/usecases/create-task.usecase';
import { InMemoryTaskRepository } from './adapters/output/persistence/in-memory-task.repository';
import { TaskRepositoryPort } from './domain/ports/task-repository.port';
import { ListTasksUseCase } from './application/usecases/list-tasks.usecase';
import { FindTaskByIdUseCase } from './application/usecases/find-task-by-id.usecase';
import { CompleteTaskUseCase } from './application/usecases/complete-task.usecase';

@Module({
  controllers: [TaskController],
  providers: [
    CreateTaskUseCase,
    ListTasksUseCase,
    FindTaskByIdUseCase,
    CompleteTaskUseCase,
    {
      provide: TaskRepositoryPort,
      useClass: InMemoryTaskRepository,
    },
  ],
})
export class TaskModule {}
