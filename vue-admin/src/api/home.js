import service from "../utils/request"

export function findHome () {
  return service({
    url: '/home',
    method: 'get'
  })
}
