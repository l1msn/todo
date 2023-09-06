import React, { JSX, useEffect, useState } from 'react';
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
import { Tabs } from '@/shared/ui/Tabs';
import ToDoTab from '@/entities/ToDo';
import { toDoQuery } from '@/entities/ToDo/model/types/toDoQuery';
import useToDoTabs from '@/entities/ToDo/model/lib/hooks/useToDoTabs';
import useTypeTabs from '@/entities/ToDo/model/lib/hooks/useTypeTabs';

interface IToDoListProps {
    className?: string;
}

const ToDoList: React.FC<IToDoListProps> = ({
    className,
}: IToDoListProps): JSX.Element => {
    // i18n для локализации
    const { t } = useTranslation();

    // состояние компонента для списка дел
    const [toDo, setToDo] = useState<IToDo[]>([]);
    // состояние компонента для отслеживания значения в input'e
    const [valueInput, setValueInput] = useState<string>('');
    // состояние компонента для отслеживания типа сортировки
    const [sortQuery, setSortQuery] = useState<toDoQuery>('all');

    // инициализация списка дел
    // при отстусвие в localStorage данных, туда помещаются моковые данные
    // иначе берутся готовые с localStorage
    useEffect(() => {
        if (localStorage.getItem('todos')) {
            const todos = localStorage.getItem('todos') as string;
            setToDo(JSON.parse(todos));
        } else {
            localStorage.setItem('todos', JSON.stringify(defaultTodos));
            setToDo(defaultTodos);
        }
    }, []);

    // получаения с хука логики взаимодействия со списком дел
    const {
        sortedToDo,
        addToDo,
        editStatusToDo,
        editValueToDo,
        editFormTodo,
        deleteToDo,
    } = useToDoTabs({ toDo, setToDo, sortQuery, setValueInput });

    // получаения с хука логики сортировки списка дел
    const { setTabSort, typeTabs } = useTypeTabs(setSortQuery);

    return (
        <Card
            className={classNames(cls.toDoList, {}, [className])}
            padding={'16'}
            data-testid={'todolist'}
        >
            <VStack gap={'16'} align={'center'} max justify={'center'}>
                <Text align={'center'} bold size={'l'} title={t('ToDoList')} />
                <HStack max gap={'16'}>
                    <Input
                        value={valueInput}
                        onChange={setValueInput}
                        placeholder={t('Write ToDo')}
                        addonLeft={<Icon Svg={ArrowDown} />}
                        data-testid={`todolist.input`}
                    />
                    <Button
                        variant={'accept'}
                        onClick={() => addToDo(valueInput)}
                        data-testid={`todolist.addBtn`}
                    >
                        {t('Add')}
                    </Button>
                </HStack>
                {sortedToDo.map((item: IToDo) => (
                    // отрисовка списка дел
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
                    data-testid={'tab'}
                    tabs={typeTabs}
                    onTabClick={setTabSort}
                    value={sortQuery}
                />
            </HStack>
        </Card>
    );
};

export default ToDoList;
