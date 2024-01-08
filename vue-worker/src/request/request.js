import request from "axios"
import config from "../config"
import router from '../router'
import {Notification} from 'element-ui'

const token = localStorage.getItem("token")

const service = request.create({
  baseURL: config.API_URL,
  timeout: 50000,
  headers: {'Authorization': token}
});

service.interceptors.response.use(
  response => {
      const res = response.data;

    if (res.code === 403) {
        setTimeout( () => {
          router.push("/403")
        },0)
      response.data = null
    } else {
        if (res.success === true) {
          if (res.msg !== null) {
          }
        } else {
          Notification.error({
            title: 'error message: ',
            message: res.message,
            duration: 3000
          });
        }
    }
    return res
  },
  error => {
      console.log('err' + error);
      return Promise.reject(error)
  }
);

export default service
