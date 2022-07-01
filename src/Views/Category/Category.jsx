import styles from './Category.module.scss';
import { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import axios from '../../config/axios';
import { Row, Col, Radio, Space } from 'antd';
import ProductModal from '../../Components/ProductModal/ProductModal';
import { Link } from 'react-router-dom';
import Loader from '../../Components/Loader/Loader';


const Category = (props) => {

    const [products, setProducts] = useState([]);
    const [subCats, setSubCats] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedSubCat, setSelectedSubCat] = useState('all');

    useEffect(() => {
        console.log('i am useeffect');
        window.scrollTo(0, 0);
        // wo6ie2bc-7rr5-athx:bc7m-jypr1kw48mw3
        axios.get('/public/products').then(response => {
            console.log(response.data);
            let prods = response.data;
            setProducts(prods);
            window.scrollTo(0, 0);

            setSubCats(response.data.map(item => item.sub_category)
                .filter((value, index, self) => self.indexOf(value) === index));

            setLoading(false);
        });

    }, []);

    function makeTitle(slug) {
        var words = slug.split('-');

        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            words[i] = word.charAt(0).toUpperCase() + word.slice(1);
        }

        return words.join(' ');
    }


    return (
        <Layout
            title={`${makeTitle(props.match.params.category)} - Unme`}
        >

            {
                loading ?
                    <Loader height={'50vh'} />
                    :
                    <>
                        <section className={'container ' + styles.jump} id="explore" style={{ scrollMarginTop: '8rem' }}>

                            <div >
                                <Link to={'/category/women'}>
                                    <span>Women</span>
                                </Link>
                            </div>
                            <div >
                                <Link to={'/category/men'}>
                                    <span>Men</span>
                                </Link>
                            </div>
                            <div >
                                <Link to={'/category/kids-&-youth'}>
                                    <span>Kids & Youth</span>
                                </Link>
                            </div>
                            <div >
                                <Link to={'/category/hats'}>
                                    <span>Hats</span>
                                </Link>
                            </div>
                            <div >
                                <Link to={'/category/accessories'}>
                                    <span>Accessories</span>
                                </Link>
                            </div>
                            <div >
                                <Link to={'/category/home-&-living'}>
                                    <span>Home & Living</span>
                                </Link>
                            </div>
                        </section>

                        <section className={'container ' + styles.ccats}>
                            <Row gutter={[26, 26]}>
                                <Col sm={4}>
                                    <h1 onClick={() => setSelectedSubCat('all')} style={{ cursor: 'pointer' }}>{makeTitle(props.match.params.category)}</h1>
                                    {/* <Radio.Group onChange={(e) => setSelectedSubCat(e.target.value)} value={selectedSubCat}>
                                        <Space direction="vertical">
                                            <Radio value={'all'}>All</Radio>
                                            {
                                                subCats.map((sub, index) => {
                                                    return <Radio value={sub} key={index}>{sub}</Radio>
                                                })
                                            }
                                        </Space>
                                    </Radio.Group> */}
                                    {
                                        props.match.params.category === 'men' ?
                                            <ul className={styles.nav}>
                                                <span onClick={() => setSelectedSubCat('t-shirt')}>Shirts</span>
                                                <li onClick={() => setSelectedSubCat('t-shirt')}>T-shirts</li>
                                                <li onClick={() => setSelectedSubCat('shirt')}>All-over shirts</li>
                                                <li onClick={() => setSelectedSubCat('polo')}>Polo shirts</li>
                                                <li onClick={() => setSelectedSubCat('sleeve')}>3/4 sleeve shirts</li>
                                                <li onClick={() => setSelectedSubCat('sleeve')}>Long sleeve shirts</li>
                                                <li onClick={() => setSelectedSubCat('embroidered sh')}>Embroidered shirts</li>

                                                <span onClick={() => setSelectedSubCat('jacket')}>Jackets</span>
                                                <span onClick={() => setSelectedSubCat('hoodie')}>All hoodies and sweatshirts</span>
                                                <li onClick={() => setSelectedSubCat('hoodie')}>Hoodies</li>
                                                <li onClick={() => setSelectedSubCat('sweatshirt')}>Sweatshirts</li>

                                                <span>Bottoms</span>
                                                <li onClick={() => setSelectedSubCat('sweatpant')}>{"Sweatpants & joggers"}</li>
                                                <li onClick={() => setSelectedSubCat('underwear')}>Underwear</li>
                                                <li onClick={() => setSelectedSubCat('leggin')}>Leggings</li>
                                                <li onClick={() => setSelectedSubCat('short')}>Shorts</li>
                                                <span onClick={() => setSelectedSubCat('swimw')}>Swimwear</span>
                                            </ul>
                                            : props.match.params.category === 'women' ?
                                                <ul className={styles.nav}>
                                                    <span onClick={() => setSelectedSubCat('t-shirt')}>Shirts</span>
                                                    <li onClick={() => setSelectedSubCat('t-shirt')}>T-shirts</li>
                                                    <li onClick={() => setSelectedSubCat('shirt')}>All-over shirts</li>
                                                    <li onClick={() => setSelectedSubCat('tank')}>Tank tops</li>
                                                    <li onClick={() => setSelectedSubCat('crop')}>Crop tops</li>
                                                    <li onClick={() => setSelectedSubCat('embroidered sh')}>Embroidered shirts</li>
                                                    <li onClick={() => setSelectedSubCat('sleeve')}>3/4 sleeve shirts</li>
                                                    <li onClick={() => setSelectedSubCat('sleeve')}>Long sleeve shirts</li>


                                                    <span onClick={() => setSelectedSubCat('hoodie')}>All hoodies and sweatshirts</span>
                                                    <li onClick={() => setSelectedSubCat('hoodie')}>Hoodies</li>
                                                    <li onClick={() => setSelectedSubCat('sweatshirt')}>Sweatshirts</li>
                                                    <span onClick={() => setSelectedSubCat('jacket')}>Jackets</span>

                                                    <span>Bottoms</span>
                                                    <li onClick={() => setSelectedSubCat('sweatpant')}>{"Sweatpants & joggers"}</li>
                                                    <li onClick={() => setSelectedSubCat('underwear')}>Underwear</li>
                                                    <li onClick={() => setSelectedSubCat('leggin')}>Leggings</li>
                                                    <li onClick={() => setSelectedSubCat('short')}>Shorts</li>

                                                    <span onClick={() => setSelectedSubCat('dresses')}>Dresses</span>
                                                    <span onClick={() => setSelectedSubCat('swim')}>Swimwear</span>
                                                    <span onClick={() => setSelectedSubCat('bra')}>Sport bras</span>
                                                    <span onClick={() => setSelectedSubCat('robes')}>Robes</span>
                                                </ul>
                                                : props.match.params.category === 'kids-&-youth' ?
                                                    <ul className={styles.nav}>
                                                        <span onClick={() => setSelectedSubCat('t-shirt')}>Shirts</span>
                                                        <li onClick={() => setSelectedSubCat('t-shirt')}>T-shirts</li>
                                                        <li onClick={() => setSelectedSubCat('shirt')}>All-over shirts</li>
                                                        <li onClick={() => setSelectedSubCat('long')}>Long Sleeve shirts</li>

                                                        <span onClick={() => setSelectedSubCat('hoodie')}>Hoodies</span>
                                                        <span onClick={() => setSelectedSubCat('jacket')}>Jackets</span>
                                                        <span onClick={() => setSelectedSubCat('leggin')}>Leggings</span>
                                                        <span onClick={() => setSelectedSubCat('body')}>Baby bodysuits</span>
                                                        <span onClick={() => setSelectedSubCat('swim')}>Swimwear</span>

                                                    </ul>
                                                    : props.match.params.category === 'hats' ?
                                                        <ul className={styles.nav}>
                                                            <span onClick={() => setSelectedSubCat('dad')}>Dad hats / Baseball caps</span>
                                                            <span onClick={() => setSelectedSubCat('snap')}>Snapbacks</span>
                                                            <span onClick={() => setSelectedSubCat('trucker')}>Trucker hats</span>
                                                            <span onClick={() => setSelectedSubCat('panel')}>5-panel hats</span>
                                                            <span onClick={() => setSelectedSubCat('mesh')}>Mesh hats</span>
                                                            <span onClick={() => setSelectedSubCat('beanie')}>Beanies</span>
                                                            <span onClick={() => setSelectedSubCat('bucket')}>Bucket hats</span>
                                                            <span onClick={() => setSelectedSubCat('visor')}>Visors</span>
                                                        </ul>
                                                        : props.match.params.category === 'accessories' ?
                                                            <ul className={styles.nav}>
                                                                <span onClick={() => setSelectedSubCat('bag')}>Bags</span>
                                                                <span onClick={() => setSelectedSubCat('tote')}>Tote bags</span>
                                                                <span onClick={() => setSelectedSubCat('laptop')}>Laptop cases</span>
                                                                <span onClick={() => setSelectedSubCat('draw')}>Drawstring case</span>
                                                                <span onClick={() => setSelectedSubCat('fanny')}>Fanny packs</span>
                                                                <span onClick={() => setSelectedSubCat('back')}>Backpacks</span>
                                                                <span onClick={() => setSelectedSubCat('phone')}>Phone cases</span>
                                                                <li onClick={() => setSelectedSubCat('iPhone')}>iPhone cases</li>
                                                                <li onClick={() => setSelectedSubCat('samsung')}>Samsung cases</li>
                                                                <span onClick={() => setSelectedSubCat('braceletneckearri')}>Jewelry</span>
                                                                <li onClick={() => setSelectedSubCat('bracel')}>Bracelets</li>
                                                                <li onClick={() => setSelectedSubCat('neckl')}>Necklaces</li>
                                                                <span onClick={() => setSelectedSubCat('socks')}>Socks</span>
                                                                <span onClick={() => setSelectedSubCat('key')}>Keychains</span>
                                                                <span onClick={() => setSelectedSubCat('flip')}>Flip flops</span>
                                                                <span onClick={() => setSelectedSubCat('patches')}>Patches</span>
                                                                <span onClick={() => setSelectedSubCat('hair')}>Hair accessories</span>
                                                                <span onClick={() => setSelectedSubCat('facemask')}>Face masks</span>
                                                                <span onClick={() => setSelectedSubCat('facemask')}>Face masks</span>
                                                                <span onClick={() => setSelectedSubCat('footwearshoes')}>Footwear</span>
                                                                <li onClick={() => setSelectedSubCat('shoes')}>Shoes</li>
                                                                <span onClick={() => setSelectedSubCat('jew')}>Jewelry</span>
                                                                <li onClick={() => setSelectedSubCat('ear')}>Earrings</li>

                                                            </ul>
                                                            : props.match.params.category === 'home-&-living' ?
                                                                <ul className={styles.nav}>
                                                                    <span onClick={() => setSelectedSubCat('puzzle')}>Puzzles</span>
                                                                    <span onClick={() => setSelectedSubCat('wall art')}>Wall art</span>
                                                                    <li onClick={() => setSelectedSubCat('poster')}>Posters</li>
                                                                    <li onClick={() => setSelectedSubCat('framed pos')}>Framed poster</li>
                                                                    <li onClick={() => setSelectedSubCat('canvasprints')}>Canvas prints</li>
                                                                    <li onClick={() => setSelectedSubCat('flags')}>Flags new</li>
                                                                    <span onClick={() => setSelectedSubCat('drinkware')}>Drinkware</span>
                                                                    <li onClick={() => setSelectedSubCat('waterbottles')}>Water bottles</li>
                                                                    <li onClick={() => setSelectedSubCat('coffeemugs')}>Coffee mugs</li>
                                                                    <span onClick={() => setSelectedSubCat('stationery')}>Stationery</span>
                                                                    <li onClick={() => setSelectedSubCat('postcards')}>Postcards</li>
                                                                    <li onClick={() => setSelectedSubCat('notebooks')}>Notebooks</li>
                                                                    <li onClick={() => setSelectedSubCat('sticker')}>Stickers</li>
                                                                    <li onClick={() => setSelectedSubCat('mousepad')}>Mouse pads</li>
                                                                    <li onClick={() => setSelectedSubCat('greetingcards')}>Greeting cards</li>
                                                                    <span onClick={() => setSelectedSubCat('pillow')}>Pillow</span>
                                                                    <li onClick={() => setSelectedSubCat('throwpillows')}>Throw pillows</li>
                                                                    <li onClick={() => setSelectedSubCat('pillowcases')}>Pillow cases</li>
                                                                    <span onClick={() => setSelectedSubCat('blankets')}>Blankets</span>
                                                                    <span onClick={() => setSelectedSubCat('towels')}>Towels</span>
                                                                    <span onClick={() => setSelectedSubCat('aprons')}>Aprons</span>
                                                                    <span onClick={() => setSelectedSubCat('fabrics')}>Fabrics</span>
                                                                    <span onClick={() => setSelectedSubCat('beanbags')}>Bean bags</span>
                                                                    <span onClick={() => setSelectedSubCat('petproducts')}>Pet products</span>
                                                                </ul>
                                                                :
                                                                null

                                    }
                                </Col>
                                <Col sm={20}>
                                    <section className={'container ' + styles.images}>
                                        <Row gutter={[36, 36]}>
                                            {

                                                products.map((product, index) => {
                                                    return <>
                                                        {
                                                            selectedSubCat === 'all' ?
                                                                product.category === props.match.params.category ?
                                                                    <Col xs={12} sm={6} onClick={() => setSelectedProduct(product)} style={{
                                                                        display: !product.approved ? 'None' : null
                                                                    }}>
                                                                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                                                            <div className={styles.images_wrapper}>
                                                                                <img src={product.design} alt="" />
                                                                            </div>
                                                                            <span>{product.name}</span>
                                                                            <p>
                                                                                $ {product.price}
                                                                            </p>
                                                                        </div>
                                                                    </Col>
                                                                    :
                                                                    null
                                                                :
                                                                product.category === props.match.params.category && (product.sub_category.toLowerCase().includes(selectedSubCat.toLowerCase()) || product.name.toLowerCase().includes(selectedSubCat.toLowerCase())) ?
                                                                    <Col xs={12} sm={6} onClick={() => setSelectedProduct(product)} style={{
                                                                        display: !product.approved ? 'None' : null
                                                                    }}>
                                                                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                                                            <div className={styles.images_wrapper}>
                                                                                <img src={product.design} alt="" />
                                                                            </div>
                                                                            <span>{product.name}</span>
                                                                            <p>
                                                                                $ {product.price}
                                                                            </p>
                                                                        </div>
                                                                    </Col>
                                                                    :
                                                                    null

                                                        }
                                                    </>
                                                })
                                            }
                                        </Row>
                                    </section>
                                </Col>
                            </Row>
                        </section>
                        <br />
                        <br />
                    </>
            }

            {
                selectedProduct &&
                <ProductModal
                    product={selectedProduct}
                    setSelectedProduct={setSelectedProduct}
                />
            }
        </Layout >
    );
};

export default Category;