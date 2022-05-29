import { styled } from '@stitches/react';
import { parse, format } from 'date-fns';
import Accordion from 'react-bootstrap/Accordion';
import LineItem, { LineItemProps } from './LineItem';

type Props = {
    date: string;
    lineItems: Array<LineItemProps>;
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

const Day = ({ date, lineItems }: Props) => {
    const daysValue = lineItems.reduce((acc, item) => acc + (item.direction === 'out' ? -item.value : item.value), 0);
    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    <LineContainer>
                        <div>{format(parse(date, 'yyyy-MM-dd', new Date()), 'd MMMM')}</div>
                        <ValueContainer color={daysValue > 0 ? `green` : 'red'}>
                            {daysValue > 0 ? `+${daysValue}` : daysValue}
                        </ValueContainer>
                    </LineContainer>
                </Accordion.Header>
                {lineItems.reverse().map((item, index) => (
                    <LineItem {...item} key={index} />
                ))}
            </Accordion.Item>
        </Accordion>
    );
};

export default Day;
