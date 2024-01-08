import service from '../request/request'

export function ListAllLeavingMessage() {
  return service({
    url: '/lm',
    method: 'get'
  })
}

export function ListActiveUser() {
  return service({
    url: '/lm/active',
    method: 'get'
  })
}

export function ReplyLeavingMessage(data) {
  return service({
    url: '/lm',
    method: 'put',
    data: data
  })
}

export function DeleteLMById (id) {
  return service({
    url: '/lm/' + id,
    method: 'delete'
  })
}

export function ListWorkerEvaluate(wid) {
  return service({
    url: '/we?wid=' + wid,
    method: 'get'
  })
}
