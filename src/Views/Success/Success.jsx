import styles from './Success.module.scss';
import axios from '../../config/axios';
import { Link } from 'react-router-dom';

//importing components
import Layout from '../../Components/Layout/Layout';
import { Button } from 'antd';
import { useEffect } from 'react';


const Success = (props) => {

    const search = props.location.search; // could be '?foo=bar'
    const params = new URLSearchParams(search);

    useEffect(() => {
        axios.patch(`/orders/${params.get('order')}`, {
            payment_status: 'paid',
            paypal_trx: params.get('token'),
            paypal_payer_id: params.get('PayerID')
        });
    }, []);

    return (
        <Layout>
            <div className={styles.success}>
                <img src="/logo.svg" alt="" />
                <h1>Your Order ID#{params.get('order')} was placed successfully</h1>
                <span>Thank you for choosing us!</span>
                <Link to={'/'}>
                    <Button type='primary'>Explore More</Button>
                </Link>
            </div>
        </Layout>
    );
};

export default Success;