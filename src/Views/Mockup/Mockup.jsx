
import styles from './Mockup.module.scss';
import { useEffect, useRef, useState, createRef } from 'react';
import axios from '../../config/axios';
import axiosV2 from 'axios';
import { Resizable } from 're-resizable';
import html2canvas from 'html2canvas';
import { useScreenshot } from 'use-react-screenshot'
import { SketchPicker } from 'react-color'
import EXIF from 'exif-js';
import ProductModal from '../../Components/ProductModal/ProductModal1';
import ProductModal2 from '../../Components/ProductModal/ProductModal2';

//importing components
import Layout from '../../Components/Layout/Layout';
import { Row, Col, Checkbox, Input, message, Tooltip, Modal, Alert, InputNumber, Select } from 'antd';
import Loader from '../../Components/Loader/Loader';
import { FaUpload, FaRegSmile, FaCheck } from 'react-icons/fa';
import { GiCheckMark } from 'react-icons/gi';
import { IoIosCloseCircle } from 'react-icons/io';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsArrowLeft } from 'react-icons/bs';

import DragResizeContainer from 'react-drag-resize';
import { getUniqueArr } from '../../utils';
import { MdConstruction } from 'react-icons/md';
import ResizableContent from "./component";
import ResizableRect from "react-resizable-rotatable-draggable";
import ResizableRectTouch from "react-resizable-rotatable-draggable-touch-v2";


