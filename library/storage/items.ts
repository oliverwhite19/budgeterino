import create from 'zustand';
import { persist } from 'zustand/middleware';
import { budgetItem } from '../../types';

interface BudgetState {
    budgetItems: budgetItem[];
    addItem: (item: budgetItem) => void;
}
export const budgetStore = create<BudgetState>()(
    persist(
        (set) => ({
            budgetItems: [],
            addItem: (item) => set((state) => ({ budgetItems: [...state.budgetItems, item] })),
        }),
        {
            name: 'budgetItems',
            getStorage: () => localStorage,
        },
    ),
);
