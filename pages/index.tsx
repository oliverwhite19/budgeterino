import Day from '../components/budget/Day';
import AddLineItem from '../components/budget/AddLineItem';
import useStorage from '../hooks/useStorage';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { budgetItem } from '../types';
import { addMonths, endOfMonth, format, isAfter, isBefore, parse, startOfMonth, subMonths } from 'date-fns';
import { Button, Navbar } from 'react-bootstrap';
import { CaretLeft, CaretRight } from 'react-bootstrap-icons';
import { styled } from '@stitches/react';
import { defaultSettings } from './settings';

export const TitleContainer = styled('div', {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    marginRight: '15px',
});

const itemsToDays = (items: budgetItem[], start: Date, end: Date): { [k: string]: budgetItem[] } => {
    const itemsInDays = items
        .filter((item) => {
            const itemDate = parse(item.date, 'yyyy-MM-dd', new Date());
            return isBefore(itemDate, end) && isAfter(itemDate, start);
        })
        .reduce((previousValue: { [k: string]: budgetItem[] }, currentValue) => {
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
    const localItems = getItem('items', [], 'local');
    const settings = getItem('settings', defaultSettings, 'local');
    const [items, setItems] = useState(localItems);

    const [currentDate, setCurrentDate] = useState(new Date());
    const itemsAsDays = itemsToDays(items, startOfMonth(currentDate), endOfMonth(currentDate));
    const monthTotal = Object.values(itemsAsDays).reduce(
        (acc, items) =>
            acc +
            items.reduce(
                (accum, item) => (item.direction === 'out' || !settings.budgetMode ? accum - item.value : accum),
                0,
            ),
        0,
    );
    const budgetModeCounter = 2200;
    return (
        <>
            <TitleContainer>
                <Button variant="outline-info" onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
                    <CaretLeft />
                </Button>
                <h1>{format(currentDate, 'MMMM')}</h1>
                <Button variant="outline-info" onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
                    <CaretRight />
                </Button>
            </TitleContainer>
            <div>
                <AddLineItem addItem={(item) => setItems([...items, item])} />
                {Object.values(itemsAsDays).map((value) => (
                    <Day date={value[0].date} lineItems={value} key={value[0].date} />
                ))}
            </div>
            <Navbar fixed="bottom">{settings.budgetMode ? settings.budget + monthTotal : monthTotal}</Navbar>
        </>
    );
};

export default dynamic(() => Promise.resolve(Budget), {
    ssr: false,
});
