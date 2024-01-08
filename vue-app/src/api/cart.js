import service from "@/utils/request";

export function CreateCart(data) {
  return service({
    url: "/cart",
    method: "post",
    data: data
  })
}

export function ListCarts(uid) {
  return service({
    url: '/cart?uid=' + uid,
    method: 'get'
  })
}

export function DeleteCartById(id) {
  return service({
    url: '/cart/' + id,
    method: "delete"
  })
}
