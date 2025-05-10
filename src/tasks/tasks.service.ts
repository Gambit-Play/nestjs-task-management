import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TasksRepository } from './tasks.repository';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
    // private tasks: Task[] = [];

    constructor(
        @Inject('TASKS_REPOSITORY')
        // private tasksRepo: Repository<Task>,
        private tasksRepo: TasksRepository,
    ) {}

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
        // const task = await this.tasksRepo.findOne({ where: { id } });

        if (!task) {
            throw new NotFoundException(`Task with ID '${id}' not found`);
        }

        return task;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = this.tasksRepo.create({
            title,
            description,
            status: TaskStatus.OPEN,
        });

        await this.tasksRepo.save(task);

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
