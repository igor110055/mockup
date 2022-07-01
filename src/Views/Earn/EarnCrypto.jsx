import styles from './EarnCrypto.module.scss';
import axios from '../../config/axios';

//importing components
import Layout from '../../Components/Layout/Layout';
import { Row, Col, Modal } from 'antd';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../Components/Loader/Loader';
import { BsFillArrowUpSquareFill } from 'react-icons/bs';



const EarnCrypto = () => {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showLearnMore, setShowLearnMore] = useState(false);

    useEffect(() => {
        // wo6ie2bc-7rr5-athx:bc7m-jypr1kw48mw3
        axios.get('/printful/products').then(response => {
            console.log(response.data);
            let prods = response.data.result;
            setProducts(prods.reverse());

            setCategories(response.data.result.map(item => item.type)
                .filter((value, index, self) => self.indexOf(value) === index));

            setLoading(false);
        });

    }, []);

    return (
        <Layout
            title={'Earn Crypto - Unme'}
        >
            <section className={styles.header}>
                <div className={styles.header__info}>
                    <span>Distributed systems</span>
                    <span>&</span>
                    <span>Human coordination</span>
                </div>

                <img src="/crypto.png" alt="" />
            </section>
            <section className={'container ' + styles.steps}>
                <p>Steps To Earn Crypto: </p>
                <ul>
                    <li>Select the Product_with_Purpose that you want your slogan/picture/design to be uploaded to.</li>
                    <li>Upload your slogan/image/design on any of the Products_with_Purpose and provide your Telegram, Twitter or Discord handle (for example @satoshi).</li>
                    <li>{`Click on "Activate Contract" >> the website will display for you a one-time-code >> copy the code >> go to your selected social media >> paste the code on the @unmeimpactbot to activate the contract.`}</li>
                    <li>{`The website will show the options to pay $1.00 for upload-moderation: (A) pay with crypto or (B) pay with card. If selected A >> a crypto address and its respective QR code will display, if selected B >> the flow to pay with card will appear.`}</li>
                    <li>Send $1.00 to the contract to allow moderators to review your slogan/picture/design and determine if it can be exhibited on the website. The $1.00 per upload is an anti-spam prevention and it gives you the rights to get paid automatically every time your upload is sold within one of the Products_with_Purpose. <span style={{ cursor: 'pointer', color: 'var(--color-blue)' }} onClick={() => setShowLearnMore(true)}>Learn more</span></li>

                </ul>
            </section>

            <Modal
                visible={showLearnMore}
                centered={true}
                footer={null}
                onCancel={() => setShowLearnMore(false)}
            >
                <ul className={styles.learn_more}>
                    <li>A link will be provided to you, for you to share and promote your slogan/picture/design uploaded onto your selected Product_with_Purpose</li>

                    <li>For life, every time it is sold you will get paid 30% of the proceeds</li>

                    <li>Funds will be available to collect in DAI on the Polygon network</li>

                    <li>Whenever your upload is sold @unmeimpact bot will send you a direct message on the social media you previously selected to activate the contract: “Congrats! You have (the amount earned in DAI) to collect”</li>

                    <li>To withdraw the funds you shall reply to @unmeimpactbot with the command: /withdraw (and your crypto address) – for example:/withdraw 0x123456789…..</li>

                    <li>Note: once @unmeimpactbot sends you a direct message to withdraw funds, you shall collect the funds within 72 hrs otherwise funds will be sent to another destination (50% to charity and 50% to startup).</li>

                </ul>
            </Modal>

            {
                loading ?
                    <section className='container'>
                        <Loader height={'40vh'} />
                    </section>
                    :
                    <>
                        <section className={'container ' + styles.jump} id="explore" style={{ scrollMarginTop: '8rem' }}>
                            {
                                categories.map((category, index) => {
                                    return <div key={index}>
                                        <a href={`#${category}`}>{category}</a>
                                    </div>
                                })
                            }
                        </section>

                        <section className={'container ' + styles.images}>
                            {
                                categories.map((category, index) => {
                                    return <Row id={category} gutter={[25, 25]} key={index}>
                                        <Col span={24}>
                                            <h3 className={styles.category_title}>{category}</h3>
                                        </Col>
                                        {
                                            products.reverse().map((product, index) => {
                                                return <>
                                                    {
                                                        product.type === category ?
                                                            <Col sm={6} xs={12}>
                                                                <Link to={`/mockup/${product.id}`}>
                                                                    <div className={styles.images_wrapper}>
                                                                        <img src={product.image} alt="" />
                                                                    </div>
                                                                    <span>{product.type_name}</span>
                                                                    <p>
                                                                        {product.title}
                                                                    </p>
                                                                    {/* <span>${product.price}</span> */}

                                                                </Link>
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
                        </section>

                        <a href="/earn/#explore">
                            <button className={styles.to_top}>
                                <BsFillArrowUpSquareFill size={20} />
                                Back to Top
                            </button>
                        </a>
                    </>
            }
        </Layout>
    );
};

export default EarnCrypto;