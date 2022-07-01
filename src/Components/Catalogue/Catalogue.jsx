import { useState, useEffect } from 'react';
import axios from '../../config/axios';
import styles from './Catalogue.module.scss';
import { Image, Input, message, Button, Select } from 'antd';
import CatalogueItem from './CatalogueItem';

const Catalogue = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // wo6ie2bc-7rr5-athx:bc7m-jypr1kw48mw3
        axios.get('/printful/products').then(response => {
            console.log(response.data);
            let prods = response.data.result;
            setProducts(prods.reverse());
        });

        axios.get('/public/categories').then(response => {
            console.log(response.data);
            setCategories(response.data);
        });

    }, []);
    return (
        <div>
            <h1 style={{ marginTop: '1rem' }}>Submitted Designs</h1>
            <table className={styles.table}>
                <thead>
                    <th>ID</th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Sub Category</th>
                    <th>Category</th>
                </thead>
                <tbody>
                    {
                        products.map((prod, index) => {
                            return <tr key={index}>
                                <td>{prod.id}</td>
                                <td>
                                    <Image src={prod.image} />
                                </td>
                                <td>
                                    {prod.title}
                                </td>
                                <td>
                                    {prod.type_name}
                                </td>
                                <td style={{ display: 'flex' }}>
                                    <CatalogueItem productID={prod.id} categories={categories} />
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Catalogue;