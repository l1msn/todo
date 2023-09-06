import React, { JSX, memo, useState } from 'react';
import cls from './ToDoTab.module.scss';
import { HStack } from '@/shared/ui/Stack';
import Icon from '@/shared/ui/Icon';
import SuccessIcon from '@/shared/assets/icons/success-icon.svg';
import EditIcon from '@/shared/assets/icons/edit-icon.svg';
import DeleteIcon from '@/shared/assets/icons/delete-icon.svg';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';
import { useTranslation } from 'react-i18next';
import IToDo from '../../model/types/IToDo';

// данные карточки + логика
interface IToDoTabProps {
    item: IToDo;
    deleteHandle: (item: IToDo) => void;
    editHandle: (item: IToDo) => void;
    editStatusHandle: (item: IToDo) => void;
    acceptEditHandle: (item: IToDo, value: string) => void;
}

/**
 * @description поле карточки списка дел
 */
const ToDoTab: React.FC<IToDoTabProps> = memo(
    (props: IToDoTabProps): JSX.Element => {
        const {
            item,
            deleteHandle,
            editStatusHandle,
            editHandle,
            acceptEditHandle,
        } = props;

        const { t } = useTranslation();

        // отслиживание input'а при изменение значения карточки
        const [newValueInput, setNewValueInput] = useState<string>(item.value);

        // иконка изменения карточки
        const editStatusIcon = (
            <Icon
                className={cls.successIcon}
                onClick={() => editStatusHandle(item)}
                Svg={SuccessIcon}
                data-testid={`todotab.successBtn.${item.id.toString()}`}
                clickable
            />
        );

        // карточка не в формате изменения
        const normalFormItem = (
            <HStack gap={'16'} max justify={'between'}>
                {item.value ? item.value : <div />}
                {item.status == 'undone' && (
                    <HStack gap={'8'}>
                        {editStatusIcon}
                        <Icon
                            className={cls.editIcon}
                            onClick={() => editHandle(item)}
                            Svg={EditIcon}
                            data-testid={`todotab.editBtn.${item.id.toString()}`}
                            clickable
                        />
                    </HStack>
                )}
                {item.status == 'done' && (
                    <HStack gap={'8'}>
                        {editStatusIcon}
                        <Icon
                            className={cls.deleteIcon}
                            onClick={() => deleteHandle(item)}
                            Svg={DeleteIcon}
                            data-testid={`todotab.deleteBtn.${item.id.toString()}`}
                            clickable
                        />
                    </HStack>
                )}
            </HStack>
        );

        // карточка в формате изменения
        const editFromItem = (
            <HStack gap={'16'} max justify={'between'}>
                <Input
                    onChange={setNewValueInput}
                    placeholder={t('Input something!')}
                    value={newValueInput}
                    data-testid={`todotab.editInput.${item.id.toString()}`}
                    addonLeft={
                        <Icon Svg={EditIcon} className={cls.editIconInput} />
                    }
                />
                <HStack gap={'8'}>
                    <Icon
                        className={cls.successIcon}
                        onClick={() => {
                            acceptEditHandle(item, newValueInput);
                        }}
                        Svg={SuccessIcon}
                        data-testid={`todotab.successBtn.${item.id.toString()}`}
                        clickable
                    />
                    <Icon
                        className={cls.deleteIcon}
                        onClick={() => editHandle(item)}
                        Svg={DeleteIcon}
                        data-testid={`todotab.cancelBtn.${item.id.toString()}`}
                        clickable
                    />
                </HStack>
            </HStack>
        );

        // полная форма карточки
        return (
            <Card
                className={item.status == 'undone' ? cls.undone : cls.done}
                key={item.id}
                max
                variant={item.status == 'undone' ? 'outline' : 'accept'}
                data-testid={`todotab.${item.id.toString()}`}
            >
                {item.form == 'normal' && normalFormItem}
                {item.form == 'edit' && editFromItem}
            </Card>
        );
    },
);

export default ToDoTab;
