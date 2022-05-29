import dynamic from 'next/dynamic';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Categories from '../components/settings/categories';

const Settings = () => {
    return (
        <Container>
            <Categories />
            <Row>Accounts</Row>
            <Row>Settings</Row>
        </Container>
    );
};

export default dynamic(() => Promise.resolve(Settings), {
    ssr: false,
});
