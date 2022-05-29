import { Category } from '../../types';

const CategoryItem = ({ category }: { category: Category }) => {
    return (
        <div style={{ color: category.color }}>
            <i className={category.icon} /> {category.name}
        </div>
    );
};

export default CategoryItem;
