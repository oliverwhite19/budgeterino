import { IconName } from '@fortawesome/fontawesome-svg-core';
export enum Direction {
    IN = 'in',
    OUT = 'out',
}
export type Category = {
    name: string;
    color: string;
    icon: IconName;
    direction: Direction;
    id: string;
};

export type budgetItem = {
    description: string;
    date: string;
    direction: Direction;
    value: number;
    currency?: string;
    categories: Category[];
    id: string;
};
