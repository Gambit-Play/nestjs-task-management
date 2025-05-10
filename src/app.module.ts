import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [
        TasksModule,
        DatabaseModule,
        ConfigModule.forRoot(),
        // TypeOrmModule.forRoot({
        //     type: 'postgres',
        //     host: 'localhost',
        //     port: 5433,
        //     username: 'postgres',
        //     password: 'postgres',
        //     database: 'task-management',
        //     autoLoadEntities: true,
        //     synchronize: true,
        // }),
    ],
})
export class AppModule {}
