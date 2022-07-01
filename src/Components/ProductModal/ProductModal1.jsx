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

const ProductModal1 = ({ product, setSelectedProduct }) => {
    const { setGRefresh } = useContext(GlobalStates);
    return (
        <Modal
            visible={product ? true : false}
            footer={null}
            width={'40vw'}
            centered={true}
            onCancel={() => setSelectedProduct(null)}
        >
            <Row className={styles.prod} gutter={[15, 15]} style={{ marginTop: '2rem' }}>

                    <div className={styles.info}>
                        <span>{product.title}</span>
                        <p>{product.description}</p>
                    </div>
            </Row>
        </Modal>
    );
};

export default ProductModal1;