import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { toDoQuery } from '../../types/toDoQuery';
import { ITabItem } from '@/shared/ui/Tabs';

interface IToDoQueryTabs {
    value: toDoQuery;
    content: string;
}

/**
 * @description Сортировка списка дел
 */
function useTypeTabs(
    setSortQuery: React.Dispatch<React.SetStateAction<toDoQuery>>,
) {
    const { t } = useTranslation();

    // варианты сортировки
    const typeTabs = useMemo<IToDoQueryTabs[]>(() => {
        return [
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
        ];
    }, [t]);

    // изменения способа сортировки
    const setTabSort = useCallback(
        (tab: ITabItem) => {
            setSortQuery(tab.value as toDoQuery);
        },
        [setSortQuery],
    );

    return { typeTabs, setTabSort };
}

export default useTypeTabs;
