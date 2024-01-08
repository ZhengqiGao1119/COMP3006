import service from "@/utils/request";

export function CreateOrder(data) {
  return service({
    url: "/order",
    method: "post",
    data: data
  })
}

export function FindOrderByUser(uid) {
  return service({
    url: "/order/user/" + uid,
    method: "get",
    params: {
      page: 1,
      limit: 1000000
    }
  })
}

export function DeleteOrderById(id) {
  return service({
    url: '/order/' + id,
    method: "delete"
  })
}

export function PayForOrder(id) {
  return service({
    url: '/order/pay?id=' + id,
    method: "post"
  })
}
