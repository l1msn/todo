import React, { JSX } from 'react';
import Page from '@/widgets/Page';
import { useTranslation } from 'react-i18next';
import { HStack } from '@/shared/ui/Stack';
import ToDoList from '@/widgets/ToDoList';
import { Card } from '@/shared/ui/Card';
import ThemeSwitcher from '@/features/ThemeSwitcher';
import LangSwitcher from '@/features/LangSwitcher';

const MainPage: React.FC = (): JSX.Element => {
    const { t } = useTranslation();
    return (
        <Page data-testid={'MainPage'}>
            <HStack max justify={'center'}>
                <ToDoList />
            </HStack>
        </Page>
    );
};

export default MainPage;
