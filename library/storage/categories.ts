import create from 'zustand';
import { persist } from 'zustand/middleware';
import { Category, Direction } from '../../types';

interface CategoryState {
    categories: Category[];
    addCategory: (category: Category) => void;
}
export const categoryStore = create<CategoryState>()(
    persist(
        (set) => ({
            categories: [
                {
                    id: 'bS93oDHdUf',
                    direction: Direction.OUT,
                    icon: 'bag-shopping',
                    color: '#488a82',
                    name: 'Shopping',
                },
                {
                    id: '_v8lsmv_2a',
                    direction: Direction.OUT,
                    icon: 'file-invoice-dollar',
                    color: '#f54266',
                    name: 'Bills',
                },
                { id: 'yNHj_qHb7i', direction: Direction.OUT, icon: 'gamepad', color: '#a11dad', name: 'Video Games' },
            ],
            addCategory: (category) => set((state) => ({ categories: [...state.categories, category] })),
        }),
        {
            name: 'categories',
            getStorage: () => localStorage,
        },
    ),
);
