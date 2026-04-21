export class TaskAlreadyCompletedError extends Error {
  constructor() {
    super('Task is already completed');
    this.name = 'TaskAlreadyCompletedError';
  }
}

export class InvalidTaskDueDateError extends Error {
  constructor() {
    super('Due date cannot be in the past');
    this.name = 'InvalidTaskDueDateError';
  }
}

export class TaskNotFoundError extends Error {
  constructor() {
    super('Task not found');
    this.name = 'TaskNotFoundError';
  }
}
