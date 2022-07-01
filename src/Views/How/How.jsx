import Layout from '../../Components/Layout/Layout';
import styles from './How.module.scss';
import { Row, Col } from 'antd';

const How = () => {
    return (
        <Layout
            title={'How it works - Unme'}
        >
            <section className={styles.how + " " + "container"}>

                <Row>
                    <Col sm={10}>
                        <img src="/optimization.png" alt="" className={styles.banner} />
                    </Col>
                    <Col sm={14} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h2>
                            Optimization
                        </h2>
                        <p>
                            {"Normally, when you buy from other stores > the money goes from you/the buyer (point A) --> to the seller (point B), and that’s it."}
                        </p>

                        <p>
                            With Unme the transactions go far beyond than “from point A to point B” and instead: a coordinated-cascade-of-several-transactions are programmatically executed with the objective of distributing 60% of the proceeds to do social good.
                        </p>

                        <p>
                            {"When interacting with this protocol, rather than being just “a consumer” or “a client” > you become a prosumer (an individual who does not only consumes but also produces to help mitigate and resolve some of society’s fundamental problems)."}
                        </p>

                    </Col>
                </Row>

                <Row>
                    <Col sm={14} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h2>
                            Alignment of incentives
                        </h2>
                        <p>
                            {"Every time a Product_with_Purpose is sold > the system distributes, 15% of the proceeds to a charitiy (eg Binance charity, a crypto charity that helps accelerate and accomplish the SDGs (Sustainable Development Goals) and 15% to fund other public goods and Open Source projects like the Gitcoin Grants."}
                        </p>

                        <p>
                            Simultaneously, another 30% of the proceeds are automatically transferred to anyone who mints or uploads her/his slogan, picture or art-design and such is displayed on the item sold.
                        </p>

                        <p>
                            {"The transactions distributing 60% of the proceeds amongst the Sustainable Development Goals (SDGs), the Gitcoin Grants, and the content-creators > all happen on-chain, therefore they are fully transparent and publicly auditable."}
                        </p>

                        <p>
                            Donations to charities and payments to content-creators/designers are also effected in BTC via Lightning Network (LN).
                        </p>

                    </Col>
                    <Col sm={10} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <img src="/incentive.png" alt="" className={styles.banner} />
                    </Col>
                </Row>

                <Row>
                    <Col sm={10}>
                        <img src="/security.png" alt="" className={styles.banner} />
                    </Col>
                    <Col sm={14} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h2>
                            Security by design
                        </h2>
                        <p>
                            When you buy one (or more than one) Product_with_Purpose, and pay with crypto, the funds you send are held in a smart-escrow to neutralize risks and to protect the buyer and the seller.
                        </p>

                        <p>
                            As the buyer, you can release the funds from the smart-escrow at anytime you wish. But by default, our code allows you (the buyer) to release the funds within 72 hours after receiving the item and having confirmed that all is OK with it. To release the funds you only have to click the “Release” button.
                        </p>

                        <p>
                            {"If by any remote chance you are not ok with the item, then you can click the “Dispute” button and a Unme steward will assist you and follow up to find the solution > (i) a free-exchange of the same item; or (ii) a refund from the smart-escrow to you."}
                        </p>


                        <p>
                            If the item is 100% okay and you did not release the funds (for example, because you forgot) then funds are automatically released to the seller 72 hours after you have received the Product_with_Purpose.
                        </p>

                    </Col>

                </Row>






            </section>
        </Layout>
    );
};

export default How;