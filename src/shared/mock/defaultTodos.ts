import IToDo from '@/entities/ToDo/model/types/IToDo';
import { useId } from 'react';

const defaultTodos: IToDo[] = [
    {
        id: 1,
        value: 'Create project',
        status: 'done',
        form: 'normal',
    },
    {
        id: 2,
        value: 'Share project',
        status: 'done',
        form: 'normal',
    },
    {
        id: 3,
        value: 'Upgrade project',
        status: 'undone',
        form: 'normal',
    },
];

export default defaultTodos;
