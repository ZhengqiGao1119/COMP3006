import service from "@/utils/request";

export function ListDailyWork () {
    return service({
      url: "/daily",
      method: "get"
    })
}

export function FindWorkerById(id) {
  return service({
    url: "/worker/" + id,
    method: "get"
  })
}

export function ListSystemRoles() {
  return service({
    url: "/role/system",
    method: "get"
  })
}

export function FindAllWorker() {
  return service({
    url: "/worker",
    method: "get"
  })
}

export function CreateWorker(data) {
  return service({
    url: '/worker',
    method: "post",
    data: data
  })
}

export function DeleteWorker(id) {
  return service({
    url: "/worker/" + id,
    method: "delete"
  })
}

export function CreateWorkerRole(data) {
  return service({
    url: "/role",
    method: "post",
    data: data
  })
}

export function UpdateWorker(data) {
  return service({
    url: "/worker",
    method: "put",
    data: data
  })
}

export function FindWorkerRoles(id) {
  return service({
    url: "/role?wid=" + id,
    method: "get"
  })
}

export function DeleteRoleByWorkerId(id) {
  return service({
    url: "/role/" + id,
    method: "delete"
  })
}


export function AddDailyWork(data) {
  return service({
    url: "/daily",
    method: "post",
    data: data
  })
}

export function DeleteDailyWork(id) {
  return service({
    url: "/daily/" + id,
    method: "delete"
  })
}
