import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { List } from 'react-bootstrap-icons';
import { useRouter } from 'next/router';

const Menu = () => {
    const [show, setShow] = useState(false);

    const router = useRouter();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Nav fill variant="tabs" activeKey={router.asPath}>
                <Nav.Item>
                    <Nav.Link onClick={handleShow}>
                        <List />
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/budget">Budget History</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/settings">Settings</Nav.Link>
                </Nav.Item>
            </Nav>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Filters</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>Here is where the filters will be located</Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default Menu;
