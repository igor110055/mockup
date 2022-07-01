import axios from 'axios';


let baseUrl;

// baseUrl = "http://localhost:8000/api";
baseUrl = "https://difusee-server-nhkn3.ondigitalocean.app/api";


//creating an axios instance with auth setup
const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 40000,
});

axiosInstance.interceptors.request.use((config) => {
    // if (config.withCredentials) {
    //     config.headers["Authorization"] = 'Token ' + localStorage.getItem('device_id');
    // }

    return config;
});


//defining the interceptor which will automate the process of refresh and access token
axiosInstance.interceptors.response.use(function (response) {
    // Simply returning the response
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default axiosInstance;
