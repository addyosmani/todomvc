import { TodoType } from './constants';

export interface ITodo {
	id: string;
	title: string;
	completed: boolean;
	badges?: IBadgeProps[];
}

export interface ITodoItemProps {
	key: string;
	todo: ITodo;
	editing?: boolean;
	onSave: (text: any, badges?: string[]) => void;
	onDestroy: () => void;
	onEdit: () => void;
	onCancel: (event: any) => void;
	onToggle: () => void;
}

export interface IBadgeProps {
	name: string;
}

export interface ITodoItemState {
	editText: string;
}

export interface ITodoFooterProps {
	completedCount: number;
	onClearCompleted: any;
	nowShowing: string;
	count: number;
	items: IFooterItem[];
}

export interface IFooterItem {
	href: string;
	type: TodoType;
	label: string;
}

export interface ITodoModel {
	key: any;
	todos: Array<ITodo>;
	onChanges: Array<any>;
	subscribe(onChange);
	inform();
	addTodo(title: string, badges?: string[]);
	toggleAll(checked);
	toggle(todoToToggle);
	destroy(todo);
	save(todoToSave, text, badges?: string[]);
	clearCompleted();
}

export interface IAppProps {
	model: ITodoModel;
}

export interface IAppState {
	editing?: string;
	nowShowing?: string;
}
