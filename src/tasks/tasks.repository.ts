import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';

// export class TasksRepository extends Repository<Task> {
//     async findTaskById(id: string): Promise<Task | null> {
//         const task = await this.findOne({ where: { id } });

//         return task;
//     }
// }

// export class TasksRepository extends Repository<Task> {
//     constructor(
//         @InjectRepository(Task)
//         private taskRepository: Repository<Task>,
//     ) {
//         super(
//             taskRepository.target,
//             taskRepository.manager,
//             taskRepository.queryRunner,
//         );
//     }

//     // sample method for demo purposes
//     async findById(id: string): Promise<Task | null> {
//         return await this.taskRepository.findOneBy({ id });
//     }
// }

export const createTasksRepository = (dataSource: DataSource) => {
    return dataSource.getRepository(Task).extend({
        async findTaskById(id: string): Promise<Task | null> {
            // REMOVE:
            console.log('::::::00::::::');
            return this.findOne({ where: { id } });
        },
    });
};

export type TasksRepository = ReturnType<typeof createTasksRepository>;
