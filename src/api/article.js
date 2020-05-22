import request from "@/utils/request";

export function getOrdinaryList(params) {
  return request({
    url: "/article/listOrdinary",
    method: "get",
    params
  });
}

export function getInfoById(id) {
  return request({
    url: "/article/info",
    method: "get",
    params: {
      id
    }
  });
}

export function createOrUpdate(data) {
  return request({
    url: "/article/createOrUpdate",
    method: "post",
    data
  });
}

export function getHotList(params) {
  return request({
    url: "/article/listHot",
    method: "get",
    params
  });
}

export function deleteArticle(id) {
  return request({
    url: "/article/delete",
    method: "post",
    params: {
      id
    }
  });
}
