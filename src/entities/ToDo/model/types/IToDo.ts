import { toDoStatus } from '@/entities/ToDo/model/types/toDoStatus';

type formToDo = 'normal' | 'edit';

interface IToDo {
    id: number;
    value: string;
    status: toDoStatus;
    form: formToDo;
}

export default IToDo;
