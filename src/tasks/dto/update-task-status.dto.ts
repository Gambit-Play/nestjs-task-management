import { IsEnum } from 'class-validator';
import { TaskStatus } from '../tasks.enum';

export class UpdateTaskStatusDto {
    @IsEnum(TaskStatus)
    readonly status: TaskStatus;
}
