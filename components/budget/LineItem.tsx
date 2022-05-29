import { Card, Accordion } from 'react-bootstrap';
import { LineContainer, ValueContainer } from './Day';

export type LineItemProps = {
    description: string;
    direction: string;
    value: number;
    currency?: string;
};

const LineItem = ({ description, direction, value, currency }: LineItemProps) => {
    return (
        <Accordion.Body>
            <Card>
                <Card.Body>
                    <LineContainer>
                        <div>Category Name //Category Icon//</div>
                        <ValueContainer color={direction === 'in' ? `green` : 'red'}>
                            {direction === 'in' ? `+${value} ${currency ?? ''}` : `-${value} ${currency ?? ''}`}
                        </ValueContainer>
                    </LineContainer>
                    <Card.Text>{description}</Card.Text>
                </Card.Body>
            </Card>
        </Accordion.Body>
    );
};

export default LineItem;
