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

const ProductModal2 = ({ product, setViewDesignImg }) => {
    const { setGRefresh } = useContext(GlobalStates);
    return (
        <Modal
            visible={product ? true : false}
            footer={null}
            width={'50vw'}
            centered={true}
            onCancel={() => setViewDesignImg(null)}
        ><br></br>
	<div>
		<table border='2'width="100%">
			<tr valign='center'><td align='center'>
			<div className={styles.info}>
			    <img  style={{width: '80%',}} src={product} />
			</div>
			</td><td align='center'>
			<div className={styles.info}>
			    <img style={{width: '80%',}} src={product} />
			</div>
			</td></tr>
		</table>
	</div>
        </Modal>
    );
};

export default ProductModal2;