import create from 'zustand';
import { persist } from 'zustand/middleware';
import { Category } from '../../types';

interface CategoryState {
    categories: Category[];
    addCategory: (category: Category) => void;
}
export const categoryStore = create<CategoryState>()(
    persist(
        (set) => ({
            categories: [
                { id: 'bS93oDHdUf', direction: 'out', icon: 'bi bi-bag', color: '#488a82', name: 'Shopping' },
                { id: '_v8lsmv_2a', direction: 'out', icon: 'bi bi-tags', color: '#f54266', name: 'Bills' },
                { id: 'yNHj_qHb7i', direction: 'out', icon: 'bi bi-controller', color: '#a11dad', name: 'Video Games' },
            ],
            addCategory: (category) => set((state) => ({ categories: [...state.categories, category] })),
        }),
        {
            name: 'categories',
            getStorage: () => localStorage,
        },
    ),
);
