import { Card, Accordion } from 'react-bootstrap';
import { budgetItem } from '../../types';
import CategoryItem from './CategoryItem';
import { LineContainer, ValueContainer } from './Day';

export type LineItemProps = budgetItem;

const LineItem = ({ description, direction, value, currency, category }: LineItemProps) => {
    return (
        <Accordion.Body>
            <Card>
                <Card.Body>
                    <LineContainer>
                        <CategoryItem category={category} />
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
