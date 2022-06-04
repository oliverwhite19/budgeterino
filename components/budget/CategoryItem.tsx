import { IconName } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Category } from '../../types';

const CategoryItem = ({ category }: { category: Category }) => {
    return (
        <div style={{ color: category.color }}>
            <FontAwesomeIcon icon={['fas', category.icon]} /> {category.name}
        </div>
    );
};

export default CategoryItem;
