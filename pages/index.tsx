import Day from '../components/budget/Day';
import AddLineItem from '../components/budget/AddLineItem';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { budgetItem, Category } from '../types';
import { addMonths, endOfMonth, format, isAfter, isBefore, isEqual, parse, startOfMonth, subMonths } from 'date-fns';
import { Button, Navbar } from 'react-bootstrap';
import { styled } from '@stitches/react';
import { budgetStore, settingsStore } from '../library/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { filter, reduce, keys, values, map, find } from 'ramda';
import { categoryStore } from '../library/storage/categories';
import CategoryLine from '../components/budget/CategoryLine';

export const TitleContainer = styled('div', {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    marginRight: '15px',
});
const NavCountainer = styled(TitleContainer, {
    justifyContent: 'space-around',
});
const Nav = styled(Navbar, {
    backgroundColor: '#555555',
});

const mapItems = (
    items: budgetItem[],
    start: Date,
    end: Date,
    reducer: (previousValue: { [k: string]: budgetItem[] }, currentValue: budgetItem) => { [k: string]: budgetItem[] },
): { [k: string]: budgetItem[] } => {
    const collectedItems = reduce(
        reducer,
        {},
        filter(
            (item) => !!item,
            filter((item) => {
                const itemDate = parse(item.date, 'yyyy-MM-dd', new Date());
                return isBefore(itemDate, end) && (isAfter(itemDate, start) || isEqual(itemDate, start));
            }, items),
        ),
    );
    const ordered = Object.keys(collectedItems)
        .sort()
        .reverse()
        .reduce((obj: { [k: string]: budgetItem[] }, key) => {
            obj[key] = collectedItems[key];
            return obj;
        }, {});
    return ordered;
};

const itemsToDays = (items: budgetItem[], start: Date, end: Date) =>
    mapItems(items, start, end, (previousValue: { [k: string]: budgetItem[] }, currentValue: budgetItem) => {
        const dateString = currentValue.date;
        if (previousValue[dateString]) {
            previousValue[dateString].push(currentValue);
        } else {
            previousValue[dateString] = [currentValue];
        }
        return previousValue;
    });

const itemsToCategories = (items: budgetItem[], start: Date, end: Date) =>
    mapItems(items, start, end, (previousValue: { [k: string]: budgetItem[] }, currentValue: budgetItem) => {
        const categories = currentValue.categories;
        for (const category of categories) {
            if (previousValue[category.id]) {
                previousValue[category.id].push(currentValue);
            } else {
                previousValue[category.id] = [currentValue];
            }
        }
        return previousValue;
    });

const Budget = () => {
    const items = budgetStore((state) => state.budgetItems);
    const removeItem = budgetStore((state) => state.removeItem);
    const isSortedDate = settingsStore((state) => state.isSortedDate);
    const categories = categoryStore((state) => state.categories);

    const budgetMode = settingsStore((state) => state.budgetMode);
    const budget = settingsStore((state) => state.budget);

    const [currentDate, setCurrentDate] = useState(new Date());
    const itemsAsDays = itemsToDays(items, startOfMonth(currentDate), endOfMonth(currentDate));
    const itemsAsCategories = itemsToCategories(items, startOfMonth(currentDate), endOfMonth(currentDate));
    const monthTotal = Object.values(itemsAsDays).reduce(
        (acc, items) =>
            acc +
            items.reduce((accum, item) => (item.direction === 'out' || !budgetMode ? accum - item.value : accum), 0),
        0,
    );
    return (
        <>
            <TitleContainer>
                <Button variant="outline-info" onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
                    <FontAwesomeIcon icon={['fas', 'angle-left']} />
                </Button>
                <h1>{format(currentDate, 'MMMM')}</h1>
                <Button variant="outline-info" onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
                    <FontAwesomeIcon icon={['fas', 'angle-right']} />
                </Button>
            </TitleContainer>
            <div>
                <AddLineItem />
                {isSortedDate &&
                    map(
                        (value) => (
                            <Day date={value[0].date} lineItems={value} key={value[0].date} deleteItem={removeItem} />
                        ),
                        values(itemsAsDays),
                    )}
                {!isSortedDate &&
                    map((key) => {
                        const values = itemsAsCategories[key];
                        const findCategory = find((category: Category) => category.id === key);
                        const category = findCategory(values[0].categories);
                        if (!category) {
                            return null;
                        }
                        return (
                            <CategoryLine
                                category={category}
                                lineItems={values}
                                key={category.id}
                                deleteItem={removeItem}
                            />
                        );
                    }, keys(itemsAsCategories))}
            </div>
            <Nav fixed="bottom">
                <NavCountainer>
                    <p>{budgetMode ? budget + monthTotal : monthTotal}</p>
                </NavCountainer>
            </Nav>
        </>
    );
};

export default dynamic(() => Promise.resolve(Budget), {
    ssr: false,
});
