import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
    constructor(private tasksRepo: TasksRepository) {}

    // getAllTasks() {
    //     return this.tasks;
    // }

    // getTasksWithFilters(filterDto: GetTasksFilterDto) {
    //     const { status, search } = filterDto;
    //     let tasks = this.getAllTasks();

    //     // this.tasksRepo.findTaskByTitle(search);

    //     if (status) {
    //         tasks = tasks.filter(task => task.status === status);
    //     }
    //     if (search) {
    //         tasks = tasks.filter(
    //             task =>
    //                 task.title.toLowerCase().includes(search.toLowerCase()) ||
    //                 task.description
    //                     .toLowerCase()
    //                     .includes(search.toLowerCase()),
    //         );
    //     }

    //     return tasks;
    // }

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

    // deleteTaskById(id: string): void {
    //     const task = this.getTaskById(id);
    //     this.tasks = this.tasks.filter(t => t.id !== task.id);
    // }

    // updateTaskStatus(
    //     id: string,
    //     updateTaskStatusDto: UpdateTaskStatusDto,
    // ): Task {
    //     const task = this.getTaskById(id);
    //     task.status = updateTaskStatusDto.status;

    //     return task;
    // }
}
