import service from "../utils/request"

export function ListAllFilm () {
    return service({
        url: '/film',
        method: 'get'
    })
}

export function DeleteById (id) {
    return service({
      url: '/film/' + id,
      method: 'delete'
    })
}

export function UpdateFilm (data) {
    return service({
      url: '/film',
      method: 'put',
      data: data
    })
}

export function AddFilm(data){
  return service({
    url: '/film',
    method: 'post',
    data: data
  })
}

export function findFilmById (id) {
  return service({
    url: '/film/' + id,
    method: 'get',
  })
}

export function AddArrangement(data){
  return service({
    url: '/arrangement',
    method: 'post',
    data: data
  })
}

export function UpdateArrangement(data){
  return service({
    url: '/arrangement',
    method: 'put',
    data: data
  })
}

export function UpdateArrangementByPrice(fid, price){
  return service({
    url: '/arrangement/price?fid=' +fid +'&price=' +price,
    method: 'post',
  })
}
export function FindAllArrangement(){
  return service({
    url: '/arrangement',
    method: 'get'
  })
}

export function FindArrangementById(id){
  return service({
    url: '/arrangement/' + id,
    method: 'get'
  })
}

export function DeleteArrangement(id){
  return service({
    url: '/arrangement/' + id,
    method: 'delete'
  })
}

export function ListAllPoster(){
  return service({
    url: "/poster",
    method: "get"
  })
}

export function AddPoster(data){
  return service({
    url: '/poster',
    method: 'post',
    data: data
  })
}

export function UpdatePoster(data){
  return service({
    url: "/poster",
    method: "put",
    data: data
  })
}

export function DeletePosterById(id){
  return service({
    url: "/poster/" + id,
    method: "delete"
  })
}

export function DeleteAllPoster(){
  return service({
    url: "/poster",
    method: "delete"
  })
}

