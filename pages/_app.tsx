import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.css';
import Menu from '../components/navigation/Menu';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import {
    faBars,
    faAngleRight,
    faAngleLeft,
    faGamepad,
    faBagShopping,
    faFileInvoiceDollar,
    faMoneyBillWave,
    faTrainSubway,
    faCar,
    faHouse,
    faBasketShopping,
    faHouseMedical,
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

function MyApp({ Component, pageProps }: AppProps) {
    library.add(
        faBars,
        faAngleRight,
        faAngleLeft,
        faGamepad,
        faBagShopping,
        faFileInvoiceDollar,
        faMoneyBillWave,
        faTrainSubway,
        faCar,
        faHouse,
        faBasketShopping,
        faHouseMedical,
    );

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
