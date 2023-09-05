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
import SuccessIcon from '@/shared/assets/icons/done-20-20.svg';
import Icon from '@/shared/ui/Icon';
import IToDo from '@/entities/ToDo/model/types/IToDo';
import Button from '@/shared/ui/Button';
import { toDoStatus } from '@/entities/ToDo/model/types/toDoStatus';
import { ITabItem, Tabs } from '@/shared/ui/Tabs';

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
        const doneItem: IToDo = { ...item, status: 'done' };
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

    const addToDo = useCallback(
        (valueInput: string) => {
            const newItem: IToDo = {
                id: toDo[toDo.length - 1].id + 1,
                value: valueInput,
                status: 'undone',
            };
            setToDo((prevState) => [...prevState, newItem]);
            setValueInput('');
            localStorage.setItem('todos', JSON.stringify([...toDo, newItem]));
        },
        [valueInput, toDo],
    );

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
                    <Card
                        className={
                            item.status == 'undone' ? cls.undone : cls.done
                        }
                        key={item.id}
                        max
                        variant={item.status == 'undone' ? 'outline' : 'accept'}
                    >
                        <HStack gap={'16'} max justify={'between'}>
                            {item.value}
                            {item.status == 'undone' && (
                                <VStack>
                                    <Icon
                                        onClick={() => editStatusToDo(item)}
                                        Svg={SuccessIcon}
                                        clickable
                                    />
                                </VStack>
                            )}
                            {/*{item.status == 'done' && }*/}
                        </HStack>
                    </Card>
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
