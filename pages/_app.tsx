import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.css';
import Menu from '../components/navigation/Menu';
import styles from '../styles/Home.module.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Budgeterino</title>
            </Head>
            <Menu />
            <main className={styles.main}>
                <Component {...pageProps} />
            </main>
        </>
    );
}

export default MyApp;
