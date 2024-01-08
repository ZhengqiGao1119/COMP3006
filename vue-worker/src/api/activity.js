import service from '../request/request'

export function ListAllActivity() {
  return service({
    url: '/activity',
    method: 'get'
  })
}

export function CreateActivity(data) {
  return service({
    url: '/activity',
    method: 'post',
    data: data
  })
}

export function UpdateActivity(data) {
  return service({
    url: '/activity',
    method: 'put',
    data: data
  })
}

export function findActivityById(id) {
  return service({
    url: '/activity/' + id,
    method: 'get'
  })
}

export function DeleteActivityById(id) {
  return service({
    url: '/activity/' + id,
    method: 'delete'
  })
}
