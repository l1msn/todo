import { toDoStatus } from '@/entities/ToDo/model/types/toDoStatus';

interface IToDo {
    id: number;
    value: string;
    status: toDoStatus;
}

export default IToDo;
