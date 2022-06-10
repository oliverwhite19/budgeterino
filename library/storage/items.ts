import create from 'zustand';
import { persist } from 'zustand/middleware';
import { budgetItem } from '../../types';
import { filter } from 'ramda';

interface BudgetState {
    budgetItems: budgetItem[];
    addItem: (item: budgetItem) => void;
    removeItem: (id: string) => void;
}
export const budgetStore = create<BudgetState>()(
    persist(
        (set) => ({
            budgetItems: [],
            addItem: (item) => set((state) => ({ budgetItems: [...state.budgetItems, item] })),
            removeItem: (id: string) =>
                set((state) => ({ budgetItems: filter((item) => item.id !== id, state.budgetItems) })),
        }),
        {
            name: 'budgetItems',
            getStorage: () => localStorage,
        },
    ),
);
