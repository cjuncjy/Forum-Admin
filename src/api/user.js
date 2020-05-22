import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/user/login",
    method: "post",
    data
  });
}

// 登录后获取当前用户信息专用
export function getInfo() {
  return request({
    url: "/user/info",
    method: "get"
  });
}

export function getUserList(params) {
  return request({
    url: "/user/list",
    method: "get",
    params
  });
}

export function getInfoById(id) {
  return request({
    url: "/user/infoDetails",
    method: "get",
    params: {
      id
    }
  });
}

export function createOrUpdateInfo(data) {
  return request({
    url: "/user/createOrUpdate",
    method: "post",
    data
  });
}

export function deleteUser(id) {
  return request({
    url: "/user/delete",
    method: "post",
    data: {
      id
    }
  });
}
export function getAllUser() {
  return request({
    url: "/user/listAll",
    method: "get"
  });
}