const Mockup = (props) => {

    const tui = useRef(null);

    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({});
    const [variants, setVariants] = useState([]);
    const [image, setImage] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [agreed, setAgreed] = useState(false);

    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [selectedSize, setSelectedSize] = useState('');
    const [handler, setHandler] = useState('');
    const [xhr, setXhr] = useState(false);
    const [designImg, setDesignImg] = useState(null);

    const [gridShow, setGridShow] = useState(0);
    const [grid_size, setGridsize] = useState(7);
    const [array_grid, setArrayGrid] = useState([]);
    const [rotate_d, setRotate] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [viewDesignImg, setViewDesignImg] = useState(null);

    const [showBorder, setShowBorder] = useState(false);
    const [mockup, setMockup] = useState({});
    const [hidden, setHidden] = useState(true);
    const [mockupData, setMockupData] = useState({});
    const [eMockupData, setEMockupData] = useState(null);
    const [mockOptions, setMockOptions] = useState([]);
    const [eMockOptions, setEMockOptions] = useState([]);
    const [colorOptions, setColorOptions] = useState([]);
    const [addText, setAddText] = useState(false);
    const [text, setText] = useState('');
    const [fs, setFs] = useState(12);
    const [fColor, setFColor] = useState('#000');
    const [fWeight, setFWeight] = useState(600);
    const [showCAModal, setShowCAModal] = useState(false);
    const [cliparts, setCliparts] = useState([]);
    const [pType, setPType] = useState('dtg');
    const [overflow, setOverflow] = useState(false);
    const [curWidth, setCurWidth] = useState(0);
    const [curHeight, setCurHeight] = useState(0);
    var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
        '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
        '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
        '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
        '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
        '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
        '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
        '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
        '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
        '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

    const [optionList, setOptionList] = useState([]);
    const [showGuide, setShowGuide] = useState(false);

    const search = props.location.search; // could be '?foo=bar'
    const params = new URLSearchParams(search);
    const dImgRef = useRef(null);

    const ref = createRef(null)
    const [snap, takeScreenshot] = useScreenshot()
    const getImage = () => takeScreenshot(ref.current)
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [actualWidth, setActualWidth] = useState(0);
    const [actualHeight, setActualHeight] = useState(0);
    const [ca, setCa] = useState(false);

    const layout = [{ key: 'test', x: 0, y: 0, width: 200, height: 100, zIndex: 1 }]
    const canResizable = (isResize) => {
        return { top: isResize, right: isResize, bottom: isResize, left: isResize, topRight: isResize, bottomRight: isResize, bottomLeft: isResize, topLeft: isResize };
    };

    const [width, setWidth] = useState(80)
    const [height, setHeight] = useState(80)
    const [top, setTop] = useState(10)
    const [left, setLeft] = useState(10)
    const [rotateAngle, setRotateAngle] = useState(0)
  
    const contentStyle = {
      top,
      left,
      width,
      height,
      position: 'absolute',
      transform: `rotate(${rotateAngle}deg)`
    }

    const handleResize = ({ style: { top, left, width, height }, isShiftKey, type, event }) => {
      setWidth(Math.round(width))
      setHeight(actualHeight*Math.round(width)/actualWidth)
      setTop(Math.round(top))
      setLeft(Math.round(left))
    }

   const handleRotate = ({ rotateAngle, event }) => {
      setRotateAngle(rotateAngle)
   }

   const handleDrag = ({ deltaX, deltaY, event }) => {
      var x = left + deltaX;
      var y = top + deltaY;
      if( window.innerWidth <= 576){
	      var yy = ((mockup.print_area_height * 350) / mockup.template_height-height);
	      var xx = ((mockup.print_area_width * 350) / mockup.template_width-width);
      }else{
	      var yy = ((mockup.print_area_height * 650) / mockup.template_height-height);
	      var xx = ((mockup.print_area_width * 650) / mockup.template_width-width);
      }
     if ( x < 0 || y < 0 || x > xx || y> yy) {
        setOverflow(true);
      }else { 
	setOverflow(false); 
     }
     setLeft(left + deltaX);
     setTop(top + deltaY);
   }

    useEffect(() => {
        if (designImg) {
            document.querySelector("#designImg").addEventListener('load', function () {
                var image_width_actual = this.naturalWidth;
                var image_height_actual = this.naturalHeight;
                // console.log(image_width_actual, image_height_actual);
                setActualWidth(image_width_actual);
                setActualHeight(image_height_actual);
		setWidth(Math.round(this.width));
		setHeight(Math.round(this.height));
            });
        }
    }, [designImg]);

    useEffect(() => {
        variants.forEach(variant => {
            if (variant.size === selectedVariant.size) {
                // console.log(variant.color);
                setColorOptions(colorOptions => colorOptions.concat(variant));
            }
        })

    }, [selectedVariant]);

    useEffect(() => {
        setCurWidth((mockup.print_area_width * 590) / mockup.template_width);
        setCurHeight((mockup.print_area_height * 600) / mockup.template_height);
		
    }, [designImg, dImgRef])

    useEffect(() => {
        if (product.id) {
            axios.get('/public/categories').then(response => {
                setCategories(response.data);
                let index = response.data.findIndex(function (cat) {
                    return cat.product_id == product.id;
                });
                if (index >= 0) {
                    setCategory(response.data[index].category);
                } else {
                    console.log('not categorized');
                }
            });
        }
    }, [product])

    useEffect(() => {

        axios.get('/public/cliparts').then(response => {
            setCliparts(response.data);
        });

        axios.get(`/printful/products/${props.match.params.id}`).then(response => {
            setLoading(true);
            setProduct(response.data.result.product);
            if (params.get('image')) {
                setImage(`https://difusee-server-nhkn3.ondigitalocean.app/api/printful/images?url=${params.get('image')}`)
                // setLoading(false);
                // setSelectedVariant(params.get('variant'));
            } else {
                // console.log('else');
                // setImage(response.data.result.product.image)
                setLoading(false);
                window.location.href = `/mockup/${response.data.result.product.id}?image=${response.data.result.variants[0].image}&variant=${response.data.result.variants[0].id}`;
                // props.history.push(`/mockup/${response.data.result.product.id}?image=${response.data.result.variants[0].image}&variant=${response.data.result.variants[0].id}`)
            }
            setVariants(response.data.result.variants);

            let index = response.data.result.variants.findIndex(function (variant) {
                return variant.id == params.get('variant')
            });
            if (params.get('variant')) {

                setSelectedVariant(response.data.result.variants[index]);
                setSelectedSize(response.data.result.variants[index].size);

                axios.get(`/printful/mockup/${props.match.params.id}`).then(responseV3 => {
                    setMockupData(responseV3.data.result);
                    axios.get(`/printful/mockup/${props.match.params.id}?technique=embro`).then(responseV4 => {

                        //Emock
                        // console.log(responseV4.data.result.variant_mapping[0].templates[0].placement, ' This is what you are looking for');
                        if (responseV4.data.result.variant_mapping) {
                            if (responseV4.data?.result?.variant_mapping[0]?.templates[0]?.placement !== responseV3.data?.result?.variant_mapping[0]?.templates[0]?.placement) {
                                setEMockupData(responseV4.data.result);
                                for (let i = 0; i < responseV4.data.result.variant_mapping.length; i++) {
                                    // console.log(responseV3.data.result.variant_mapping[i])
                                    if (responseV4.data.result.variant_mapping[i].variant_id == params.get('variant')) {
                                        // console.log(responseV3.data.result.variant_mapping[i])
                                        setEMockOptions(responseV4.data.result.variant_mapping[i].templates);
                                    }
                                }
                            }
                        }


                        // console.log(responseV3.data.result);
                        for (let i = 0; i < responseV3.data.result.variant_mapping.length; i++) {
                            // console.log(responseV3.data.result.variant_mapping[i])
                            if (responseV3.data.result.variant_mapping[i].variant_id == params.get('variant')) {
                                console.log(responseV3.data.result.variant_mapping[i])
                                setMockOptions(responseV3.data.result.variant_mapping[i].templates);
                                for (let k = 0; k < responseV3.data.result.templates.length; k++) {
                                    if (responseV3.data.result.variant_mapping[i].templates[0].template_id == responseV3.data.result.templates[k].template_id) {
                                        console.log(responseV3.data.result.templates[k])
                                        // setImage(responseV3.data.result.templates[k].image_url)
                                        setImage(`https://difusee-server-nhkn3.ondigitalocean.app/api/printful/images?url=${responseV3.data.result.templates[k].image_url}`)
                                        setMockup(responseV3.data.result.templates[k])
                                        setLoading(false);
                                    }
                                }
                            }
                        }
                    });

                });
            }
            // console.log(response.data.result);

        });
    }, []);

    //defining changeMockup function
    const changeMockup = (templateID) => {
        for (let k = 0; k < mockupData.templates.length; k++) {
            if (templateID == mockupData.templates[k].template_id) {
	        setImage(`https://difusee-server-nhkn3.ondigitalocean.app/api/printful/images?url=${mockupData.templates[k].image_url}`)
                setMockup(mockupData.templates[k])
	        setLoading(false);
		setOptionList(optionList => optionList.concat(mockupData.templates[k].template_id))
		//setDesignImg(null);
            }
        }
    }
	

    const showgrid = () => {
	if(gridShow == 1){
		let temp = [];
		setArrayGrid(temp);
		setGridShow(0)
	}else{
		setGridShow(1)
	}

    }

    //defining changeMockup function
    const changeEMockup = (templateID) => {


        for (let k = 0; k < eMockupData.templates.length; k++) {
            // console.log(mockupData.templates[k])
            if (templateID == eMockupData.templates[k].template_id) {

                // console.log(mockupData.templates[k])
                // setImage(responseV3.data.result.templates[k].image_url)
                setImage(`https://difusee-server-nhkn3.ondigitalocean.app/api/printful/images?url=${eMockupData.templates[k].image_url}`)
                setMockup(eMockupData.templates[k])
                console.log(eMockupData.templates[k])
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        if (!loading) {
            // if (mockup.background_color == null) {
            //     document.getElementsByClassName('tui-image-editor-canvas-container')[0].style.background = '#fff';
            // } else {
            //     document.getElementsByClassName('tui-image-editor-canvas-container')[0].style.background = mockup.background_color;
            // }
        }
    }, [loading])

    useEffect(() => {
        if (variants.length > 0) {

            const filteredArr = variants.reduce((acc, current) => {
                const x = acc.find(item => item.size === current.size);
                if (!x) {
                    return acc.concat([current]);
                } else {
                    return acc;
                }
            }, []);

            setSizes(filteredArr);

            const filteredColorArr = variants.reduce((acc, current) => {
                const x = acc.find(item => item.color_code === current.color_code);
                if (!x) {
                    return acc.concat([current]);
                } else {
                    return acc;
                }
            }, []);

            setColors(filteredColorArr.filter(a => a.size !== selectedSize));
        }
    }, [variants, selectedSize]);


    //defining handleCheckout function
    const handleCheckout = () => {
        if (!handler) {
            message.error('Telegram/Twitter handler is required!');
        } else {
            setXhr(true);
            // console.log('setting hidden');
            setHidden(false);
            let dataUrl;

            setTimeout(() => {
                // console.log(document.getElementsByClassName('editorCap'))
                let elem = document.getElementsByClassName('editorCap');
                html2canvas(elem[0], {
                    allowTaint: true,
                    useCORS: true
                }).then(canvas => {
                    dataUrl = canvas.toDataURL()
                    console.log(dataUrl);



                    let payload = {
                        canvas: selectedVariant.image,
                        design: dataUrl,
                        size: selectedVariant.size,
                        color: selectedVariant.color_code,
                        price: parseFloat(selectedVariant.price).toFixed(2),
                        category: category,
                        sub_category: product.type_name,
                        handle: handler,
                        name: selectedVariant.name,
                        description: product.description,
                        product_id: product.id,
                        variant_id: selectedVariant.id
                    }

                    axiosV2.get(`http://api.unme.online/telegram/events?event_name=code_request&target=@${handler}`).then(rsp => {
                        console.log(rsp.status);
                    });

                    axios.post('/products', payload).then(response => {
                        console.log(response.data.links[1].href);
                        window.location.href = response.data.links[1].href;
                    });

                }

                )
            }, 1);
        }
    }

    function makeTitle(slug) {
        var words = slug.split('_');

        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            words[i] = word.charAt(0).toUpperCase() + word.slice(1);
        }

        return words.join(' ');
    }

    function getAdditional(name) {
        for (let i = 0; i < product.files.length; i++) {
            //console.log(product.files[i], name);
            if (product.files[i].id == name) {
                // console.log('matched')
                // console.log(product.files[i].title, name)
                return product.files[i].additional_price;
            }
            // if (product.files[i].title.toLowerCase().includes(name.toLowerCase())) {
            //     console.log('matched')
            //     console.log(product.files[i].title, name)
            // }
        }

        return 'incl';
    }

    useEffect(() => {
        console.log('exif')
        if (designImg) {
            var img2 = document.getElementById("designImg");
            EXIF.getData(img2, function () {
                var allMetaData = EXIF.getAllTags(this);
                console.log(allMetaData);
            });
        }
}, [designImg]);

    //defining getDpi function
    function getDpi() {
        // var image_width_actual = document.querySelector("#designImg").naturalWidth;
        // var image_height_actual = document.querySelector("#designImg").naturalHeight;
        // console.log(image_height_actual * image_height_actual);
    }



    //defining isOptionThere
    const isOptionThere = (id) => {

    }



    return (
        <Layout
            title={'Mockup - Unme'}
        >

            <section className={'container ' + styles.mockup}>
                {
                    loading ?
                        <Loader height={'80vh'} />
                        :
                        <Row gutter={[20, 20]}>
                            <Col sm={12} order={window.innerWidth <= 576 ? 2 : 1}>
                                <div className={styles.left}>
                                    <h1 onClick={() => {
                                        // image is already loaded
                                        if (document.querySelector("#designImg").complete) {
                                            var image_width_actual = document.querySelector("#designImg").naturalWidth;
                                            var image_height_actual = document.querySelector("#designImg").naturalHeight;
                                            console.log(image_width_actual, image_height_actual)
                                        }
                                        else {
                                            document.querySelector("#img-element").addEventListener('load', function () {
                                                var image_width_actual = this.naturalWidth;
                                                var image_height_actual = this.naturalHeight;

                                                var image_width_rendered = this.width;
                                                var image_height_rendered = this.height;
                                            });
                                        }

                                    }}>{product.title} {category}</h1>
                                    {/* <p>{product.description}</p> */}
                                    
                                    <br />

                                    <div className={styles.print_type1}>
                                        <span>   Design  </span>
                                        <a><span onClick={() => setSelectedProduct(product)}>   <u> Product info & guidelines </u>  </span></a>
                                    </div>
                                    
                                    {
                                        addText ?
                                            <div>
                                                <div>
                                                    <BsArrowLeft style={{ marginBottom: '.5rem', cursor: 'pointer' }} size={20} onClick={() => setAddText(false)} />
                                                    <textarea
                                                        onChange={e => setText(e.target.value)}
                                                        style={{ width: '100%', color: 'var(--color-primary)' }}
                                                        cols="30"
                                                        rows="2"
                                                        placeholder='Enter your text here'
                                                        className={styles.ta}
                                                    >
                                                    </textarea>
                                                </div>
                                                <div style={{ display: 'flex' }}>
                                                    <div style={{ display: 'flex', flexDirection: 'column', marginRight: '1rem', width: '30%' }}>
                                                        <span style={{ marginBottom: '.5rem', color: 'grey' }}>Font Size</span>
                                                        <InputNumber min={1} max={100} defaultValue={12} onChange={value => setFs(value)} />
                                                    </div>

                                                    <div style={{ display: 'flex', flexDirection: 'column', marginRight: '1rem' }}>
                                                        <span style={{ marginBottom: '.5rem', color: 'grey' }}>Font Weight</span>
                                                        <Select
                                                            onChange={value => setFWeight(value)}
                                                            style={{ height: 'fit-content' }}
                                                            value={fWeight}
                                                        >
                                                            <Select.Option value={400}>400</Select.Option>
                                                            <Select.Option value={500}>500</Select.Option>
                                                            <Select.Option value={600}>600</Select.Option>
                                                            <Select.Option value={700}>700</Select.Option>
                                                            <Select.Option value={800}>800</Select.Option>
                                                        </Select>
                                                    </div>

                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', marginRight: '1rem', width: '100%' }}>
                                                    <span style={{ marginBottom: '.5rem', color: 'grey' }}>Font Color</span>
                                                    {/* <SketchPicker
                                                        color={fColor}
                                                        onChange={(color) => setFColor(color.hex)}
                                                    /> */}
                                                    <div className={styles.colorssss}>
                                                        {
                                                            colorArray.map((color, index) => {
                                                                return <div
                                                                    style={{ backgroundColor: color }}
                                                                    onClick={() => { setFColor(color); console.log(color) }}
                                                                >
                                                                </div>
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div className={styles.action}>
                                                <label onClick={() => { setCa(false); setOptionList(optionList => optionList.concat(mockup.template_id)) }} htmlFor="overlayUp" className={styles.action_button}>
                                                    <FaUpload size={20} />
                                                    <span>Choose file</span>
                                                    {/* <p>User your own design</p> */}
                                                </label>
                                                <label onClick={() => { setShowCAModal(true); setCa(true); setOptionList(optionList => optionList.concat(mockup.template_id)) }} className={styles.action_button}>
                                                    <FaRegSmile size={20} />
                                                    <span>Add clipart</span>
                                                    {/* <p>Use your clipart for design</p> */}
                                                </label>
                                                <label onClick={() => { setAddText(true); setOptionList(optionList => optionList.concat(mockup.template_id)) }} className={styles.action_button}>
                                                    <AiOutlineEdit size={20} />
                                                    <span>Add text</span>
                                                    {/* <p>Create a text-based design</p> */}
                                                </label>
                                            </div>
                                    }
                                    <br />
                                    <br />
                                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', flexDirection: 'column' }}>
                                        <div style={{ marginBottom: '1rem', marginRight: '1rem', color: 'grey', fontWeight: 500 }}>
                                            <span>Size</span>
                                        </div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                            {
                                                getUniqueArr(variants, 'size').map((variant, index) => {
                                                    return <span
                                                        key={index}
                                                        className={styles.size}
                                                        style={{
                                                            backgroundColor: selectedVariant.size === variant.size ? 'grey' : null,
                                                            color: selectedVariant.size === variant.size ? 'white' : null,
                                                            width: 'fit-content',
                                                            padding: '.5rem'
                                                        }}
                                                        onClick={() => {
                                                            window.location.href = `/mockup/${product.id}?image=${variant.image}&variant=${variant.id}`;
                                                        }}
                                                    >
                                                        {variant.size}
                                                    </span>
                                                })
                                            }
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', flexDirection: 'column' }}>
                                        <div style={{ marginBottom: '1rem', marginRight: '1rem', color: 'grey', fontWeight: 500 }}>
                                            <span>Color</span>
                                        </div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                            {
                                                colorOptions.map((variant, index) => {
                                                    return <Tooltip key={index} title={variant.color}>
                                                        <span
                                                            key={index}
                                                            className={styles.size}
                                                            style={{
                                                                backgroundColor: variant.color_code,
                                                                // border: 'none'
                                                                // color: selectedVariant.size === variant.size ? 'white' : null
                                                            }}
                                                            onClick={() => {
                                                                window.location.href = `/mockup/${product.id}?image=${variant.image}&variant=${variant.id}`;
                                                            }}
                                                        >
                                                            {
                                                                selectedVariant.color_code === variant.color_code &&
                                                                <FaCheck size={20} color='beige' />
                                                            }
                                                        </span>
                                                    </Tooltip>
                                                })
                                            }
                                        </div>
                                    </div>


                                    {/* <h1 style={{ marginTop: '1rem' }}>Variants</h1>
                                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                        {
                                            variants.map((variant, index) => {
                                                return <div className={styles.var}>
                                                    <span
                                                        key={index}
                                                        className={styles.color}
                                                        style={{ backgroundColor: variant.color_code }}
                                                        onClick={() => {
                                                            window.location.href = `/mockup/${product.id}?image=${variant.image}&variant=${variant.id}`;
                                                        }}
                                                    >
                                                        {
                                                            params.get('variant') == variant.id &&
                                                            <GiCheckMark color='grey' />
                                                        }
                                                    </span>
                                                    <p>{variant.size}</p>
                                                </div>
                                            })
                                        }
                                    </div> */}

                                    {/* <div className={styles.choice}>
                                        <h1>Variants</h1>
                                        <div style={{ marginTop: '.5rem', display: 'flex', flexWrap: 'wrap' }}>
                                            {
                                                variants.map((variant, index) => {
                                                    return <button
                                                        key={index}
                                                        style={{
                                                            // backgroundColor: variant.color_code,
                                                            border: variant.id == params.get('variant') ? `2px solid var(--color-blue)` : null
                                                        }}
                                                        onClick={() => {
                                                            setImage(variant.image);
                                                            console.log(variant.image);
                                                            window.location.href = `/mockup/${product.id}?image=${variant.image}&variant=${variant.id}`;
                                                        }}
                                                    >
                                                        <span>{variant.size}</span>
                                                        <p style={{ backgroundColor: variant.color_code }}></p>
                                                    </button>
                                                })
                                            }
                                        </div>
                                    </div> */}

                                    {/* <label htmlFor="" style={{ marginBottom: '.5rem', display: 'block' }}>
                                        To earn 30% from every sale, please write your social media @handle below. Send $1.00 via Paypal/Debit/Credit Card to gain access to moderation. When your design is approved, It will be posted on Difusee
                                        website
                                    </label> */}
                                    <Input placeholder='Your Telegram/Twitter Handler' style={{ border: '1px solid grey' }} onChange={e => setHandler(e.target.value)} />

                                    <Checkbox style={{ marginTop: '1rem' }} onChange={() => { setAgreed(agreed ? false : true); setShowBorder(false); setHidden(false) }}>
                                        I understand and accept the <a onClick={() => setShowGuide(true)} style={{ color: 'var(--color-blue)' }}>content guidelines</a>
                                    </Checkbox>

                                    <div className={styles.bbox}>
                                        <button onClick={() => props.history.push('/')}>Cancel</button>
                                        <button
                                            style={{ backgroundColor: agreed ? 'transparent' : 'var(--color-primary)', color: !agreed ? 'var(--color-light)' : null }}
                                            onClick={handleCheckout}
                                            disabled={!agreed || xhr}
                                        >
                                            {
                                                xhr ?
                                                    'Loading'
                                                    :
                                                    'Activate Contract'
                                            }
                                        </button>
                                    </div>

                                </div>
                            </Col>
			    
					
                            <Col sm={12} order={window.innerWidth <= 576 ? 1 : 2} ref={ref}>
			    	<div className={styles.print_type1}>
                        <span>   Choose technique  </span>
                        <a href="https://www.printful.com" target="_blank"><span>  <u>File guidelines</u>  </span></a>
			<a><span onClick={() => {setViewDesignImg(designImg)}}>  <u>desing view and mock up view </u>  </span></a>
				    </div>
                                {
                                    eMockupData &&
                                    <div className={styles.print_type}>
                                        <span>Print Type</span>
                                        <button style={{
                                            border: pType === 'dtg' ? '2px solid var(--color-blue)' : null
                                        }} onClick={() => setPType('dtg')}>DTG Printing</button>
                                        <button style={{
                                            border: pType === 'Embroidery' ? '2px solid var(--color-blue)' : null
                                        }} onClick={() => setPType('Embroidery')}>Embroidery</button>
                                    </div>
                                }
                                {
                                    pType === 'dtg' ?
                                        <div className={styles.options}>
                                            {
                                                mockOptions.map((option, index) => {
                                                    return <span
                                                        onClick={() => {
							console.log("aaaaaaaaaaaaaaaa");
							console.log(optionList);
							console.log("aaaaaaaaaaaaaaaa");
							console.log(option);
                                                            changeMockup(option.template_id);
                                                            if (addText) {
                                                                setOptionList(optionList => optionList.concat(option.template_id))
                                                            }
                                                        }}
                                                        style={{
                                                            display: option.placement.includes('label') ? 'none' : null,
                                                            borderBottom: option.template_id == mockup.template_id ? '2px solid var(--color-primary)' : null,
                                                            width: 'fit-content',
                                                            textAlign: 'center',
                                                            marginRight: '3rem',
                                                            paddingBottom: '.2rem'
                                                        }}
                                                    >
                                                        {makeTitle(option.placement)}
                                                        <br />
                                                        {
                                                            getAdditional(option.placement)&& optionList.includes(option.template_id) ?
                                                                <span style={{ fontSize: '.6rem', color: 'grey', display: option.placement.includes('embroidery') ? 'none' : null }}>

                                                                    {
                                                                        getAdditional(option.placement) == 'incl' ?
                                                                            'incl.'
                                                                            :
                                                                            <>
                                                                                +${getAdditional(option.placement)}
                                                                            </>
                                                                    }

                                                                </span>
                                                                :
                                                                null
                                                            // <span style={{ fontSize: '.6rem', color: 'grey' }}>
                                                            //     incl.
                                                            // </span>
                                                        }
                                                    </span>
                                                })
                                            }

                                        </div>
                                        :
                                        <div className={styles.options}>
                                            {
                                                eMockOptions.map((option, index) => {
                                                    return <span
                                                        onClick={() => changeEMockup(option.template_id)}
                                                        style={{
                                                            display: option.placement.includes('label') ? 'none' : null,
                                                            borderBottom: option.template_id == mockup.template_id ? '2px solid var(--color-primary)' : null,
                                                            width: 'fit-content',
                                                            textAlign: 'center',
                                                            marginRight: '3rem',
                                                            paddingBottom: '.2rem'
                                                        }}
                                                    >
                                                        {makeTitle(option.placement)}
                                                    </span>
                                                })
                                            }

                                        </div>
                                }

                                {/* <span style={{ display: 'block', marginBottom: '.5rem', color: 'grey', fontWeight: 400, fontSize: '.8rem' }}>**Please keep your design inside the print area. Otherwise it'll be rejected.</span> */}
                                {
                                    (overflow && !text) &&
                                    <Alert
                                        message="Warning"
                                        description="Part of your design is outside print area!"
                                        type="warning"
                                        showIcon
                                        closable
                                        style={{ marginBottom: '1rem' }}
                                    />

                                }

                                {
                                    (parseInt((actualHeight * actualWidth) / (curHeight / 2 * curWidth / 2) + 0) < 120 && !ca && designImg) &&
                                    <Alert
                                        message="Warning"
                                        description={`DPI: ${parseInt((actualHeight * actualWidth) / (curHeight / 2 * curWidth / 2) + 0)} - If you want even better print quality, please upload a larger image
                                        ` }
                                        type="warning"
                                        showIcon
                                        closable
                                        style={{ marginBottom: '1rem' }}
                                    />
                                }

                                <div
                                    // style={{ backgroundImage: `url(${image})`, backgroundColor: mockup.background_color }}
                                    style={{ backgroundColor: mockup.background_color }}
                                    className={styles.editor + " " + 'editorCap'}
                                    // className={styles.editor}
                                    onMouseEnter={() => {
                                        setShowBorder(true); setHidden(true);
                                        setCurHeight(document.getElementById('designImg').clientHeight)
                                    }}
                                    onMouseLeave={() => {
                                        setShowBorder(false); setHidden(false)
                                    }}
                                    onTouchStart={() => { setShowBorder(true); setHidden(true) }}
                                    onTouchEnd={() => {
                                        setTimeout(() => {
                                            setShowBorder(false); setHidden(false)
                                        }, 300000)
                                    }}
                                    id="editorCap"
                                >
				<div    className={styles.guide}
					style={window.innerWidth <= 576?
					{
						border: 0,
						zIndex: 2,
						width: '75px',
						height: '100px',
						top:  '0px',
						left: 250 + 'px',
					 }
					 :
					 {
						border: 0,
						zIndex: 2,
						width: '75px',
						height: '100px',
						top:  0 + 'px',
						left: 510 + 'px',
					 }
					 }
					>
				<img src={gridShow ? "/grid2.png" : "/grid1.png"}  style={{ width: '74px', height:'75px' }}  alt="" onClick={() => {
					if(gridShow == 0){
							setGridShow(1);
						}else{
							setGridShow(0);
						}
						showgrid();}}/ >
					</div>
				<img src={image} alt="" style={{ width: '100%', height: '100%' }} className={styles.the_image} />

					{
						window.innerWidth <= 576 ?
					    
						<div
						    className={designImg  ? 'None' : styles.guide}
						    style={{
							zIndex: 2,
							display: designImg  ? 'None' : null,
							width: (mockup.print_area_width * 350) / mockup.template_width + 'px',
							height: (mockup.print_area_height * 350) / mockup.template_height + 'px',
							top: ((mockup.print_area_top * 350) / mockup.template_height) + 0 + 'px',
							left: (mockup.print_area_left * 350) / mockup.template_width + 0 + 'px',
						    }}
						>
						
						    <div className={styles.pa}>Print Area</div>
						</div>
						:
						<div    
						    className={designImg ? 'null' : styles.guide}
						    style={{
							zIndex: 2,
							display: designImg ? 'None' : null,
							width: (mockup.print_area_width * 650) / mockup.template_width + 'px',
							height: (mockup.print_area_height * 650) / mockup.template_height + 'px',
							top: ((mockup.print_area_top * 650) / mockup.template_height) + 0 + 'px',
							left: (mockup.print_area_left * 650) / mockup.template_width + 0 + 'px',
						    }}
						>
						
						    <div className={styles.pa}>Print Area</div>
						</div>
					}
                                    {
                                        designImg || addText ?
                                            <>
                                                {
                                                    window.innerWidth <= 576 ?
						    
                                                        <div
                                                            className={gridShow ? 'None' : styles.guide}
                                                            style={{
                                                                zIndex: 2,
                                                                display: gridShow ? 'None' : null,
                                                                width: (mockup.print_area_width * 350) / mockup.template_width + 'px',
                                                                height: (mockup.print_area_height * 350) / mockup.template_height + 'px',
                                                                top: ((mockup.print_area_top * 350) / mockup.template_height) + 0 + 'px',
                                                                left: (mockup.print_area_left * 350) / mockup.template_width + 0 + 'px',
                                                            }}
                                                        >
							
                                                            <div className={styles.pa}>Print Area</div>
                                                            <div className={styles.the_close_button}>
                                                                <IoIosCloseCircle size={20} color={'red'} onClick={() => { setDesignImg(null); setText(''); setAddText(false); setOptionList(optionList.filter(list => list !== mockup.template_id)) }} />
                                                            </div>
                                                        </div>
                                                        :
                                                        <div    
                                                            className={gridShow ? 'null' : styles.guide}
                                                            style={{
                                                                zIndex: 2,
                                                                display: gridShow ? 'None' : null,
                                                                width: (mockup.print_area_width * 650) / mockup.template_width + 'px',
                                                                height: (mockup.print_area_height * 650) / mockup.template_height + 'px',
                                                                top: ((mockup.print_area_top * 650) / mockup.template_height) + 0 + 'px',
                                                                left: (mockup.print_area_left * 650) / mockup.template_width + 0 + 'px',
                                                            }}
                                                        >
							
                                                            <div className={styles.pa}>Print Area</div>
                                                            <div className={styles.the_close_button}>
                                                                <IoIosCloseCircle size={20} color={'red'} onClick={() => { setDesignImg(null); setText(''); setAddText(false); setOptionList(optionList.filter(list => list !== mockup.template_id)) }} />
                                                            </div>
                                                        </div>
                                                }
						
                                                <div
                                                    className={styles.edit_con}
                                                    style={
                                                        window.innerWidth <= 576 ?
                                                            {
                                                                overflow: hidden ? 'hidden' : null,
                                                                // display: !showBorder ? 'None' : null,
                                                                zIndex: 10,
                                                                width: (mockup.print_area_width * 350) / mockup.template_width + 'px',
                                                                height: (mockup.print_area_height * 350) / mockup.template_height + 'px',
                                                                top: ((mockup.print_area_top * 350) / mockup.template_height) + 0 + 'px',
                                                                left: (mockup.print_area_left * 350) / mockup.template_width + 0 + 'px',
                                                            }
                                                            :
                                                            {
                                                                overflow: hidden ? 'hidden' : null,
                                                                // display: !showBorder ? 'None' : null,
                                                                zIndex: 10,
                                                                width: (mockup.print_area_width * 650) / mockup.template_width + 'px',
                                                                height: (mockup.print_area_height * 650) / mockup.template_height + 'px',
                                                                top: ((mockup.print_area_top * 650) / mockup.template_height) + 0 + 'px',
                                                                left: (mockup.print_area_left * 650) / mockup.template_width + 0 + 'px',
                                                            }

                                                    }
                                                >
						<table border={gridShow ? '0' : '1'}  style={
                                                        window.innerWidth > 576 ?{ width: (mockup.print_area_width * 650) / mockup.template_width + 'px',
                                                                height: (mockup.print_area_height * 650) / mockup.template_height + 'px',}
								:
								{ width: (mockup.print_area_width * 350) / mockup.template_width + 'px',
                                                                height: (mockup.print_area_height * 350) / mockup.template_height + 'px',}
							    }>
						<tr><td></td><td></td></tr>
						<tr><td></td><td></td></tr>
						</table>
						    <div style={contentStyle} id="edit_area">
                                                        <img
                                                            style={{
                                                                width: '100%',
                                                            }}
                                                            alt=""
                                                            src={designImg}
                                                            id="designImg"
                                                            ref={dImgRef}
                                                        />
                                                        {
                                                            text &&
                                                            <span style={{
                                                                fontSize: `${fs}px`,
                                                                padding: '0rem',
                                                                display: 'block',
                                                                color: fColor,
                                                                fontWeight: fWeight,
                                                                textAlign: 'center'
                                                            }}>
                                                                {text}
                                                            </span>
                                                        }
							                    </div>
						                <div style={{display: gridShow? 'None': null}}>
						     
                                        <ResizableRectTouch
                                            top={top}
                                            rotatable={true}
                                            left={left}
                                            minWidth={10}
                                            width={width}
                                            minHeight={10}
                                            height={height}
                                            onDrag={handleDrag}
                                            onRotate={handleRotate}
                                            onResize={handleResize}
                                            zoomable="n, w, s, e, nw, ne, se, sw"
                                            rotateAngle={rotateAngle}
                                        />
                                        </div>
                                                </div>
                                            </>
                                            :

                                            <div className={styles.upload}>
                                                {/* <label htmlFor="overlayUp">
                                                    UPLOAD DESIGN
                                                </label> */}
                                                <input style={{ display: 'none' }} id='overlayUp' type="file" accept='image/*' onChange={async e => {
                                                    console.log(e.target.files[0])
                                                    // const base64 = await this.convertBase64(e.target.files[0])
                                                    setDesignImg(URL.createObjectURL(e.target.files[0]));
                                                }} />
                                            </div>
                                    }
                                </div>

                            </Col>
                        </Row>
                }

                <Modal
                    visible={showCAModal}
                    footer={null}
                    centered={true}
                    width={
                        window.innerWidth <= 576 ? '90vw' : '50vw'
                    }
                    // height={'80vh'}
                    onCancel={() => setShowCAModal(false)}
                >
                    <div>
                        <span style={{ display: 'block', fontWeight: '500', color: 'grey', fontSize: '1.2rem', marginBottom: '1rem' }}>Select Clipart</span>
                        <Row gutter={[20, 20]}>
                            {
                                cliparts.map((art, index) => {
                                    return <Col xs={12} sm={4} key={index} className={styles.cart_wrapper}>
                                        <img
                                            onClick={() => { setDesignImg(art.clipart); setShowCAModal(false) }}
                                            className={styles.cart}
                                            src={art.clipart}
                                            alt=""
                                        />
                                    </Col>
                                })
                            }
                        </Row>
                    </div>
                </Modal>

                <Modal
                    centered={true}
                    visible={showGuide}
                    footer={null}
                    onCancel={() => setShowGuide(false)}
                >
                    <div style={{ marginTop: '1rem' }}>
                        <span style={{ fontSize: '1.2rem' }}>
                            By uploading or saving a design you agree that:
                        </span>
                        <ul style={{ marginTop: '2rem' }}>
                            <li> All content complies with our acceptable Content Guidelines.</li>
                            <li>You hold full rights to commercially reproduce this content.</li>
                            <li> Your content does not express hate towards any person or group.</li>
                            <li>Your content does not promote illegal activities.</li>
                            <li>You understand that we act under your instructions and are not obligated in any way to check or confirm the legal use of reproducing any content.</li>
                            <li>You indemnify and defend Unme for any claims made as a result of alleged infringements.</li>
                        </ul>
                    </div>
                </Modal>
            </section>
             {
                selectedProduct &&
                <ProductModal
                    product={selectedProduct}
                    setSelectedProduct={setSelectedProduct}
                />
            }
	     {
                viewDesignImg &&
                <ProductModal2
                    product={viewDesignImg}
                    setViewDesignImg={setViewDesignImg}
                />
            }
        </Layout >
    );
};

export default Mockup;



