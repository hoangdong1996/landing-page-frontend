import axios from 'axios';

export default () => {
    return axios.create({
        baseUrl: '192.168.1.122:8081',
        withCredentials: false,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    });
}

// export default service
