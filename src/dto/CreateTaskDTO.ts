export interface CreateTaskDTO {
  title: string;
  description?: string;
  status?: string;
}

export interface UpdateTaskDTO {
  title?: string;
  description?: string;
  status?: string;
}
