<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    class="dialog_form"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      :inline="true"
      @keyup.enter.native="dataFormSubmit()"
      label-width="100px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="dataForm.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="dataForm.password"
          placeholder="密码"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户头像" prop="avatarId">
        <!-- <el-input v-model="dataForm.avatar" placeholder="文章头像"></el-input> -->
        <file-upload
          @onSuccess="onUploadSuccess"
          :fileList="fileList"
          ref="fileUpload"
        ></file-upload>
      </el-form-item>
      <el-form-item label="联系方式" prop="phone">
        <el-input v-model="dataForm.phone" placeholder="联系方式"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="dataForm.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="roles">
        <el-select v-model="dataForm.roles" multiple placeholder="请选择角色">
          <el-option
            v-for="item in rolesOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="个人简介" prop="description">
        <el-input
          v-model="dataForm.description"
          placeholder="个人简介"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getInfoById, createOrUpdateInfo } from "@/api/user.js";
import FileUpload from "@/components/Upload/FileUpload.vue";
export default {
  components: {
    FileUpload
  },
  data() {
    return {
      visible: false,
      dataForm: {
        id: 0,
        username: "",
        password: "",
        email: "",
        phone: "",
        roles: [],
        avatarId: "",
        description: ""
      },
      fileList: [],
      dataRule: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "联系方式不能为空", trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur"]
          }
        ],
        roles: [{ required: true, message: "角色不能为空", trigger: "blur" }]
      },
      rolesOption: [
        { label: "admin", value: "admin" },
        { label: "editor", value: "editor" },
        { label: "normal", value: "normal" }
      ]
    };
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0;
      this.visible = true;
      this.fileList = [];
      this.$nextTick(() => {
        this.$refs.dataForm.resetFields();
        if (this.dataForm.id) {
          getInfoById(id).then(res => {
            if (res.code === 0) {
              console.log(res.data);
              this.dataForm.id = res.data.id;
              this.dataForm.username = res.data.username;
              this.dataForm.password = res.data.password;
              this.dataForm.email = res.data.email;
              this.dataForm.phone = res.data.phone;
              this.dataForm.roles = res.data.roles;
              this.dataForm.avatarId = res.data.avatar_id;
              this.dataForm.description = res.data.description;

              // 图片文件的初始化
              this.fileList.push(res.data.file);
              this.$refs.fileUpload.imageUrl =
                process.env.VUE_APP_IMG_URL + res.data.file.path;
            } else {
              this.$message.error(res.msg);
            }
          });
        }
      });
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          createOrUpdateInfo(this.dataForm).then(res => {
            if (res && res.code === 0) {
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.visible = false;
                  this.$emit("refreshDataList");
                }
              });
            }
          });
        }
      });
    },
    onUploadSuccess(data) {
      this.dataForm.avatarId = data.id;
    }
  }
};
</script>
