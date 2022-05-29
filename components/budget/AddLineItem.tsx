import { useState } from 'react';
import { Button, ButtonGroup, Container, Form, Modal, Row } from 'react-bootstrap';
import useStorage from '../../hooks/useStorage';
import { budgetItem } from '../../pages';

const AddLineItem = ({ addItem }: { addItem: (item: budgetItem) => void }) => {
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const { getItem, setItem } = useStorage();
    const items = getItem('items', [], 'local');
    const [mode, setMode] = useState('out');

    const handleClose = () => setShow(false);
    const handleShow = (mode: string) => {
        setMode(mode);
        setShow(true);
    };
    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        const item = {
            description: event.target.description.value,
            date: event.target.date.value,
            direction: mode,
            value: parseFloat(event.target.value.value),
        };
        setValidated(true);
        setItem('items', [...items, item], 'local');
        addItem(item);

        event.preventDefault();
        setShow(false);
    };

    return (
        <>
            <Container fluid>
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
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New {mode === 'out' ? 'Expense' : 'Income'}</Modal.Title>
                </Modal.Header>
                <Container>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
        </>
    );
};

export default AddLineItem;
