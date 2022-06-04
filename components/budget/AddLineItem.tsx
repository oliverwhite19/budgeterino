import { nanoid } from 'nanoid';
import { useState } from 'react';
import { Button, ButtonGroup, Container, Form, Modal, Row } from 'react-bootstrap';
import { budgetStore } from '../../library/storage';
import { categoryStore } from '../../library/storage/categories';
import { Category, Direction } from '../../types';
import Select from 'react-select';

const AddLineItem = () => {
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const [mode, setMode] = useState(Direction.OUT);
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
    const categories = categoryStore((state) => state.categories);
    const addItem = budgetStore((state) => state.addItem);

    const handleClose = () => setShow(false);
    const handleShow = (mode: Direction) => {
        setMode(mode);
        setShow(true);
    };
    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false || !selectedCategories.length) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        const item = {
            description: event.target.description.value,
            date: event.target.date.value,
            direction: mode,
            value: parseFloat(event.target.value.value),
            categories: selectedCategories,
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
                    <Button variant="outline-danger" onClick={() => handleShow(Direction.OUT)}>
                        Add New Expense
                    </Button>
                    <Button variant="outline-success" onClick={() => handleShow(Direction.IN)}>
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
                                <Select
                                    onChange={(cats) => setSelectedCategories(cats.map((c) => c))}
                                    isMulti
                                    options={categories.filter((category: Category) => category.direction === mode)}
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option.id}
                                />
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
