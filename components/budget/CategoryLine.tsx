import { budgetItem, Category } from '../../types';
import CategoryItem from './CategoryItem';
import Line from './Line';

type Props = {
    category: Category;
    lineItems: Array<budgetItem>;
    deleteItem: (id: string) => void;
};

const CategoryLine = ({ category, lineItems, deleteItem }: Props) => (
    <Line lineItems={lineItems} deleteItem={deleteItem} title={<CategoryItem category={category} />} />
);

export default CategoryLine;
