// import { Spin } from "antd";
// import SimpleLoader from "../SimpleLoader/SimpleLoader";
import styles from './Loader.module.scss';

const Loader = ({ height }) => {
    return (
        <div style={{ height: height || "10vh", width: "100%" }} className={"hv-center fc " + styles.loader}>

            <img src="/logo512.png" alt="loader" width="120px" />

            {/* <div style={{ marginTop: 10 }}>
                <Spin indicator={<SimpleLoader />} />
            </div> */}
        </div>
    );
};

export default Loader;
