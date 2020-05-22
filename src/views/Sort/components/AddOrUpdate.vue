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
      <el-form-item label="分类名" prop="name">
        <el-input v-model="dataForm.name" placeholder="分类名"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="dataForm.description" placeholder="描述"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getInfoById, createOrUpdate } from "@/api/sort.js";
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        id: 0,
        name: "",
        description: "",
      },
      dataRule: {
        name: [{ required: true, message: "分类名不能为空", trigger: "blur" }],
      },
    };
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs.dataForm.resetFields();
        if (this.dataForm.id) {
          getInfoById(id).then(res => {
            if (res.code === 0) {
              this.dataForm.name = res.data.sort_name;
              this.dataForm.description = res.data.sort_description;
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
          createOrUpdate(this.dataForm).then(res => {
            if (res && res.code === 0) {
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.visible = false;
                  this.$emit("refreshDataList");
                },
              });
            }
          });
        }
      });
    },
  },
};
</script>
