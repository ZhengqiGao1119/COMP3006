import service from "../utils/request"

export function GetPrices(fid) {
  return service({
    url: '/order/' + fid,
    method: 'get'
  })
}

export function FindAllOrder() {
  return service({
    url: '/order',
    method: 'get',
    params: {
      page: 1,
      limit: 10000
    }
  })
}

export function UpdateOrder(data) {
  return service({
    url: '/order',
    method: 'put',
    data: data
  })
}

export function CreateOrderException(data) {
  return service({
    url: '/oe',
    method: 'post',
    data: data
  })
}

export function HandleOrderException(data) {
  return service({
    url: '/oe',
    method: 'put',
    data: data
  })
}

export function ListOrderException() {
  return service({
    url: '/oe',
    method: 'get'
  })
}
