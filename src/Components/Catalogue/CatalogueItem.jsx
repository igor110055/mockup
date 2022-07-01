import { message, Select } from "antd";
import { useEffect, useState } from "react";
import axios from '../../config/axios';

const CatalogueItem = ({ productID, categories }) => {
    const [category, setCategory] = useState('');

    useEffect(() => {
        let index = categories.findIndex(function (cat) {
            return cat.product_id == productID;
        });
        // console.log('index is: ', index);
        if (index >= 0) {
            setCategory(categories[index].category);
        }
    }, []);

    //defining changeCategory function
    const changeCategory = (value) => {
        setCategory(value);
        axios.post('/categories', { product_id: productID, category: value }).then(response => {
            message.success('Category added/changed successfully!');
        });
    }
    return (
        <Select placeholder="Select Category" onChange={value => changeCategory(value)} value={category} style={{ minWidth: '200px' }}>
            <Select.Option value='women'>Women</Select.Option>
            <Select.Option value='men'>Men</Select.Option>
            <Select.Option value='kids-&-youth'>Kids & Youth</Select.Option>
            <Select.Option value='hats'>Hats</Select.Option>
            <Select.Option value='accessories'>Accessories</Select.Option>
            <Select.Option value='home-&-living'>Home & Lifestyle</Select.Option>
        </Select>
    );
};

export default CatalogueItem;