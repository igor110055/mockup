import Layout from '../../Components/Layout/Layout';
import styles from './Landing.module.scss';
import axios from '../../config/axios';
import { Row, Col, Carousel } from 'antd';
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../Components/Loader/Loader';
import { BsFillArrowUpSquareFill } from 'react-icons/bs';
import ProductModal from '../../Components/ProductModal/ProductModal';
import { GlobalStates } from '../../Contexts/GlobalStates';

const Landing = () => {
    const { theme, setTheme } = useContext(GlobalStates);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        // wo6ie2bc-7rr5-athx:bc7m-jypr1kw48mw3
        axios.get('/public/products').then(response => {
            console.log(response.data);
            let prods = response.data;
            setProducts(prods);

            setCategories(response.data.map(item => item.category)
                .filter((value, index, self) => self.indexOf(value) === index));

            setLoading(false);
        });

    }, []);

    return (
        <Layout>

            <Carousel
	    	dots = {window.innerWidth <= 576?false:true}
                autoplay
                duration={200}
            >
                <div className={window.innerWidth <= 900?styles.carousel1:styles.carousel}>
                    <img src={window.innerWidth <= 900?"/slide/slide_11.png":"/slide/slide_1.png"} alt="" />                    
                    <div className={window.innerWidth <= 900?styles.carousel1_text + " container":styles.carousel_text + " container"}>
                        {/* <span>Women</span> */}
                        <span>Distributing profits</span>
                        <div>
                            <a href="/#explore">
                                <button>SHOP NOW</button>
                            </a>
                            <Link to={'/earn'}>
                                <button>EARN CRYPTO</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={window.innerWidth <= 900?styles.carousel1:styles.carousel}>
                    <img src={window.innerWidth <= 900?"/slide/slide_12.png":"/slide/slide_2.png"} alt="" />
                    <div className={window.innerWidth <= 900?styles.carousel1_text + " container":styles.carousel_text + " container"}>
                        {/* <span>Men</span> */}
                        <span>Doing social good</span>
                        <div>
                            <a href="/#explore">
                                <button>SHOP NOW</button>
                            </a>
                            <Link to={'/earn'}>
                                <button>EARN CRYPTO</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={window.innerWidth <= 900?styles.carousel1:styles.carousel}>
                    <img src={window.innerWidth <= 900?"/slide/slide_13.png":"/slide/slide_3.png"} alt="" />
                    <div className={window.innerWidth <= 900?styles.carousel1_text + " container":styles.carousel_text + " container"}>
                        {/* <span>Women</span> */}
                        <span>Empowering users</span>
                        <div>
                            <a href="/#explore">
                                <button>SHOP NOW</button>
                            </a>
                            <Link to={'/earn'}>
                                <button>EARN CRYPTO</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={window.innerWidth <= 900?styles.carousel1:styles.carousel}>
                    <img src={window.innerWidth <= 900?"/slide/slide_14.png":"/slide/slide_4.png"} alt="" />
                    <div className={window.innerWidth <= 900?styles.carousel1_text + " container":styles.carousel_text + " container"}>
                        {/* <span>Men</span> */}
                        <span>Embracing Open Source</span>
                        <div>
                            <a href="/#explore">
                                <button>SHOP NOW</button>
                            </a>
                            <Link to={'/earn'}>
                                <button>EARN CRYPTO</button>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* <div className={styles.carousel}>
                    <img src={window.innerWidth <= 900?"/slide/slide_15.png":"/slide/slide_5.png"}" alt="" />
                    <div className={styles.carousel_text + " container"}>
                        <span>Women</span>
                        <span>"Distributing profits"</span>
                        <div>
                            <button>SHOP NOW</button>
                            <button>EARN CRYPTO</button>
                        </div>
                    </div>
                </div> */}
            </Carousel>

            <section className={'container ' + styles.pr} id="pr">
                <div className={styles.pr_left}>
                    <span>
                        {"Products_with_Purpose >"}
                    </span>
                </div>
                <div className={styles.pr_right}>
                    <span>Distributing 60% of proceeds from every sale: 30% to creators/designers, 15% to fund public goods and 15% to reward our users.</span>
                </div>
            </section>


            <section className={'container ' + styles.jump} id="explore" style={{ scrollMarginTop: '8rem' }}>
                {/* {
                                categories.map((category, index) => {
                                    return <div key={index}>
                                        <a href={`#${category}`}>{category}</a>
                                    </div>
                                })
                            } */}
                <div >
                    <a href={'/category/women'}>Women</a>
                </div>
                <div >
                    <a href={'/category/men'}>Men</a>
                </div>
                <div >
                    <a href={'/category/kids-&-youth'}>Kids & Youth</a>
                </div>
                <div >
                    <a href={'/category/hats'}>Hats</a>
                </div>
                <div >
                    <a href={'/category/accessories'}>Accessories</a>

                </div>
                <div >
                    <a href={'/category/home-&-living'}>Home & Living</a>
                </div>
            </section>

            {/* <section className={'container ' + styles.images}>
                            {
                                categories.map((category, index) => {
                                    return <Row id={category} gutter={[25, 25]} key={index}>
                                        <Col span={24}>
                                            <h3 className={styles.category_title}>{category}</h3>
                                        </Col>
                                        {
                                            products.map((product, index) => {
                                                return <>
                                                    {
                                                        product.category === category ?
                                                            <Col span={6} onClick={() => setSelectedProduct(product)} style={{ display: !product.approved ? 'None' : null }}>
                                                                <div className={styles.images_wrapper}>
                                                                    <img src={product.design} alt="" />
                                                                </div>
                                                                <span>{product.name}</span>
                                                                <p>
                                                                    $ {product.price}
                                                                </p>
                                                            </Col>
                                                            :
                                                            null
                                                    }
                                                </>
                                            })
                                        }
                                    </Row>
                                })
                            }
                        </section> */}

            <section className='container' style={{ marginBottom: '4rem' }}>
                <Row gutter={[56, 56]}>

                    <Col sm={12} xs={24}>
                        <Link to={'/category/women'}>
                            <div className={styles.cat}>
                                <p>Women</p>
                                <span style={{ color: theme === 'dark' ? 'white' : null }}>Forever transferring 30% of the proceeds to you for staking your creativity and uploading your content</span>
                                <div style={{ overflow: 'hidden', borderRadius: '5px', objectFit: 'top' }}>
                                    <img src="/women.jpg" alt="" />
                                </div>
                            </div>
                        </Link>
                    </Col>



                    <Col sm={12} xs={24}>
                        <Link to={'/category/men'}>
                            <div className={styles.cat}>
                                <p>Men</p>
                                <span style={{ color: theme === 'dark' ? 'white' : null }}>Automatically donating 15% of the proceeds to public goods</span>
                                <div style={{ overflow: 'hidden', borderRadius: '5px', objectFit: 'top', marginTop: '2.3rem' }}>
                                    <img src="/men.jpg" alt="" />
                                </div>
                            </div>
                        </Link>
                    </Col>



                    <Col sm={12} xs={24}>
                        <Link to={'/category/kids-&-youth'}>
                            <div className={styles.cat}>
                                <p>Kids & Youth</p>
                                <span style={{ color: theme === 'dark' ? 'white' : null }}>Accomplishing the goals by leveraging on self-organized distributed systems</span>
                                <div style={{ overflow: 'hidden', borderRadius: '5px', objectFit: 'top' }}>
                                    <img src="/kids.jpg" alt="" />
                                </div>
                            </div>
                        </Link>
                    </Col>



                    <Col sm={12} xs={24}>
                        <Link to={'/category/hats'}>
                            <div className={styles.cat}>
                                <p>Hats</p>
                                <span style={{ color: theme === 'dark' ? 'white' : null }}>Protecting the buyer and the seller using smart-escrow</span>
                                <div style={{ overflow: 'hidden', borderRadius: '5px', objectFit: 'top' }}>
                                    <img src="/hats.jpg" alt="" />
                                </div>
                            </div>
                        </Link>
                    </Col>



                    <Col sm={12} xs={24}>
                        <Link to={'/category/accessories'}>
                            <div className={styles.cat}>
                                <p>Accessories</p>
                                <span style={{ color: theme === 'dark' ? 'white' : null }}>Rewarding users every time the modular system meets a preset condition</span>
                                <div style={{ overflow: 'hidden', borderRadius: '5px', objectFit: 'top' }}>
                                    <img src="/acc.jpg" alt="" />
                                </div>
                            </div>
                        </Link>
                    </Col>



                    <Col sm={12} xs={24}>
                        <Link to={'/category/home-&-living'}>
                            <div className={styles.cat}>
                                <p>Home & Lifestyle</p>
                                <span style={{ color: theme === 'dark' ? 'white' : null }}>Setting in motion the circular-economy adoption</span>
                                <div style={{ overflow: 'hidden', borderRadius: '5px', objectFit: 'top' }}>
                                    <img src="/lifestyle.jpg" alt="" />
                                </div>
                            </div>
                        </Link>
                    </Col>
                </Row>

            </section>




        </Layout >
    );
};

export default Landing;