import dynamic from 'next/dynamic';
import { FormCheck, FormControl, FormLabel, InputGroup } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Categories from '../components/settings/categories';
import { settingsStore } from '../library/storage';

const Settings = () => {
    const settings = settingsStore();
    const { budgetMode, budget, setBudget, setBudgetMode } = settingsStore();
    return (
        <Container>
            <Categories />
            <Row>Accounts</Row>
            <h3>Settings</h3>
            <FormCheck
                type={'checkbox'}
                id={'budgetMode'}
                label={'Budget Mode'}
                checked={budgetMode}
                onClick={() => {
                    setBudgetMode(!budgetMode);
                }}
            />
            <FormLabel>Monthly Budget</FormLabel>

            <InputGroup className="mb-3">
                <InputGroup.Text>$</InputGroup.Text>
                <FormControl
                    type="number"
                    disabled={!budgetMode}
                    value={budget}
                    onChange={(event: { target: { value: string } }) => setBudget(parseFloat(event?.target?.value))}
                />
                <InputGroup.Text>.00</InputGroup.Text>
            </InputGroup>
        </Container>
    );
};

export default dynamic(() => Promise.resolve(Settings), {
    ssr: false,
});
