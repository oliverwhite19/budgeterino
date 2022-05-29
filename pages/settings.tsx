import dynamic from 'next/dynamic';
import { useState } from 'react';
import { FormCheck, FormControl, FormLabel, InputGroup } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Categories from '../components/settings/categories';
import useStorage from '../hooks/useStorage';

export const defaultSettings = {
    budgetMode: false,
    budget: 1000,
};

const Settings = () => {
    const { getItem, setItem } = useStorage();
    const settings = getItem('settings', defaultSettings, 'local');
    const [budgetMode, setBudgetMode] = useState(settings.budgetMode);
    const [budget, setBudget] = useState(settings.budget);
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
                    setItem('settings', { ...settings, budgetMode: !budgetMode }, 'local');
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
                    onBlur={(event: { target: { value: string } }) => {
                        setItem('settings', { ...settings, budget: parseFloat(event.target.value) }, 'local');
                        setBudget(parseFloat(event.target.value));
                    }}
                />
                <InputGroup.Text>.00</InputGroup.Text>
            </InputGroup>
        </Container>
    );
};

export default dynamic(() => Promise.resolve(Settings), {
    ssr: false,
});
