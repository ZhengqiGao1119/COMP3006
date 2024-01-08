import service from "@/utils/request";

export function CreateLeavingMessage(data) {
  return service({
    url: '/lm',
    method: 'post',
    data: data
  })
}

export function ListAllLeavingMessage() {
  return service({
    url: '/lm',
    method: 'get',
    params: {
      page: 1,
      limit: 10000000
    }
  })
}

export function ListAllWorker() {
  return service({
    url: '/worker',
    method: 'get'
  })
}

export function CreateEvaluate(data) {
  return service({
    url: '/we',
    method: 'post',
    data: data
  })
}

export function ListWorkerEvaluate(wid) {
  return service({
    url: '/we?wid=' + wid,
    method: 'get'
  })
}

