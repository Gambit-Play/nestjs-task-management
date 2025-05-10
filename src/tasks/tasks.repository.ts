import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './tasks.enum';

@Injectable()
export class TasksRepository extends Repository<Task> {
    constructor(dataSource: DataSource) {
        super(Task, dataSource.createEntityManager());
    }

    async findTaskById(id: string): Promise<Task | null> {
        return this.findOne({ where: { id } });
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN,
        });

        await this.save(task);

        return task;
    }
}
