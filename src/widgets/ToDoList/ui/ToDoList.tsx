import React, { JSX, useCallback, useEffect, useMemo, useState } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import cls from './ToDoList.module.scss';
import { Card } from '@/shared/ui/Card';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { useTranslation } from 'react-i18next';
import { Input } from '@/shared/ui/Input';
import ArrowDown from '@/shared/assets/icons/arrow-bottom.svg';
import defaultTodos from '@/shared/mock/defaultTodos';
import Icon from '@/shared/ui/Icon';
import IToDo from '@/entities/ToDo/model/types/IToDo';
import Button from '@/shared/ui/Button';
import { toDoStatus } from '@/entities/ToDo/model/types/toDoStatus';
import { ITabItem, Tabs } from '@/shared/ui/Tabs';
import ToDoTab from '@/entities/ToDo';

type toDoQuery = toDoStatus | 'all';

interface IToDoListProps {
    className?: string;
}

interface IToDoQueryTabs {
    value: toDoQuery;
    content: string;
}

const ToDoList: React.FC<IToDoListProps> = ({
    className,
}: IToDoListProps): JSX.Element => {
    const { t } = useTranslation();

    const [toDo, setToDo] = useState<IToDo[]>([]);
    const [valueInput, setValueInput] = useState<string>('');
    const [sortQuery, setSortQuery] = useState<toDoQuery>('all');

    useEffect(() => {
        if (localStorage.getItem('todos')) {
            const todos = localStorage.getItem('todos') as string;
            setToDo(JSON.parse(todos));
        } else {
            localStorage.setItem('todos', JSON.stringify(defaultTodos));
            setToDo(defaultTodos);
        }
    }, []);

    const typeTabs = useMemo<IToDoQueryTabs[]>(
        () => [
            {
                value: 'all',
                content: t('all'),
            },
            {
                value: 'done',
                content: t('done'),
            },
            {
                value: 'undone',
                content: t('undone'),
            },
        ],
        [t],
    );

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

    const editStatusToDo = useCallback((item: IToDo) => {
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
    }, []);

    const editFormTodo = useCallback((item: IToDo) => {
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
    }, []);

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
        [editFormTodo],
    );

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
        [toDo],
    );

    const deleteToDo = useCallback((item: IToDo) => {
        setToDo((prevState) => {
            const newTodos = [...prevState].filter((todo: IToDo) => {
                return item.id !== todo.id;
            });
            localStorage.setItem('todos', JSON.stringify([...newTodos]));
            return [...newTodos];
        });
    }, []);

    const setTabSort = useCallback((tab: ITabItem) => {
        setSortQuery(tab.value as toDoQuery);
    }, []);

    return (
        <Card
            className={classNames(cls.toDoList, {}, [className])}
            padding={'16'}
        >
            <VStack gap={'16'} align={'center'} max justify={'center'}>
                <Text align={'center'} bold size={'l'} title={t('ToDoList')} />
                <HStack max gap={'16'}>
                    <Input
                        value={valueInput}
                        onChange={setValueInput}
                        placeholder={t('Write ToDo')}
                        addonLeft={<Icon Svg={ArrowDown} />}
                    />
                    <Button
                        variant={'accept'}
                        onClick={() => addToDo(valueInput)}
                    >
                        {t('Add')}
                    </Button>
                </HStack>
                {sortedToDo.map((item: IToDo) => (
                    <ToDoTab
                        key={item.id}
                        item={item}
                        deleteHandle={deleteToDo}
                        editHandle={editFormTodo}
                        acceptEditHandle={editValueToDo}
                        editStatusHandle={editStatusToDo}
                    />
                ))}
            </VStack>
            <HStack className={cls.options} max gap={'16'} justify={'between'}>
                <Text text={`${t('Count')}: ${sortedToDo.length}`} />
                <Tabs
                    tabs={typeTabs}
                    onTabClick={setTabSort}
                    value={sortQuery}
                />
            </HStack>
        </Card>
    );
};

export default ToDoList;
