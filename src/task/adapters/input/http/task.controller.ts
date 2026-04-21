import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateTaskUseCase } from 'src/task/application/usecases/create-task.usecase';
import { CreateTaskBodyDto } from './dto/create-task-body.dto';
import { ListTasksUseCase } from 'src/task/application/usecases/list-tasks.usecase';
import { FindTaskByIdUseCase } from 'src/task/application/usecases/find-task-by-id.usecase';
import { CompleteTaskUseCase } from 'src/task/application/usecases/complete-task.usecase';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly listTasksUseCase: ListTasksUseCase,
    private readonly findTaskByIdUseCase: FindTaskByIdUseCase,
    private readonly completeTaskUseCase: CompleteTaskUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateTaskBodyDto) {
    return this.createTaskUseCase.execute({
      title: body.title,
      description: body.description,
      dueDate: new Date(body.dueDate),
    });
  }

  @Get()
  async findAll() {
    return this.listTasksUseCase.execute();
  }
  @Get('/:id')
  async findTaskById(@Param('id') id: number) {
    return this.findTaskByIdUseCase.execute(id);
  }

  @Put('/:id/complete')
  async completeTask(@Param('id') id: number) {
    return this.completeTaskUseCase.execute(id);
  }
}
