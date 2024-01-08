import service from '../request/request'

export function Login(data) {
  return service({
    url: '/worker/login',
    method: 'post',
    data: data
  })
}
