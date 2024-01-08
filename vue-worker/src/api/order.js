import service from '../request/request'

export function FindAllOrder() {
  return service({
    url: '/order',
    method: 'get',
    params: {
      page: 1,
      limit: 1000000
    }
  })
}
