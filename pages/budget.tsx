import Day from '../components/budget/Day';

const Budget = () => {
    return (
        <div>
            <Day
                date="31 May"
                lineItems={[
                    {
                        title: 'Food',
                        direction: 'out',
                        value: 44.54,
                        currency: 'CAD',
                    },
                ]}
            />

            <Day
                date="30 May"
                lineItems={[
                    {
                        title: 'Video Game',
                        direction: 'out',
                        value: 1100,
                        currency: 'HUF',
                    },
                    {
                        title: 'Discord Nitro',
                        direction: 'out',
                        value: 5,
                        currency: 'EUR',
                    },
                ]}
            />
        </div>
    );
};

export default Budget;
