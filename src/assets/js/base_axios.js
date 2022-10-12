import instance from './post'
import { Message } from 'element-ui';
import router from '../../router'

instance.interceptors.request.use(
    config => {
        if (sessionStorage.token) { //判断token是否存在
            config.headers['token'] = sessionStorage.token
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

instance.interceptors.response.use(
    response => {
        if(response.data.code !== 200) {
            Message({type: 'error', message: response.data.msg || response.data.message || response.data.sqlMessage})
            return Promise.reject(response)
        }
        return response.data;
    },
    error => {
        if(!error.response) return Promise.reject(error);
        if (error.response.status === 403) {
            sessionStorage.clear()
            Message.error('登录过期，请退出重新登录')
            return router.replace('/Login');
        } else if (error.response.status === 502 || error.response.status === 400) {
            return Message.error('服务器响应失败，请联系管理员或稍后重试')
        } else {
            Message.error('服务器响应失败，请联系管理员或稍后重试')
            return Promise.reject(error);
        }
    }
);

export default instance
