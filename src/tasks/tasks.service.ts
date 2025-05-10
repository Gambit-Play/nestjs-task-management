import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    constructor(private tasksRepo: TasksRepository) {}

    async getTasks(ilterDto: GetTasksFilterDto): Promise<Task[]> {
        const tasks = await this.tasksRepo.getTasks(ilterDto);
        return tasks;
    }

    async getTaskById(id: string): Promise<Task> {
        const task = await this.tasksRepo.findTaskById(id);

        if (!task) {
            throw new NotFoundException(`Task with ID '${id}' not found`);
        }

        return task;
    }

    createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const task = this.tasksRepo.createTask(createTaskDto);

        return task;
    }

    async deleteTaskById(id: string): Promise<void> {
        const result = await this.tasksRepo.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID '${id}' not found`);
        }
    }

    async updateTaskStatus(
        id: string,
        updateTaskStatusDto: UpdateTaskStatusDto,
    ): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = updateTaskStatusDto.status;
        await this.tasksRepo.save(task);

        return task;
    }
}
