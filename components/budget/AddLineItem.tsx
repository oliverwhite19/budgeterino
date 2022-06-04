import { nanoid } from 'nanoid';
import { useState } from 'react';
import { Button, ButtonGroup, Container, Form, Modal, Row } from 'react-bootstrap';
import { budgetStore } from '../../library/storage';
import { categoryStore } from '../../library/storage/categories';
import { Category } from '../../types';

const AddLineItem = () => {
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const [mode, setMode] = useState('out');
    const categories = categoryStore((state) => state.categories);
    const addItem = budgetStore((state) => state.addItem);

    const handleClose = () => setShow(false);
    const handleShow = (mode: string) => {
        setMode(mode);
        setShow(true);
    };
    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        const category = categories.find((category: Category) => category.name === event.target.category.value);
        if (form.checkValidity() === false || !category) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        const item = {
            description: event.target.description.value,
            date: event.target.date.value,
            direction: mode,
            value: parseFloat(event.target.value.value),
            category,
            id: nanoid(10),
        };
        setValidated(true);
        addItem(item);

        event.preventDefault();
        setShow(false);
    };

    return (
        <>
            <Row>
                <ButtonGroup aria-label="Basic example">
                    <Button variant="outline-danger" onClick={() => handleShow('out')}>
                        Add New Expense
                    </Button>
                    <Button variant="outline-success" onClick={() => handleShow('in')}>
                        Add New Income
                    </Button>
                </ButtonGroup>
            </Row>

            {show && (
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New {mode === 'out' ? 'Expense' : 'Income'}</Modal.Title>
                    </Modal.Header>
                    <Container>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group controlId="category">
                                <Form.Label>Category</Form.Label>
                                <Form.Select required>
                                    {categories
                                        .filter((category: Category) => category.direction === mode)
                                        .map((category: Category) => (
                                            <option key={category.id}>{category.name}</option>
                                        ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" placeholder="Enter description" />
                            </Form.Group>

                            <Form.Group controlId="value">
                                <Form.Label>Value</Form.Label>
                                <Form.Control required type="number" step=".01" placeholder="Value" />
                            </Form.Group>
                            <Form.Group controlId="date">
                                <Form.Label>Select Date</Form.Label>
                                <Form.Control required type="date" placeholder="Date of Transaction" />
                            </Form.Group>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" type="submit">
                                    Save {mode === 'out' ? 'Expense' : 'Income'}
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Container>
                </Modal>
            )}
        </>
    );
};

export default AddLineItem;
