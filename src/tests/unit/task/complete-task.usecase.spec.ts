import { CompleteTaskUseCase } from 'src/task/application/usecases/complete-task.usecase';
import { Task } from 'src/task/domain/entities/task.entity';
import { TaskStatusEnum } from 'src/task/domain/enums';
import {
  TaskAlreadyCompletedError,
  TaskNotFoundError,
} from 'src/task/domain/errors/task.errors';
import { TaskRepositoryPort } from 'src/task/domain/ports/task-repository.port';

describe('CompleteTasksUseCase', () => {
  let repository: jest.Mocked<TaskRepositoryPort>;
  let useCase: CompleteTaskUseCase;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
    };

    useCase = new CompleteTaskUseCase(repository);
  });

  it('should complete a task successfully', async () => {
    const task: Task = {
      id: '1',
      title: 'Task 1',
      description: 'Description',
      status: TaskStatusEnum.PENDING,
      dueDate: new Date('2026-04-10T10:00:00.000Z'),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    repository.findById.mockResolvedValue(task);
    repository.update.mockImplementation(
      async (updatedTask: Task) => updatedTask,
    );

    const result = await useCase.execute(1);

    expect(repository.findById).toHaveBeenCalledWith(1);
    expect(repository.update).toHaveBeenCalledTimes(1);
    expect(result.status).toBe(TaskStatusEnum.COMPLETED);
  });

  it('should throw TaskNotFoundError when task does not exist', async () => {
    repository.findById.mockResolvedValue(null);

    await expect(useCase.execute(1)).rejects.toThrow(TaskNotFoundError);

    expect(repository.update).not.toHaveBeenCalled();
  });

  it('should throw TaskAlreadyCompletedError when task is already completed', async () => {
    const task: Task = {
      id: '1',
      title: 'Task 1',
      description: 'Descricao',
      status: TaskStatusEnum.COMPLETED,
      dueDate: new Date('2026-04-10T10:00:00.000Z'),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    repository.findById.mockResolvedValue(task);

    await expect(useCase.execute(1)).rejects.toThrow(TaskAlreadyCompletedError);

    expect(repository.update).not.toHaveBeenCalled();
  });
});
