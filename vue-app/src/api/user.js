import service from "@/utils/request";

export function Login(data) {
  return service({
    url: '/user/login',
    method: 'post',
    data: data
  })
}

export function Register(data){
  return service({
    url: '/user/register',
    method: 'post',
    data: data
  })
}

export function findById(id) {
  return service({
    url: '/user',
    method: 'get',
    params: {
      id
    }
  })
}

export function uploadAvatar(data) {
  return service({
    url: "/upload",
    method: 'post',
    data: data,
  })
}

export function updateUser(data) {
  return service({
    url: '/user/'+data.id,
    method: 'put',
    data: data
  })
}

