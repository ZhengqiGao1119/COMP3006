import service from '../request/request'

export function findHome () {
  return service({
    url: '/home',
    method: 'get'
  })
}
