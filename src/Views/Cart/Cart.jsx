import { useState, useEffect, useContext } from 'react';
import Layout from "../../Components/Layout/Layout";
import { Row, Col, Input, message, InputNumber } from 'antd';
import styles from './Cart.module.scss';
import { MdClose } from 'react-icons/md';
import axiosV2 from 'axios';
import { Select } from 'antd';
import { useHistory } from 'react-router-dom';

import { countries } from '../../utils';

//importing context api;
import { GlobalStates } from "../../Contexts/GlobalStates";

const Cart = () => {

    const history = useHistory();
    const [cart, setCart] = useState([]);
    const [states, setStates] = useState([]);
    const [shipping, setShipping] = useState(0);
    const [country, setCountry] = useState(null);
    const [sTotal, setSTotal] = useState(0);
    const [refresh, setRefresh] = useState(null);

    const { theme, setTheme, gRefresh, setGRefresh } = useContext(GlobalStates);

    useEffect(() => {
        if (localStorage.getItem('cartData')) {
            setCart(JSON.parse(localStorage.getItem('cartData')));
        }
    }, []);

    useEffect(() => {
        let total = 0;
        cart.forEach(item => {
            total = total + (item.price * item.quantity);
        });
        setSTotal(total);
    }, [cart, refresh, gRefresh]);

    //defining removeItemFromCart function
    const removeItemFromCart = (index) => {
        let newArr = [];
        for (let i = 0; i < cart.length; i++) {
            if (i != index) {
                newArr.push(cart[i]);
            }
        }
        // console.log(index);
        setCart(newArr);
        localStorage.setItem('cartData', JSON.stringify(newArr));
        setGRefresh(Math.random());
    }


    //defining getCartTotal function
    function getCartTotal() {
        let total = 0;
        cart.forEach(item => {
            total = total + (item.price * item.quantity);
        });

        return total;
    }

    //defining calcShipping function
    const calcShipping = () => {
        let total = 0;
        cart.forEach(item => {
            total = total + item.quantity;
        });
        message.success('Shipping charge added');
        setShipping(6.29 + (total - 1) * 1.60);
    }

    //defining changeQuantity
    const changeQuantity = (value, item) => {
        const index = cart.indexOf(item);
        let bCart = cart;
        bCart[index].quantity = value;
        setCart(bCart);
        localStorage.setItem('cartData', JSON.stringify(bCart));
        setRefresh(Math.random());
    }

    return (
        <Layout
            title={'Shopping Cart'}
        >
            <div className={'container ' + styles.wrapper} style={{ marginTop: '4rem', marginBottom: '4rem' }}>
                <Row gutter={[26, 26]}>
                    <Col xs={24} sm={16}>
                        <div className={styles.table_wrapper}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>ITEM</th>
                                        <th>PRICE</th>
                                        <th>QUANTITY</th>
                                        <th>TOTAL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cart.map((item, index) => {
                                            return <tr key={index}>
                                                <td style={{ display: 'flex', alignItems: 'center' }}>
                                                    <img width={'100px'} src={item.design} alt="" style={{ marginRight: '1rem' }} />
                                                    <span>{item.name}</span>
                                                </td>
                                                <td>
                                                    <span style={{ whiteSpace: 'nowrap' }}>$ {item.price}</span>
                                                </td>
                                                <td>

                                                    {/* <InputNumber
                                                            min={1}
                                                            defaultValue={item.quantity}
                                                            onChange={value => changeQuantity(value, item)}
                                                        /> */}
                                                    <div className={styles.qty}>
                                                        <button
                                                            style={{ borderRight: '1px solid #d9d9d9' }}
                                                            onClick={() => {
                                                                if (item.quantity - 1 !== 0) {
                                                                    changeQuantity(item.quantity - 1, item)
                                                                }
                                                            }}
                                                        >
                                                            -
                                                        </button>
                                                        <button>{item.quantity}</button>
                                                        <button onClick={() => changeQuantity(item.quantity + 1, item)} style={{ borderLeft: '1px solid #d9d9d9' }}>+</button>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                        <MdClose onClick={() => removeItemFromCart(index)} size={20} style={{ cursor: 'pointer' }} />
                                                        <span style={{ whiteSpace: 'nowrap' }}>
                                                            $ {item.price * item.quantity}
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className={styles.box} style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', border: '1px solid #e6e6e6', borderRadius: '10px', padding: '1rem 2rem' }}>
                            <a href="/earn"><button className='primary-button'>Design More</button></a>
                            <a href="/#pr"><button className='primary-button'>Shop More</button></a>
                        </div>
                    </Col>
                    <Col xs={24} sm={8}>
                        <div className={styles.calc}>
                            <span style={{ fontSize: '1.45rem', fontWeight: 'bold' }}>CART TOTAL</span>
                            <div className={styles.info} style={{ marginTop: '1rem' }}>
                                <span>Subtotal: </span>
                                <span style={{ marginLeft: '1rem' }}>${sTotal} </span>
                            </div>
                            <hr className={styles.hr} />
                            <div className={styles.info} style={{ marginTop: '0rem', display: 'flex' }}>
                                <span>Shipping: </span>
                                <div style={{ marginLeft: '1rem', display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontSize: '.8rem' }}>Calculate Shipping</span>
                                    <Select
                                        style={{ marginTop: '.5rem' }}
                                        placeholder='Select country'
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        showSearch
                                        onChange={(value) => {
                                            console.log(value);
                                            setCountry(value);
                                            for (let i = 0; i < countries.length; i++) {
                                                if (countries[i].code == value) {
                                                    setStates(countries[i].states ? countries[i].states : []);
                                                }
                                            }
                                        }}
                                    >
                                        {
                                            countries.map((country, index) => {
                                                return <Select.Option value={country.code} >{country.name}</Select.Option>
                                            })
                                        }
                                    </Select>

                                    <Select
                                        style={{ marginTop: '.5rem' }}
                                        placeholder='Select state'
                                    >
                                        {
                                            states.map((state, index) => {
                                                return <Select.Option>{state.name}</Select.Option>
                                            })
                                        }
                                    </Select>

                                    <Input style={{ marginTop: '.5rem' }} type={'text'} placeholder='Postal Code / Zip' />

                                    <button onClick={() => {
                                        if (!country) {
                                            message.error('Country is required!');
                                        } else {
                                            calcShipping();
                                        }
                                    }} style={{ marginTop: '1rem' }} className='primary-button'>Update Total</button>
                                </div>

                            </div>
                            <hr className={styles.hr} />
                            <div className={styles.info} style={{ marginTop: '0rem' }}>
                                <span>Total: </span>
                                <span style={{ marginLeft: '1rem' }}>${sTotal + shipping} </span>
                            </div>
                            <hr className={styles.hr} />
                            <button onClick={() => {
                                if (!shipping) {
                                    message.error('Please provide delivery details and update total first!')
                                } else {
                                    history.push(`/checkout/${shipping}`);
                                }
                            }} style={{ width: 'fit-content' }} className='primary-button'>Checkout</button>
                        </div>
                    </Col>
                </Row>
            </div>
        </Layout>
    );
};

export default Cart;