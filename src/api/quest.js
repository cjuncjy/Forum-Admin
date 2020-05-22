import request from "@/utils/request";

export function getQuestList(params) {
  return request({
    url: "/quest/list",
    method: "get",
    params
  });
}

export function getInfoById(id) {
  return request({
    url: "/quest/info",
    method: "get",
    params: {
      id
    }
  });
}

export function createOrUpdate(data) {
  return request({
    url: "/quest/createOrUpdate",
    method: "post",
    data
  });
}

export function deleteQuest(id) {
  return request({
    url: "/quest/delete",
    method: "post",
    params: { id }
  });
}
