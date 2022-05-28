import Accordion from 'react-bootstrap/Accordion';

export type LineItemProps = {
    title: string;
    direction: string;
    value: number;
    currency: string;
};

const LineItem = ({ title, direction, value, currency }: LineItemProps) => {
    return (
        <Accordion.Body>
            {title} {value}
            {currency}
        </Accordion.Body>
    );
};

export default LineItem;
