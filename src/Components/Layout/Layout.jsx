import { useEffect, useContext, useState } from 'react';
import styles from './Layout.module.scss';
import { Link, useHistory } from 'react-router-dom';
import { message, Switch } from 'antd';
import { useThemeSwitcher } from 'react-css-theme-switcher';

//importing icons
import { BsCartFill, BsFacebook, BsYoutube, BsSunsetFill, BsSunrise } from 'react-icons/bs';
import { AiFillInstagram, AiFillTwitterCircle } from 'react-icons/ai';
import { IoMdMenu } from 'react-icons/io';
import { MdClose, MdOutlineClose } from 'react-icons/md';
import { BsTelegram } from 'react-icons/bs';
import { FaReddit, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { MdOutlineDeleteOutline } from 'react-icons/md';


//importing context api;
import { GlobalStates } from "../../Contexts/GlobalStates";


const Layout = (props) => {

    const { switcher, themes, currentTheme, status } = useThemeSwitcher();
    const { theme, setTheme, gRefresh } = useContext(GlobalStates);
    const history = useHistory();
    const [mOpen, setMOpen] = useState(false);
    const [cOpen, setCOpen] = useState(false);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        document.getElementById("root").scroll(0, 0);
        document.querySelector('body').scrollTo(0, 0);
        if (localStorage.getItem('cartData')) {
            setCart(JSON.parse(localStorage.getItem('cartData')));
        }
        // console.log(props.title)
        document.title = props.title ? props.title : 'Unme';
        window.scrollTo(0, 0);
        const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
        if (currentTheme) {
            document.documentElement.setAttribute('data-theme', currentTheme);

            if (currentTheme === 'dark') {
                setTheme('dark');
            } else {
                setTheme('light');
            }
        }
    }, [localStorage, cOpen, gRefresh]);

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
    }

    useEffect(() => {
        // console.log('theme is: ', theme);

        if (theme === 'dark') {
            // console.log('setting dark theme')
            switcher({ theme: themes.dark });
        } else {
            // console.log('setting light theme')
            switcher({ theme: themes.light });
        }
    }, [theme]);

    //defining toggleDarkMode function
    const toggleDarkMode = checked => {
        if (checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark'); //add this
            setTheme('dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light'); //add this
            setTheme('light');
        }
    }

    //defining getCartTotal function
    function getCartTotal() {
        let total = 0;
        cart.forEach(item => {
            total = total + (item.price * item.quantity);
        });

        return total;
    }



    return (
        <>
            <div className={styles.topbar__wrapper}>
                <ul className={styles.topbar + " container"}>
                    <li style={{ borderLeft: 'none', paddingLeft: 0, maxWidth: '800px', marginLeft: 'auto', marginRight: '0rem' }}>
                        <span>
                            Funding public goods & rewarding you
                            {/* The data you have shared (name, last name and address, will auto-delete after you have received the product on your end. */}
                        </span>
                    </li>
                    <li style={{ marginLeft: 'auto' }}>
                        <a href="">
                            <span>NFTs</span>
                        </a>
                    </li>
                    <li>
                        <Link to={'/how-it-works'}>
                            <a href="">
                                <span>How it works</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/learn-more'}>
                            <a href="">
                                <span>Learn More</span>
                            </a>
                        </Link>
                    </li>
                    <li style={{ borderRight: 'none' }}>
                        {/* <span>DM</span> */}
                        <Switch
                            checkedChildren={<BsSunsetFill />}
                            unCheckedChildren={<BsSunrise />}
                            size={15}
                            checked={theme === 'dark' ? true : false}
                            onChange={toggleDarkMode}
                        />
                    </li>
                </ul>
            </div>
            <div style={{ backgroundColor: "#EAE9E5" }} className={styles.nav_wrapper}>
                <nav className='container'>
                    <div className={styles.nav_left}>

                        <div onClick={() => history.push('/')} className={styles.f_logo}>
                            <img src="/logo512.png" alt="" />
                            <span>Unme</span>
                        </div>



                        <a href="/#pr" onClick={() => window.scrollTo(0, 300)}>Products with Purpose</a>



                        {/* <a href="/#explore">Explore</a> */}


                        <Link to={'/earn'}>
                            <a href="/earn">Earn Crypto</a>
                        </Link>
                    </div>
                    <div className={styles.nav_right}>

                        <div className={styles.cart} onClick={() => {
                            setCOpen(cOpen ? false : true);
                        }}>
                            <BsCartFill size={20} color={'var(--color-primary)'} />
                            {
                                cart.length > 0 && <div className={styles.count}>
                                    {cart.length}
                                </div>
                            }
                        </div>

                        {
                            mOpen ?
                                <MdClose onClick={() => setMOpen(false)} size={25} className={styles.mobile_menu} color={'var(--color-primary)'} />
                                :
                                <IoMdMenu onClick={() => setMOpen(true)} size={25} className={styles.mobile_menu} color={'var(--color-primary)'} />
                        }


                    </div>
                </nav>
            </div>

            <ul className={mOpen ? styles.mm : styles.mm + ' ' + styles.mm_close}>
                <li style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.235)' }}>
                    <span style={{ color: 'var(--color-blue)' }}>
                        Funding public goods & rewarding you
                    </span>
                </li>
                <li>
                    <span>NFTs</span>
                </li>
                <li>
                    <Link to={'/how-it-works'}>
                        <a href="">
                            <span>How it works</span>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link to={'/learn-more'}>
                        <a href="">
                            <span>Learn More</span>
                        </a>
                    </Link>
                </li>

                <li>
                    <a href="/#pr" onClick={() => window.scrollTo(0, 300)}>Products with Purpose</a>
                </li>


                <li>
                    <Link to={'/earn'}>
                        <a href="/earn">Earn Crypto</a>
                    </Link>
                </li>
                <li style={{ borderRight: 'none' }}>
                    {/* <span>DM</span> */}
                    <Switch
                        checkedChildren={<BsSunsetFill />}
                        unCheckedChildren={<BsSunrise />}
                        size={15}
                        checked={theme === 'dark' ? true : false}
                        onChange={toggleDarkMode}
                    />
                </li>
            </ul>

            {/* Cart Component */}
            <div className={cOpen ? styles.cart_drawer : styles.cart_drawer + " " + styles.cart_drawer_closed} style={{ backgroundColor: theme === 'dark' ? '#171717' : null }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button className='primary-button'>Your Cart</button>
                    <MdOutlineClose color='var(--color-blue)' onClick={() => setCOpen(false)} size={20} cursor={'pointer'} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2rem' }}>
                    {
                        cart.map((item, index) => {
                            return <div key={index} className={styles.cart_item}>
                                <img style={{ flex: '0 0 20%' }} src={item.design} alt="" />
                                <div style={{ flex: '0 0 70%', height: '100%' }}>
                                    <span style={{ display: 'block' }}>{item.name}</span>
                                    <span style={{ color: 'grey', display: 'block', marginTop: '.5rem' }}>{item.price} x {item.quantity ? item.quantity : 1}</span>
                                </div>
                                <div style={{ flex: '0 0 10%' }}>
                                    <MdOutlineDeleteOutline onClick={() => removeItemFromCart(index)} cursor={'pointer'} size={20} />
                                </div>
                            </div>
                        })
                    }
                </div>
                <div className={styles.cart_footer}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 500 }}>Total: ${getCartTotal()}</span>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                        <a href="/#pr">
                            <button className='primary-button'>Shop More</button>
                        </a>
                        <Link to={'/cart'}>
                            <button className='primary-button'>Check Out</button>
                        </Link>
                    </div>
                </div>
            </div>

            {
                mOpen &&
                <div className={styles.bg} onClick={() => setMOpen(false)}></div>
            }

            {
                cOpen &&
                <div className={styles.bg_2} onClick={() => setCOpen(false)}></div>
            }

            {props.children}
            <footer style={{ backgroundImage: 'url(/footer.png)' }}>
                <div className={'container ' + styles.footer_body} style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <span>Products_With_Purpose</span>
                    <a href="/category/women">Women</a>
                    <a href="/category/men">Men</a>
                    <a href="/category/kids-&-youth">Kids & Youth</a>
                    <a href="/category/hats">Hats</a>
                    <a href="/category/accessories">Accessories</a>
                    <a href="/category/home-&-living">Home & Lifestyle</a>
                    <Link to={'/guidelines'} style={{ marginTop: 'auto', marginBottom: '1rem' }}>
                        <a href="" style={{ marginTop: 'auto' }}>Content Guidelines & Policies</a>
                    </Link>
                </div>

                <div className={'container ' + styles.footer_body + ' ' + styles.footer_bottom} style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <span>Get In Touch</span>

                    <div className={styles.icon_box}>
                        <BsTelegram size={20} />
                        <BsFacebook size={20} />
                        <AiFillInstagram size={20} />
                        <BsYoutube size={20} />
                        <AiFillTwitterCircle size={20} />
                        <FaReddit size={20} />
                        <FaGithub size={20} />
                        <FaLinkedinIn size={20} />
                    </div>

                    <p style={{ marginTop: 'auto' }}>Copyright © 2022 All rights reserved</p>
                </div>
            </footer>
        </>
    );
};

export default Layout;