<template>
  <div class="file-upload">
    <el-upload
      class="avatar-uploader"
      :action="action"
      :limit="1"
      :headers="headers"
      :multiple="false"
      :before-upload="beforeUpload"
      :on-success="onSuccess"
      :on-remove="onRemove"
      :on-error="onError"
      :file-list="fileList"
      :disabled="disabled"
      :on-exceed="onExceed"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth.js";
import { deleteById } from "@/api/upload.js";
export default {
  name: "FileUpload",
  data() {
    return {
      action: process.env.VUE_APP_BASE_API + "/upload/img",
      imageUrl: "",
    };
  },
  props: {
    fileList: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    headers() {
      return {
        Authorization: `Bearer ${getToken()}`,
      };
    },
  },
  methods: {
    beforeUpload(file) {
      this.$emit("beforeUpload", file);
    },
    onSuccess(resp, file) {
      if (resp.code === 0) {
        this.$message.success("上传文件成功");
        this.imageUrl = `${process.env.VUE_APP_IMG_URL}${resp.data.path}`;
        this.$emit("onSuccess", resp.data);
      }
    },
    onError(err) {
      const errMsg = err.message && JSON.parse(err.message);
      this.$message.error(
        (errMsg && errMsg.msg && `上传失败，原因：${errMsg.msg}`) || "上传失败",
      );
    },
    onRemove(file, fileList) {
      let id, filename;
      if (file.id) {
        id = file.id;
        filename = file.name;
      } else {
        id = file.response.data.id;
        filename = file.response.data.filename;
      }
      deleteById({ id, filename }).then((res) => {
        if (res.code === 0) {
          this.$message.success("移除成功");
          this.imageUrl = "";
        }
      });
    },
    onExceed() {
      this.$message.warning("只能上传一个文件");
    },
  },
};
</script>
<style lang="scss" scoped>
.file-upload ::v-deep {
  .avatar-uploader {
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      &:hover {
        border-color: #409eff;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 160px;
        height: 160px;
        line-height: 160px;
        text-align: center;
      }
    }
    .avatar {
      width: 160px;
      height: 160px;
      display: block;
    }
  }
}
</style>
