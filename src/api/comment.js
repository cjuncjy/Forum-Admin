import request from "@/utils/request";

export function getArticleComment(params) {
  return request({
    url: "/comment/articleComment",
    method: "get",
    params
  });
}

export function getQuestComment(params) {
  return request({
    url: "/comment/questComment",
    method: "get",
    params
  });
}

export function getInfoById(id, isQuest) {
  return request({
    url: "/comment/commentDetails",
    method: "get",
    params: {
      id,
      isQuest
    }
  });
}

export function createOrUpdate(data, isQuest) {
  return request({
    url: "/comment/createOrUpdate",
    method: "post",
    data,
    params: { isQuest }
  });
}

export function deleteComment(id, isQuest) {
  return request({
    url: "/comment/delete",
    method: "post",
    params: { id, isQuest }
  });
}
