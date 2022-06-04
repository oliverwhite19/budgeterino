export type Category = {
    name: string;
    color: string;
    icon: string;
    direction: 'out' | 'in';
    id: string;
};

export type budgetItem = {
    description: string;
    date: string;
    direction: string;
    value: number;
    currency?: string;
    categories: Category[];
    id: string;
};
