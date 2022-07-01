import styles from './Clipart.module.scss';
import React, { useEffect, useState } from 'react';
import { Button, Image } from 'antd';
import axios from '../../config/axios';
import FileBase64 from 'react-file-base64';

const Clipart = () => {

    const [clipart, setClipart] = useState('');
    const [cliparts, setCliparts] = useState([]);
    const [refresh, setRefresh] = useState(null);

    useEffect(() => {
        axios.get('/public/cliparts').then(response => {
            // console.log(response.data);
            setCliparts(response.data);
        });
    }, [refresh]);

    //defining clipArtOnChange function
    const clipArtOnChange = (file) => {
        console.log(file);
        setClipart(file.base64);
    }

    //upload clipart
    const uploadClipart = () => {
        axios.post('/cliparts', { clipart: clipart }).then(response => {
            console.log('Clipart uploaded successfully!');
            setRefresh(Math.random());
        });
    }

    return (
        <div>
            <div style={{ marginTop: '2rem' }}>
                <FileBase64
                    multiple={false}
                    onDone={clipArtOnChange} />

                <Button onClick={uploadClipart} type='primary'>Upload Clipart</Button>
            </div>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Clipart</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cliparts.map((art, index) => {
                            return <tr key={index}>
                                <td>{art.id}</td>
                                <td>
                                    <Image
                                        src={art.clipart}
                                        width={150}
                                    />
                                </td>
                                <td>
                                    <Button
                                        type='warning'
                                        onClick={
                                            () => axios.delete(`/cliparts/${art.id}`).then(response => {
                                                setRefresh(Math.random());
                                            })
                                        }
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Clipart;