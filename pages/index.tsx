import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Budgeterino</title>
                <meta name="description" content="Budget App for Budget People" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1>Budgeterino</h1>
                <p>The best budget web app</p>
                <h3>Coming soon</h3>
            </main>
        </div>
    );
};

export default Home;
