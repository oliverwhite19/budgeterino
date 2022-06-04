import { useState } from 'react';
import { Button, ButtonGroup, Container, Form, Modal, Row } from 'react-bootstrap';
import { categoryStore } from '../../library/storage/categories';
import { Category } from '../../types';
import { SketchPicker } from 'react-color';

const AddCategory = () => {
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const categories = categoryStore((state) => state.categories);
    const addCategory = categoryStore((state) => state.addCategory);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
            value: parseFloat(event.target.value.value),
            category: categories.find((category: Category) => category.name === event.target.category.value),
        };
        setValidated(true);

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
                        <SketchPicker />
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
