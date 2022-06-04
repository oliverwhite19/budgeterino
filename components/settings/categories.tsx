import { styled } from '@stitches/react';
import { ListGroup } from 'react-bootstrap';
import { categoryStore } from '../../library/storage/categories';
import { Category } from '../../types';
import CategoryItem from '../budget/CategoryItem';
import AddCategory from './AddCategory';

export const TitleContainer = styled('div', {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    marginRight: '15px',
});

const Categories = () => {
    const categories = categoryStore((state) => state.categories);

    return (
        <>
            <TitleContainer>
                <h3>Categories</h3>
                <AddCategory />
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
