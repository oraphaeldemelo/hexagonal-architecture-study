import { ListTasksUseCase } from 'src/task/application/usecases/list-tasks.usecase';
import { TaskStatusEnum } from 'src/task/domain/enums';
import { TaskRepositoryPort } from 'src/task/domain/ports/task-repository.port';

describe('ListTaskUseCase', () => {
  let repository: jest.Mocked<TaskRepositoryPort>;
  let useCase: ListTasksUseCase;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
      update: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
    };

    useCase = new ListTasksUseCase(repository);
  });

  it('shoud return all tasks', async () => {
    const tasks = [
      {
        id: '1',
        title: 'Task 1',
        description: 'Description 1',
        status: TaskStatusEnum.PENDING,
        dueDate: new Date('2026-04-10T10:00:00.000Z'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    repository.findAll.mockResolvedValue(tasks);

    const result = await useCase.execute();

    expect(repository.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(tasks);
  });
});
