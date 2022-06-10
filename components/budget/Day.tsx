import { parse, format } from 'date-fns';
import { budgetItem } from '../../types';
import Line from './Line';

type Props = {
    date: string;
    lineItems: Array<budgetItem>;
    deleteItem: (id: string) => void;
};
const Day = ({ date, lineItems, deleteItem }: Props) => (
    <Line
        lineItems={lineItems}
        deleteItem={deleteItem}
        title={<div>{format(parse(date, 'yyyy-MM-dd', new Date()), 'd MMMM')}</div>}
    />
);

export default Day;
