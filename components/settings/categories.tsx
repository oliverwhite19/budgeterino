import { styled } from '@stitches/react';
import { useState } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import useStorage from '../../hooks/useStorage';
import { Category } from '../../types';
import CategoryItem from '../budget/CategoryItem';

export const defaultCategories: Array<Category> = [
    { direction: 'out', icon: 'bi bi-bag', color: '#488a82', name: 'Shopping' },
    { direction: 'out', icon: 'bi bi-tags', color: '#f54266', name: 'Bills' },
    { direction: 'out', icon: 'bi bi-controller', color: '#a11dad', name: 'Video Games' },
];

export const TitleContainer = styled('div', {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    marginRight: '15px',
});

const Categories = () => {
    const { getItem } = useStorage();
    const localCategories = getItem('categories', defaultCategories, 'local');
    const [categories, setCategories] = useState(localCategories);

    return (
        <>
            <TitleContainer>
                <h3>Categories</h3>
                <Button variant="outline-success">
                    <Plus />
                </Button>
            </TitleContainer>
            <ListGroup>
                {categories.map((category: Category, index: number) => (
                    <ListGroup.Item key={index}>
                        <CategoryItem category={category} />
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
    );
};

export default Categories;
