import service from "@/utils/request";

export function SearchFilm(name) {
  return service({
    url: '/film/name/' + name,
    method: 'get'
  })
}

export function ListAllPoster() {
  return service({
    url: "/poster",
    method: "get"
  })
}

export function ListAllFilm() {
  return service({
    url: '/film',
    method: 'get'
  })
}

export function ListAllFilmByStatus1() {
  return service({
    url: '/film?status=1&release=1',
    method: 'get'
  })
}

export function ListAllFilmByStatus2() {
  return service({
    url: '/film?status=1&release=0',
    method: 'get'
  })
}

export function ListHots() {
  return service({
    url: '/film/hot',
    method: 'get'
  })
}
export function ListBoxOffice() {
  return service({
    url: '/film/boxOffice/10',
    method: 'get'
  })
}

export function FindFilmByRegionAndType(region, type) {
  return service({
    url: '/film?region=' + region + '&type=' + type,
    method: 'get'
  })
}

export function FindFilmById(id) {
  return service({
    url: '/film/' + id,
    method: 'get'
  })
}

export function AddFilmEvaluate(data) {
  return service({
    url: '/fe',
    method: 'post',
    data: data
  })
}

export function FindFilmEvaluateByFId(id) {
  return service({
    url: '/fe?fid=' + id,
    method: 'get'
  })
}

export function FindArrangements (fid) {
  return service({
    url: "/arrangement?fid=" + fid,
    method: "get"
  })
}

export function FindArrangementById(id) {
  return service({
    url: "/arrangement/" + id,
    method: "get"
  })
}

export function GetArrangementSeats(id) {
  return service({
    url: "/arrangement/getSeats?id=" + id,
    method: "get"
  })
}
