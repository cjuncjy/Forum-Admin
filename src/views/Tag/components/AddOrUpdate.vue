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
      <el-form-item label="标签名" prop="name">
        <el-input v-model="dataForm.name" placeholder="标签名"></el-input>
      </el-form-item>
      <el-form-item label="所属分类" prop="sortId">
        <el-select v-model="dataForm.sortId" placeholder="请选择所属分类">
          <el-option
            v-for="item in sortList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
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
import { getInfoById, createOrUpdate } from "@/api/label.js";
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        id: 0,
        name: "",
        sortId: "",
        description: "",
      },
      dataRule: {
        name: [{ required: true, message: "标签名不能为空", trigger: "blur" }],
        sortId: [
          { required: true, message: "分类名不能为空", trigger: "blur" },
        ],
        description: [],
      },
    };
  },
  props: {
    sortList: {
      type: Array,
      default: () => [],
    },
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
              this.dataForm.name = res.data.label_name;
              this.dataForm.description = res.data.label_description;
              this.dataForm.sortId = res.data.sort_id;
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
