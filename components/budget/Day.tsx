import Accordion from 'react-bootstrap/Accordion';
import LineItem, { LineItemProps } from './LineItem';

type Props = {
    date: string;
    lineItems: Array<LineItemProps>;
};

const Day = ({ date, lineItems }: Props) => {
    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>{date}</Accordion.Header>
                {lineItems.map((item, index) => (
                    <LineItem {...item} key={index} />
                ))}
            </Accordion.Item>
        </Accordion>
    );
};

export default Day;
