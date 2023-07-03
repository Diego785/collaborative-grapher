import { dia } from '@clientio/rappid';

export interface Task {
    id: number | string;
    duration: number;
    attributes?: dia.Element.Attributes,
}

export interface Operator {
    label: string;
    tasks: Task[];
}
