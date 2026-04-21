import { CreateTaskUseCase } from 'src/task/application/usecases/create-task.usecase';
import { Task } from 'src/task/domain/entities/task.entity';
import { TaskStatusEnum } from 'src/task/domain/enums';
import { InvalidTaskDueDateError } from 'src/task/domain/errors/task.errors';
import { TaskRepositoryPort } from 'src/task/domain/ports/task-repository.port';

describe('CreateTaskUseCase', () => {
  let repository: jest.Mocked<TaskRepositoryPort>;
  let useCase: CreateTaskUseCase;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
    };

    useCase = new CreateTaskUseCase(repository);
  });

  it('should create a task with PENDING status', async () => {
    const input = {
      title: 'Hexagonal Architecture',
      description: 'Create a first test',
      dueDate: new Date('2027-04-10T10:00:00.000Z'),
    };

    repository.create.mockImplementation(async (task: Task) => task);

    const result = await useCase.execute(input);

    expect(repository.create).toHaveBeenCalledTimes(1);
    expect(result.title).toBe(input.title);
    expect(result.description).toBe(input.description);
    expect(result.status).toBe(TaskStatusEnum.PENDING);
  });

  it('should throw INvalidTaskDueDateError when due date is in the past', async () => {
    const input = {
      title: 'Invalid Task',
      description: 'Invalid Date',
      dueDate: new Date('2020-01-01T00:00:00.000Z'),
    };

    await expect(useCase.execute(input)).rejects.toThrow(
      InvalidTaskDueDateError,
    );

    expect(repository.create).not.toHaveBeenCalled();
  });
});
