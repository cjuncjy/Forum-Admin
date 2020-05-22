import request from "@/utils/request";
export function deleteById(params) {
  return request({
    url: "/upload/img",
    method: "delete",
    params
  });
}

export function uploadImg(data) {
  return request({
    url: "/upload/img",
    method: "post",
    data
  });
}
