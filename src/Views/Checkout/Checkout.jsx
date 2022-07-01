import styles from './Checkout.module.scss';
import { useEffect, useState } from 'react';
import { Form, Input, Select, Button } from 'antd';
import axios from '../../config/axios';

//importing components
import Layout from "../../Components/Layout/Layout";
import {
    Row,
    Col
} from 'antd';
import Loader from '../../Components/Loader/Loader';

//importing utils
import { countries } from '../../utils/data';


const Checkout = (props) => {
    const [cartData, setCartData] = useState('');
    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('cartData')) {
            setCart(JSON.parse(localStorage.getItem('cartData')));
        }
    }, []);


    //defining getCartTotal function
    function getCartTotal() {
        let total = 0;
        cart.forEach(item => {
            total = total + (item.price * item.quantity);
        });

        return total;
    }

    //defining handleCheckout function
    const handleCheckout = values => {

        setLoading(true);
        values.amount = parseFloat(getCartTotal() + parseFloat(props.match.params.shipping).toFixed(2)).toFixed(2);
        values.products = JSON.stringify(cart);
        values.shipping_charge = props.match.params.shipping;

        // axios.post('/orders', values).then(response => {
        //     console.log(response.data.links[1].href);
        //     window.location.href = response.data.links[1].href;
        // });
    }

    return (
        <Layout>
            <section className={"container " + styles.checkout}>
                <h1>Checkout</h1>
                <Row gutter={[20, 20]} justify={'center'}>
                    <Col sm={12} xs={24}>
                        <div>
                            <Form
                                name="addNewBrands"
                                onFinish={handleCheckout}
                                layout="vertical"
                            >
                                <Row gutter={[16, 16]}>
                                    <Col span={12}>
                                        <Form.Item label="First Name" name="first_name" rules={[{ required: true, message: "Please Enter Your First Name" }]}>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Last Name" name="last_name" rules={[{ required: true, message: "Please Enter Your Last Name" }]}>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item label="Address" name="address" rules={[{ required: true, message: "Please Enter Your Address" }]}>
                                            <Input.TextArea />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Apartment, suits, etc" name="apt" rules={[{ required: false }]}>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Country" name="country" rules={[{ required: true, message: "Please select your country from the list" }]}>
                                            <Select
                                                showSearch
                                                filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                            >
                                                {
                                                    countries.map((country, index) => {
                                                        return <Select.Option key={index} value={country.name}>{country.name}</Select.Option>
                                                    })
                                                }
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="City" name="city" rules={[{ required: true, message: "Please enter your city" }]}>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Postal Code" name="postal_code" rules={[{ required: true, message: "Please enter your postal code" }]}>
                                            <Input type={'number'} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <button className={styles.pay} type="submit">
                                            <span style={{ display: 'block', marginLeft: '1rem' }}>Express Checkout</span>
                                            {
                                                !loading ?
                                                    <>
                                                        <img src="https://bagisto.com/wp-content/uploads/2021/02/PayPal-Smart-Button.png" alt="" />
                                                        <div className={styles.crypto}>Pay With Crypto</div>
                                                    </>
                                                    :
                                                    <Loader />
                                            }
                                        </button>
                                    </Col>

                                    {/* <Form.Item>
                                    <Button type="primary" htmlType="submit" block style={{ marginTop: 10 }} loading={updateBrandLoading}>
                                        Update Brand
                                    </Button>
                                </Form.Item> */}
                                </Row>
                            </Form>
                        </div>
                    </Col>
                    {/* <Col sm={12}>
                        <div className={styles.checkout__right}>
                            {
                                cart.map((item, index) => {
                                    return <div>
                                        <img src={cartData.design} alt="" />
                                        <div className={styles.checkout__right__info}>
                                            <h2>{cartData.name}</h2>
                                            <span style={{ display: 'flex' }}>Color: {cartData.color} <span style={{ backgroundColor: cartData.color }} className={styles.color_display}></span> </span>
                                            <span>Size: {cartData.size}</span>
                                            <span>Price: ${cartData.price}</span>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </Col> */}
                </Row>
            </section>
        </Layout>
    );
};

export default Checkout;