import create from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingState {
    budgetMode: boolean;
    budget: number;
    setBudget: (budget: number) => void;
    setBudgetMode: (budgetMode: boolean) => void;
}
export const settingsStore = create<SettingState>()(
    persist(
        (set) => ({
            budgetMode: false,
            budget: 1000,
            setBudget: (budget: number) => set(() => ({ budget })),
            setBudgetMode: (budgetMode: boolean) => set(() => ({ budgetMode })),
        }),
        {
            name: 'settings',
            getStorage: () => localStorage,
        },
    ),
);
