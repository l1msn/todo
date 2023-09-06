import { useCallback, useMemo } from 'react';
import IToDo from '../../types/IToDo';
import { toDoQuery } from '../../types/toDoQuery';

// необходимые состояния и сеттеры
interface IUseToDoTabsOptions {
    toDo: IToDo[];
    setToDo: React.Dispatch<React.SetStateAction<IToDo[]>>;
    sortQuery: toDoQuery;
    setValueInput: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * @description Логика списка дел
 */
function useToDoTabs(options: IUseToDoTabsOptions) {
    const { setToDo, toDo, sortQuery, setValueInput } = options;

    // Удаление
    const deleteToDo = useCallback(
        (item: IToDo) => {
            setToDo((prevState) => {
                const newTodos = [...prevState].filter((todo: IToDo) => {
                    return item.id !== todo.id;
                });
                localStorage.setItem('todos', JSON.stringify([...newTodos]));
                return [...newTodos];
            });
        },
        [setToDo],
    );

    // Сортировка
    const sortedToDo = useMemo(() => {
        if (sortQuery == 'all') {
            return toDo;
        } else {
            const sotredTodos = toDo.filter(
                (item: IToDo) => item.status == sortQuery,
            );
            return sotredTodos;
        }
    }, [toDo, sortQuery]);

    // Изменение состояния выполнения
    const editStatusToDo = useCallback(
        (item: IToDo) => {
            const doneItem: IToDo = {
                ...item,
                status: item.status == 'done' ? 'undone' : 'done',
            };
            setToDo((prevState) => {
                const newToDos = [...prevState].filter(
                    (item: IToDo) => item.id != doneItem.id,
                );
                localStorage.setItem(
                    'todos',
                    JSON.stringify([...newToDos, doneItem]),
                );
                return [...newToDos, doneItem];
            });
        },
        [setToDo],
    );

    // Изменение состояния редактирования
    const editFormTodo = useCallback(
        (item: IToDo) => {
            const doneItem: IToDo = {
                ...item,
                form: item.form == 'normal' ? 'edit' : 'normal',
            };
            setToDo((prevState) => {
                const newToDos = [...prevState].filter(
                    (item: IToDo) => item.id != doneItem.id,
                );
                localStorage.setItem(
                    'todos',
                    JSON.stringify([...newToDos, doneItem]),
                );
                return [...newToDos, doneItem];
            });
        },
        [setToDo],
    );

    // Изменение значения
    const editValueToDo = useCallback(
        (item: IToDo, value: string) => {
            const doneItem: IToDo = {
                ...item,
                value: value,
            };
            setToDo((prevState) => {
                const newToDos = [...prevState].filter(
                    (item: IToDo) => item.id != doneItem.id,
                );
                localStorage.setItem(
                    'todos',
                    JSON.stringify([...newToDos, doneItem]),
                );
                return [...newToDos, doneItem];
            });
            editFormTodo(doneItem);
        },
        [editFormTodo, setToDo],
    );

    // Добавление
    const addToDo = useCallback(
        (valueInput: string) => {
            const newItem: IToDo = {
                id: toDo[toDo.length - 1].id + 1,
                value: valueInput,
                status: 'undone',
                form: 'normal',
            };
            setToDo((prevState) => [...prevState, newItem]);
            setValueInput('');
            localStorage.setItem('todos', JSON.stringify([...toDo, newItem]));
        },
        [setToDo, setValueInput, toDo],
    );

    return {
        sortedToDo,
        editStatusToDo,
        editFormTodo,
        editValueToDo,
        addToDo,
        deleteToDo,
    };
}

export default useToDoTabs;
