import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import {
  InvalidTaskDueDateError,
  TaskAlreadyCompletedError,
  TaskNotFoundError,
} from 'src/task/domain/errors/task.errors';

@Catch()
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    if (exception instanceof TaskNotFoundError) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message: exception.message,
        error: exception.name,
      });
    }

    if (exception instanceof TaskAlreadyCompletedError) {
      return response.status(HttpStatus.CONFLICT).json({
        message: exception.message,
        error: exception.name,
      });
    }

    if (exception instanceof InvalidTaskDueDateError) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: exception.message,
        error: exception.name,
      });
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error',
      error: 'InternalServerError',
    });
  }
}
