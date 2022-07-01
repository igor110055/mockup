import { useContext } from 'react';
import styles from './ProductModal.module.scss';
import { Link } from 'react-router-dom'
import {
    Modal,
    Row,
    Col,
    message
} from 'antd';
import { GlobalStates } from '../../Contexts/GlobalStates';

const ProductModal = ({ product, setSelectedProduct }) => {
    const { setGRefresh } = useContext(GlobalStates);
    return (
        <Modal
            visible={product ? true : false}
            footer={null}
            width={'80vw'}
            centered={true}
            onCancel={() => setSelectedProduct(null)}
        >
            <Row className={styles.prod} gutter={[15, 15]} style={{ marginTop: '2rem' }}>
                <Col xs={24} sm={12}>
                    <img className={styles.img} src={product.design} alt="" />
                </Col>
                <Col xs={24} sm={12}>
                    <div className={styles.info}>
                        <span>{product.name}</span>
                        <p>{product.description}</p>
                        <p>Size: {product.size}</p>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <p>Color: </p>
                            <span className={styles.color_box} style={{ backgroundColor: product.color }}></span>
                        </div>
                    </div>

                    <div className={styles.button_box}>

                        <button onClick={() => {
                            let prod = product;
                            prod.quantity = 1;
                            if (localStorage.getItem('cartData')) {
                                let data = JSON.parse(localStorage.getItem('cartData'));
                                data.push(prod);
                                localStorage.setItem('cartData', JSON.stringify(data));
                            } else {
                                localStorage.setItem('cartData', JSON.stringify([prod]));
                            }
                            message.success('Product added to cart successfully!');
                            setGRefresh(Math.random())
                        }}>Add to cart</button>

                        <Link to={`/mockup/${product.product_id}?variant=${product.variant_id}`}>
                            <button>Design Your Own</button>
                        </Link>
                    </div>
                </Col>
            </Row>
        </Modal>
    );
};

export default ProductModal;