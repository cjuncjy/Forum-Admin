import request from "@/utils/request";

export function getLabelList(params) {
  return request({
    url: "/label/list",
    method: "get",
    params
  });
}

export function getInfoById(id) {
  return request({
    url: "/label/info",
    method: "get",
    params: {
      id
    }
  });
}

export function createOrUpdate(data) {
  return request({
    url: "/label/createOrUpdate",
    method: "post",
    data
  });
}

export function deleteLabel(id) {
  return request({
    url: "/label/delete",
    method: "post",
    data: {
      id
    }
  });
}

export function getLabelsBySortId(id) {
  return request({
    url: "/label/labelsBySort",
    method: "get",
    params: {
      id
    }
  });
}

export function getAllLabel(params) {
  return request({
    url: "/label/labelAll",
    method: "get",
    params
  });
}
