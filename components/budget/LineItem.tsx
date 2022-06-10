import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled } from '@stitches/react';
import { useState } from 'react';
import { Card, Accordion, Button } from 'react-bootstrap';
import { budgetItem } from '../../types';
import CategoryItem from './CategoryItem';
import { LineContainer, ValueContainer } from './Line';

export type LineItemProps = budgetItem & { deleteItem: (id: string) => void };

const Overlay = styled('div', {
    zIndex: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    display: 'grid',
    alignItems: 'center',
    justifyItems: 'center',
});

const LineItem = ({ id, description, direction, value, currency, categories, deleteItem }: LineItemProps) => {
    const [isHover, setIsHover] = useState(false);
    return (
        <Accordion.Body>
            <Card onMouseOver={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                {isHover && (
                    <Overlay>
                        <Button variant="danger" onClick={() => deleteItem(id)}>
                            <FontAwesomeIcon icon={['fas', 'trash']} />
                        </Button>
                    </Overlay>
                )}
                <Card.Body style={isHover ? { filter: 'blur(2px)' } : {}}>
                    <LineContainer>
                        <div>
                            {categories.map((category) => (
                                <CategoryItem key={category.id} category={category} />
                            ))}
                        </div>

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
