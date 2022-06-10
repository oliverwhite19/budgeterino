import create from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingState {
    budgetMode: boolean;
    budget: number;
    isSortedDate: boolean;
    setBudget: (budget: number) => void;
    setBudgetMode: (budgetMode: boolean) => void;
    setIsSortedDate: (isSortedDate: boolean) => void;
}
export const settingsStore = create<SettingState>()(
    persist(
        (set) => ({
            budgetMode: false,
            budget: 1000,
            isSortedDate: true,
            setBudget: (budget: number) => set(() => ({ budget })),
            setBudgetMode: (budgetMode: boolean) => set(() => ({ budgetMode })),
            setIsSortedDate: (isSortedDate: boolean) => set(() => ({ isSortedDate })),
        }),
        {
            name: 'settings',
            getStorage: () => localStorage,
        },
    ),
);
