import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Switch from 'react-switch';
import { settingsStore } from '../../library/storage';

const Menu = () => {
    const [show, setShow] = useState(false);

    const isSortedDate = settingsStore((state) => state.isSortedDate);
    const setIsSortedDate = settingsStore((state) => state.setIsSortedDate);

    const router = useRouter();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Nav fill variant="tabs" activeKey={router.asPath}>
                <Nav.Item>
                    <Nav.Link onClick={handleShow}>
                        <FontAwesomeIcon icon={['fas', 'bars']} />
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/">Budget History</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/settings">Settings</Nav.Link>
                </Nav.Item>
            </Nav>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Filters</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <p>Sort by date</p>
                    <Switch onChange={setIsSortedDate} checked={isSortedDate} />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default Menu;
