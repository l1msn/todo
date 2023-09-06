import componentRender from '@/shared/lib/tests/componentRender/componentRender';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToDoList from './ToDoList';
import defaultTodos from '@/shared/mock/defaultTodos';
import IToDo from '@/entities/ToDo/model/types/IToDo';

const mockTodos: IToDo[] = [
    {
        id: 100,
        value: 'mock value',
        form: 'normal',
        status: 'undone',
    },
    {
        id: 101,
        value: 'mock value 2',
        form: 'normal',
        status: 'done',
    },
];

describe('ToDoList DOM', (): void => {
    afterEach(() => {
        localStorage.clear();
    });
    test('Appeared Component in DOM', (): void => {
        componentRender(<ToDoList />);
        expect(screen.getByTestId('todolist')).toBeInTheDocument();
    });
    test('Has defaultToDos in DOM', (): void => {
        componentRender(<ToDoList />);
        expect(screen.getByText('Create project')).toBeInTheDocument();
        expect(screen.getByText('Share project')).toBeInTheDocument();
        expect(screen.getByText('Upgrade project')).toBeInTheDocument();
    });
    test('Has local ToDos in DOM', (): void => {
        localStorage.setItem('todos', JSON.stringify(mockTodos));
        componentRender(<ToDoList />);
        expect(screen.getByText(mockTodos[0].value)).toBeInTheDocument();
        expect(screen.getByText(mockTodos[1].value)).toBeInTheDocument();
    });
});

describe('ToDoList localStorage', (): void => {
    afterEach(() => {
        localStorage.clear();
    });
    test('Set default ToDos to localStorage', (): void => {
        localStorage.clear();
        componentRender(<ToDoList />);
        const todos = localStorage.getItem('todos');
        expect(JSON.parse(todos as string)).toStrictEqual(defaultTodos);
    });
    test('Get ToDos from localStorage', (): void => {
        localStorage.setItem('todos', JSON.stringify(mockTodos));
        componentRender(<ToDoList />);
        const todos = localStorage.getItem('todos');
        expect(JSON.parse(todos as string)).toStrictEqual(mockTodos);
    });
    test('Added new todo in localStorage', async (): Promise<void> => {
        localStorage.setItem('todos', JSON.stringify(mockTodos));
        componentRender(<ToDoList />);
        const addBtn: HTMLElement = screen.getByTestId('todolist.addBtn');
        const input: HTMLElement = screen.getByTestId('todolist.input');
        await userEvent.type(input, 'new todo');
        await userEvent.click(addBtn);
        const todos = localStorage.getItem('todos');
        expect(JSON.parse(todos as string)).toStrictEqual([
            ...mockTodos,
            {
                value: 'new todo',
                form: 'normal',
                status: 'undone',
                id: 102,
            } as IToDo,
        ]);
    });
    test('Edited one and check in localStorage', async (): Promise<void> => {
        localStorage.setItem('todos', JSON.stringify(mockTodos));
        componentRender(<ToDoList />);
        const todoStatusBtn: HTMLElement = screen.getByTestId(
            `todotab.successBtn.${mockTodos[0].id}`,
        );
        await userEvent.click(todoStatusBtn);
        const todos = localStorage.getItem('todos');
        expect(JSON.parse(todos as string)).toStrictEqual([
            mockTodos[1],
            {
                id: 100,
                value: 'mock value',
                form: 'normal',
                status: 'done',
            },
        ]);
    });
});

describe('ToDoList Manipulations', (): void => {
    afterEach(() => {
        localStorage.clear();
        localStorage.setItem('todos', JSON.stringify(mockTodos));
    });
    test('Added new todo', async (): Promise<void> => {
        componentRender(<ToDoList />);
        const addBtn: HTMLElement = screen.getByTestId('todolist.addBtn');
        const input: HTMLElement = screen.getByTestId('todolist.input');
        await userEvent.type(input, 'new todo');
        await userEvent.click(addBtn);
        expect(screen.getByText('new todo')).toBeInTheDocument();
    });
    test('Done one todo', async (): Promise<void> => {
        componentRender(<ToDoList />);
        const todoStatusBtn: HTMLElement = screen.getByTestId(
            `todotab.successBtn.${mockTodos[0].id}`,
        );
        await userEvent.click(todoStatusBtn);
        expect(screen.getByTestId(`todotab.${mockTodos[0].id}`)).toHaveClass(
            'done',
        );
    });
    test('Undone one todo', async (): Promise<void> => {
        componentRender(<ToDoList />);
        const todoStatusBtn: HTMLElement = screen.getByTestId(
            `todotab.successBtn.${mockTodos[1].id}`,
        );
        await userEvent.click(todoStatusBtn);
        expect(screen.getByTestId(`todotab.${mockTodos[1].id}`)).toHaveClass(
            'undone',
        );
    });
    test('Delete one todo', async (): Promise<void> => {
        componentRender(<ToDoList />);
        const todoDeleteBtn: HTMLElement = screen.getByTestId(
            `todotab.deleteBtn.${mockTodos[1].id}`,
        );
        await userEvent.click(todoDeleteBtn);
        expect(screen.queryByTestId(`todotab.${mockTodos[1].id}`)).toBeNull();
    });
    test('Edited one todo', async (): Promise<void> => {
        componentRender(<ToDoList />);
        const todoEditBtn: HTMLElement = screen.getByTestId(
            `todotab.editBtn.${mockTodos[0].id}`,
        );
        await userEvent.click(todoEditBtn);
        const todoEditInput: HTMLElement = screen.getByTestId(
            `todotab.editInput.${mockTodos[0].id}`,
        );
        await userEvent.type(todoEditInput, ' new');
        const todoEditSuccessBtn: HTMLElement = screen.getByTestId(
            `todotab.successBtn.${mockTodos[0].id}`,
        );
        await userEvent.click(todoEditSuccessBtn);
        expect(
            screen.getByText(mockTodos[0].value + ' new'),
        ).toBeInTheDocument();
    });
    test('Cancel edit one todo', async (): Promise<void> => {
        componentRender(<ToDoList />);
        const todoEditBtn: HTMLElement = screen.getByTestId(
            `todotab.editBtn.${mockTodos[0].id}`,
        );
        await userEvent.click(todoEditBtn);
        const todoEditInput: HTMLElement = screen.getByTestId(
            `todotab.editInput.${mockTodos[0].id}`,
        );
        await userEvent.type(todoEditInput, ' new');
        const todoEditCancelBtn: HTMLElement = screen.getByTestId(
            `todotab.cancelBtn.${mockTodos[0].id}`,
        );
        await userEvent.click(todoEditCancelBtn);
        expect(screen.getByText(mockTodos[0].value)).toBeInTheDocument();
    });
    test('Sort todos', async (): Promise<void> => {
        componentRender(<ToDoList />);
        const todoSortDone: HTMLElement = screen.getByTestId(`tab.done`);
        const todoSortUndone: HTMLElement = screen.getByTestId(`tab.undone`);
        await userEvent.click(todoSortDone);
        expect(screen.queryByText(mockTodos[0].value)).toBeNull();
        expect(screen.getByText(mockTodos[1].value)).toBeInTheDocument();
        await userEvent.click(todoSortUndone);
        expect(screen.getByText(mockTodos[0].value)).toBeInTheDocument();
        expect(screen.queryByText(mockTodos[1].value)).toBeNull();
    });
});
