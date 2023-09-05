import IToDo from '@/entities/ToDo/model/types/IToDo';
import { useId } from 'react';

const defaultTodos: IToDo[] = [
    {
        id: 1,
        value: 'Create project',
        status: 'done',
    },
    {
        id: 2,
        value: 'Share project',
        status: 'done',
    },
    {
        id: 3,
        value: 'Upgrade project',
        status: 'undone',
    },
];

export default defaultTodos;
