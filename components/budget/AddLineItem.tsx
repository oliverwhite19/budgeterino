import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { budgetItem } from '../../pages/budget';
import useLocalStorage from 'react-localstorage-hook';

const AddLineItem = () => {
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);
    let setItems = (items: budgetItem[]) => {};
    let items: budgetItem[] = [];
    if (typeof window !== 'undefined') {
        [items, setItems] = useLocalStorage('items', []);
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        setValidated(true);
        setItems([
            ...items,
            {
                title: event.target.formBasicTitle.value,
                date: event.target.dot.value,
                direction: 'out',
                value: event.target.formBasicQuantity.value,
                currency: event.target.formBasicCurrency.value,
            },
        ]);

        event.preventDefault();
        setShow(false);
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add New Item
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Item</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control required type="text" placeholder="Enter title" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicQuantity">
                        <Form.Label>Value</Form.Label>
                        <Form.Control required type="number" step=".01" placeholder="Quantity" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCurrency">
                        <Form.Label>Currency</Form.Label>
                        <Form.Control required type="text" placeholder="Enter currency" />
                    </Form.Group>

                    <Form.Group controlId="formBasicCurrency">
                        <Form.Label>Select Date</Form.Label>
                        <Form.Control required type="date" name="dot" placeholder="Date of Transaction" />
                    </Form.Group>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default AddLineItem;
