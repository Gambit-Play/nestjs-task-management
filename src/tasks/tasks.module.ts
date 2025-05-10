import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';
import { DataSource } from 'typeorm';
import { tasksProviders } from './tasks.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    // imports: [TypeOrmModule.forFeature([Task])],
    imports: [DatabaseModule],
    controllers: [TasksController],
    providers: [TasksService, ...tasksProviders],
})
export class TasksModule {}

// @Module({
//     imports: [TypeOrmModule.forFeature([Task])],
//     exports: [TasksService],
//     providers: [TasksService, TasksRepository],
// })
// export class TasksModule {}
