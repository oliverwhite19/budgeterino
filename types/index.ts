export type Category = {
    name: string;
    color: string;
    icon: string;
    direction: 'out' | 'in';
};

export type budgetItem = {
    description: string;
    date: string;
    direction: string;
    value: number;
    currency?: string;
    category?: Category;
};
