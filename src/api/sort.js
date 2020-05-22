import request from "@/utils/request";

export function getSortList(params) {
  return request({
    url: "/sort/list",
    method: "get",
    params,
  });
}

export function getInfoById(id) {
  return request({
    url: "/sort/info",
    method: "get",
    params: {
      id,
    },
  });
}

export function createOrUpdate(data) {
  return request({
    url: "/sort/createOrUpdate",
    method: "post",
    data,
  });
}
export function deleteSort(id) {
  return request({
    url: "sort/delete",
    method: "post",
    data: {
      id,
    },
  });
}

export function getAllSort() {
  return request({
    url: "sort/listAll",
    method: "get",
  });
}
