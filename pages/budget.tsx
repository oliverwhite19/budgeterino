import Day from '../components/budget/Day';
import AddLineItem from '../components/budget/AddLineItem';
import useStorage from '../hooks/useStorage';
export type budgetItem = {
    title: string;
    date: string;
    direction: string;
    value: number;
    currency: string;
};

const itemsToDays = (items: budgetItem[]): { [k: string]: budgetItem[] } => {
    const itemsInDays = items.reduce((previousValue: { [k: string]: budgetItem[] }, currentValue) => {
        const dateString = currentValue.date;
        if (previousValue[dateString]) {
            previousValue[dateString].push(currentValue);
        } else {
            previousValue[dateString] = [currentValue];
        }
        return previousValue;
    }, {});
    const ordered = Object.keys(itemsInDays)
        .sort()
        .reverse()
        .reduce((obj: { [k: string]: budgetItem[] }, key) => {
            obj[key] = itemsInDays[key];
            return obj;
        }, {});
    return ordered;
};

const Budget = () => {
    const { getItem } = useStorage();
    const items = getItem('items', [], 'local');
    const itemsAsDays = itemsToDays(items);

    return (
        <div>
            <AddLineItem />
            {Object.values(itemsAsDays).map((value) => (
                <Day date={value[0].date} lineItems={value} key={value[0].date} />
            ))}
        </div>
    );
};

export default Budget;
