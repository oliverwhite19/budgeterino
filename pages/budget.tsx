import Day from '../components/budget/Day';
import useLocalStorage from 'react-localstorage-hook';
import AddLineItem from '../components/budget/AddLineItem';
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
    let itemsAsDays: { [k: string]: budgetItem[] } = {};
    if (typeof window !== 'undefined') {
        const [items]: [budgetItem[]] = useLocalStorage('items', []);
        itemsAsDays = itemsToDays(items);
    }

    return (
        <div>
            <AddLineItem />
            {Object.values(itemsAsDays).map((value) => (
                <Day date={value[0].date} lineItems={value} />
            ))}
        </div>
    );
};

export default Budget;
