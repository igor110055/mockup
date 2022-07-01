import styles from './Success.module.scss';
import axios from '../../config/axios';
import { Link } from 'react-router-dom';

//importing components
import Layout from '../../Components/Layout/Layout';
import { Button } from 'antd';
import { useEffect } from 'react';


const EarnSuccess = (props) => {

    const search = props.location.search; // could be '?foo=bar'
    const params = new URLSearchParams(search);

    useEffect(() => {
        axios.patch(`/products/${params.get('product')}`, {
            paypal_trx_id: params.get('token'),
            paypal_user_id: params.get('PayerID')
        });
    }, []);

    return (
        <Layout>
            <div className={styles.success}>
                <img src="/logo.svg" alt="" />
                <h1>Your Design ID#{params.get('product')} was submitted successfully</h1>
                <span>Once we check and confirm that design are aligned with our content guidelines your design will be live on our site.</span>
                <Link to={'/earn'}>
                    <Button type='primary'>Earn More</Button>
                </Link>
            </div>
        </Layout>
    );
};

export default EarnSuccess;