import request from "axios"
import config from "../config"
import {Notification} from 'element-ui'

// Create Axios Instance
const token = localStorage.getItem("token")

const service = request.create({
  baseURL: config.API_URL,
  // Connection timeout prevents sending (error)
  // timeout: 10000,
  // Headers can be set for access type, etc.
  headers: {'Authorization': token}
});

service.interceptors.request.use(
  config => {
    console.log(localStorage.getItem('token'), 'token');
    config.headers['Authorization'] = localStorage.getItem("token");
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Response Interceptor
service.interceptors.response.use(
  // Cancellation Token Limitation, Users can access certain pages without logging in.
  response => {
      const res = response.data;
        if (res.status === 'success') {
          if (res.msg !== null) {
          }
        } else {
          Notification.error({
            title: 'Error Tip: ' + res.code,
            message: res.msg,
            duration: 3000
          });
        }
    return res
  },
  error => {
      console.log('err' + error);
      return Promise.reject(error)
  }
);

export default service
