import { IconName } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { Button, ButtonGroup, Container, Form, Modal, Row } from 'react-bootstrap';
import InputColor from 'react-input-color';
import Select, { components, OptionProps, SingleValueProps } from 'react-select';
import { categoryStore } from '../../library/storage/categories';
import { Direction } from '../../types';

const Option = ({ children, color, ...props }: OptionProps<{ value: string; label: string }> & { color: string }) => {
    return (
        <components.Option {...props}>
            <FontAwesomeIcon icon={['fas', props.data.value as IconName]} color={color} />
        </components.Option>
    );
};

const SingleValue = ({
    children,
    color,
    ...props
}: SingleValueProps<{ value: string; label: string }> & { color: string }) => (
    <components.SingleValue {...props}>
        <FontAwesomeIcon icon={['fas', props.data.value as IconName]} color={color} />
    </components.SingleValue>
);

const AddCategory = () => {
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const addCategory = categoryStore((state) => state.addCategory);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [color, setColor] = useState('#112233');
    const [icon, setIcon] = useState<IconName | undefined>();
    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false || !icon || !color) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        const category = {
            id: nanoid(10),
            name: event.target.title.value,
            direction: Direction.OUT,
            color,
            icon,
        };
        setValidated(true);
        addCategory(category);

        event.preventDefault();
        setShow(false);
    };

    return (
        <>
            <Row>
                <ButtonGroup aria-label="Basic example">
                    <Button variant="outline-danger" onClick={() => handleShow()}>
                        Add New Category
                    </Button>
                </ButtonGroup>
            </Row>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Category</Modal.Title>
                </Modal.Header>
                <Container>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group controlId="title">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" />
                        </Form.Group>
                        <Form.Group controlId="color">
                            <Form.Label>Color</Form.Label>
                            <InputColor initialValue={color} onChange={(color) => setColor(color.hex)} />
                        </Form.Group>

                        <Form.Group controlId="icon">
                            <Form.Label>Icon</Form.Label>
                            <Select
                                onChange={(icon) => setIcon(icon?.value as IconName)}
                                components={{
                                    //@ts-expect-error
                                    Option: (props) => <Option {...props} color={color} />,
                                    // @ts-expect-error
                                    SingleValue: (props) => <SingleValue {...props} color={color} />,
                                }}
                                isMulti={false}
                                options={[
                                    { value: 'money-bill-wave', label: 'Money' },
                                    { value: 'train-subway', label: 'Transport' },
                                    { value: 'car', label: 'Car' },
                                    { value: 'house', label: 'House' },
                                    { value: 'basket-shopping', label: 'Shopping' },
                                    { value: 'house-medical', label: 'Health' },
                                ]}
                            />
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                Save Category
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Container>
            </Modal>
        </>
    );
};

export default AddCategory;
