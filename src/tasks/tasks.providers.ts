import { DataSource } from 'typeorm';
import { Task } from './task.entity';
import { createTasksRepository } from './tasks.repository';

export const tasksProviders = [
    {
        provide: 'TASKS_REPOSITORY',
        // useFactory: (dataSource: DataSource) => dataSource.getRepository(Task),
        useFactory: (dataSource: DataSource) =>
            createTasksRepository(dataSource),
        inject: ['DATA_SOURCE'],
    },
];
