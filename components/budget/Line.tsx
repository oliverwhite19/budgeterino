import { styled } from '@stitches/react';
import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { budgetItem, Category } from '../../types';
import CategoryItem from './CategoryItem';
import LineItem from './LineItem';

type Props = {
    title: React.ReactNode;
    lineItems: Array<budgetItem>;
    deleteItem: (id: string) => void;
};

export const LineContainer = styled('div', {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    marginRight: '15px',
});

export const ValueContainer = styled('div', {
    variants: {
        color: {
            red: { color: 'red' },
            green: { color: 'green' },
        },
    },
});

const Line = ({ title, lineItems, deleteItem }: Props) => {
    const categoryValue = lineItems.reduce(
        (acc, item) => acc + (item.direction === 'out' ? -item.value : item.value),
        0,
    );
    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    <LineContainer>
                        {title}
                        <ValueContainer color={categoryValue > 0 ? `green` : 'red'}>
                            {categoryValue > 0 ? `+${categoryValue}` : categoryValue}
                        </ValueContainer>
                    </LineContainer>
                </Accordion.Header>
                {lineItems.reverse().map((item, index) => (
                    <LineItem deleteItem={deleteItem} {...item} key={index} />
                ))}
            </Accordion.Item>
        </Accordion>
    );
};

export default Line;
