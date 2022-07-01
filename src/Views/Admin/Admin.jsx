import axios from '../../config/axios';
import styles from './Admin.module.scss';
//importing components
import { Input, Button, Image, Switch, message, Radio } from 'antd';
import { useEffect, useState } from 'react';
import Layout from '../../Components/Layout/Layout';
import moment from 'moment';
import Catalogue from '../../Components/Catalogue/Catalogue';
import Clipart from '../../Components/Clipart/Clipart';

const Admin = () => {
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useState(false);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [view, setView] = useState('products');
    const [refresh, setRefresh] = useState(null);

    useEffect(() => {
        axios.get('/admin/orders').then(response => {
            setOrders(response.data)
            console.log(response.data);
        });
        axios.get('/public/products').then(response => {
            console.log(response.data);
            setProducts(response.data)
        });
    }, [refresh]);

    return (
        <Layout>
            {
                !auth ?
                    <section style={{ width: '100%', height: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <Input.Password placeholder='password' style={{ maxWidth: '300px' }} onChange={e => setPassword(e.target.value)} />
                        <Button type='primary' style={{ marginTop: '1rem' }}
                            onClick={() => {
                                if (password == '1234') {
                                    setAuth(true);
                                } else {
                                    message.error('Invalid Password');
                                }
                            }}
                        >Login</Button>
                    </section>
                    :
                    <section className={'container'} style={{ padding: '4rem 0' }}>
                        <Radio.Group
                            onChange={(e) => {
                                setView(e.target.value)
                            }} value={view}
                        >
                            <Radio.Button value="products">Products</Radio.Button>
                            <Radio.Button value="orders">Orders</Radio.Button>
                            <Radio.Button value="catalogue">Catalogue</Radio.Button>
                            <Radio.Button value="clipart">Cliparts</Radio.Button>
                        </Radio.Group>
                        {
                            view === 'products' ?
                                <>
                                    <h1 style={{ marginTop: '1rem' }}>Submitted Designs</h1>
                                    <table className={styles.table}>
                                        <thead>
                                            <th>ID</th>
                                            {/* <th>Canvas</th> */}
                                            <th>Design</th>
                                            <th>Handle</th>
                                            <th>Name</th>
                                            <th>Size</th>
                                            <th>Color</th>
                                            <th>Price</th>
                                            <th>Payment Details</th>
                                            <th>Approved</th>
                                        </thead>
                                        <tbody>
                                            {
                                                products.map((prod, index) => {
                                                    return <tr key={index}>
                                                        <td>{prod.id}</td>
                                                        {/* <td>
                                                <Image src={prod.canvas} />
                                            </td> */}
                                                        <td>
                                                            <Image src={prod.design} />
                                                        </td>
                                                        <td>
                                                            {prod.handle}
                                                        </td>
                                                        <td>
                                                            {prod.name}
                                                        </td>
                                                        <td>
                                                            {prod.size}
                                                        </td>
                                                        <td>
                                                            <span className={styles.color} style={{ backgroundColor: prod.color }}></span>
                                                        </td>
                                                        <td>
                                                            $ {prod.price}
                                                        </td>
                                                        <td style={{ display: 'flex', flexDirection: 'column' }}>
                                                            <span>Paypal User ID: {prod.paypal_user_id}</span>
                                                            <span>Paypal TRX ID: {prod.paypal_trx_id}</span>
                                                        </td>
                                                        <td>
                                                            <Switch defaultChecked={prod.approved} onChange={value => {
                                                                axios.patch(`/products/${prod.id}`, { approved: value }).then(response => {
                                                                    if (value) {
                                                                        message.success('Design Approved And Visible Now!');
                                                                    } else {
                                                                        message.success('Design Is Now Hidden!');
                                                                    }
                                                                })
                                                            }} />
                                                        </td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </>
                                : view === 'catalogue' ?
                                    <Catalogue />
                                    :
                                    view === 'clipart' ?
                                        <Clipart />
                                        :
                                        <>
                                            <h1 style={{ marginTop: '1rem' }}>Orders</h1>
                                            <table className={styles.table}>
                                                <thead>
                                                    <th>ID</th>
                                                    {/* <th>Canvas</th> */}
                                                    <th>First Name</th>
                                                    <th>Last Name</th>
                                                    <th>Address</th>
                                                    <th>Timestamp</th>
                                                    <th>Payment</th>
                                                    <th>Price</th>
                                                    <th>Product Details</th>
                                                    <th>Design</th>
                                                    <th>Action</th>
                                                </thead>
                                                <tbody>
                                                    {
                                                        orders.map((order, index) => {
                                                            return <tr key={index}>
                                                                <td>{order.id}</td>
                                                                <td>
                                                                    {order.first_name}
                                                                </td>
                                                                <td>
                                                                    {order.last_name}
                                                                </td>
                                                                <td style={{ display: 'flex', flexDirection: 'column' }}>
                                                                    <span>Address: {order.address}</span>
                                                                    <span>Apartment/Suite: {order.apt}</span>
                                                                    <span>City: {order.city}</span>
                                                                    <span>Postal: {order.postal_code}</span>
                                                                    <span>Country: {order.country}</span>
                                                                </td>
                                                                <td>
                                                                    {moment(order.timestamp).format('MMMM D, YYYY - LT')}
                                                                </td>
                                                                <td style={{ display: 'flex', flexDirection: 'column' }}>
                                                                    <span>Paypal User ID: {order.paypal_payer_id}</span>
                                                                    <span>Paypal TRX ID: {order.paypal_trx}</span>
                                                                </td>
                                                                <td>
                                                                    $ {order.amount}
                                                                </td>
                                                                <td style={{ display: 'flex', flexDirection: 'column' }}>
                                                                    <span>Name: {order.product?.name}</span>
                                                                    <span>Name: {order.product?.size}</span>
                                                                    <div style={{ display: 'flex' }}>
                                                                        Color:
                                                                        <span className={styles.color} style={{ backgroundColor: order.product?.color }}></span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <Image src={order.product?.design} />
                                                                </td>

                                                                <td>
                                                                    <Button type='primary' onClick={() => {
                                                                        axios.delete(`/admin/orders/${order.id}`).then(response => {
                                                                            message.success('Order Info Deleted Successfully');
                                                                            setRefresh(Math.random());
                                                                        })
                                                                    }}>
                                                                        Delete Order
                                                                    </Button>

                                                                </td>
                                                            </tr>
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </>
                        }
                    </section>
            }
        </Layout>
    );
};

export default Admin;