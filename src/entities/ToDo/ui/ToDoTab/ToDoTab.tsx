import React, { JSX, memo, useState } from 'react';
import cls from './ToDoTab.module.scss';
import { HStack } from '@/shared/ui/Stack';
import Icon from '@/shared/ui/Icon';
import SuccessIcon from '@/shared/assets/icons/success-icon.svg';
import EditIcon from '@/shared/assets/icons/edit-icon.svg';
import DeleteIcon from '@/shared/assets/icons/delete-icon.svg';
import { Card } from '@/shared/ui/Card';
import IToDo from '../../model/types/IToDo';
import { Input } from '@/shared/ui/Input';
import { useTranslation } from 'react-i18next';

interface IToDoTabProps {
    item: IToDo;
    deleteHandle: (item: IToDo) => void;
    editHandle: (item: IToDo) => void;
    editStatusHandle: (item: IToDo) => void;
    acceptEditHandle: (item: IToDo, value: string) => void;
}

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

        const [newValueInpit, setNewValueInput] = useState<string>(item.value);

        const editStatusIcon = (
            <Icon
                className={cls.successIcon}
                onClick={() => editStatusHandle(item)}
                Svg={SuccessIcon}
                clickable
            />
        );

        const normalFormItem = (
            <HStack gap={'16'} max justify={'between'}>
                {item.value ? item.value : <div />}
                {item.status == 'undone' && (
                    <HStack gap={'8'}>
                        <Icon
                            className={cls.successIcon}
                            onClick={() => editStatusHandle(item)}
                            Svg={SuccessIcon}
                            clickable
                        />
                        <Icon
                            className={cls.editIcon}
                            onClick={() => editHandle(item)}
                            Svg={EditIcon}
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
                            clickable
                        />
                    </HStack>
                )}
            </HStack>
        );

        const editFromItem = (
            <HStack gap={'16'} max justify={'between'}>
                <Input
                    onChange={setNewValueInput}
                    placeholder={t('Input something!')}
                    value={newValueInpit}
                    addonLeft={
                        <Icon Svg={EditIcon} className={cls.editIconInput} />
                    }
                />
                <HStack gap={'8'}>
                    <Icon
                        className={cls.successIcon}
                        onClick={() => {
                            acceptEditHandle(item, newValueInpit);
                        }}
                        Svg={SuccessIcon}
                        clickable
                    />
                    <Icon
                        className={cls.deleteIcon}
                        onClick={() => editHandle(item)}
                        Svg={DeleteIcon}
                        clickable
                    />
                </HStack>
            </HStack>
        );

        return (
            <Card
                className={item.status == 'undone' ? cls.undone : cls.done}
                key={item.id}
                max
                variant={item.status == 'undone' ? 'outline' : 'accept'}
            >
                {item.form == 'normal' && normalFormItem}
                {item.form == 'edit' && editFromItem}
            </Card>
        );
    },
);

export default ToDoTab;
