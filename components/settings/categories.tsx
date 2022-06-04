import { styled } from '@stitches/react';
import { Button, ListGroup } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import { categoryStore } from '../../library/storage/categories';
import { Category } from '../../types';
import CategoryItem from '../budget/CategoryItem';

export const TitleContainer = styled('div', {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    marginRight: '15px',
});

const Categories = () => {
    const categories = categoryStore((state) => state.categories);
    const addCategory = categoryStore((state) => state.addCategory);

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
