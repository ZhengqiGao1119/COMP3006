import service from '../request/request'

export function FindWorkerById(id) {
  return service({
    url: "/worker/" + id,
    method: "get"
  })
}

export function ListDailyWork () {
  return service({
    url: "/daily",
    method: "get"
  })
}

export function UpdateWorker(data) {
  return service({
    url: "/worker",
    method: "put",
    data: data
  })
}
