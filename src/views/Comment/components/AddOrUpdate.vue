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
      <el-form-item label="问题id" prop="questionId" v-if="isQuest">
        <el-input v-model="dataForm.questionId" placeholder="问题id"></el-input>
      </el-form-item>
      <el-form-item label="文章id" prop="articleId" v-else>
        <el-input v-model="dataForm.articleId" placeholder="文章id"></el-input>
      </el-form-item>
      <el-form-item label="评论内容" prop="content">
        <el-input v-model="dataForm.content" placeholder="评论内容"></el-input>
      </el-form-item>
      <el-form-item label="来自" prop="fromUserId">
        <el-select
          v-model="dataForm.fromUserId"
          placeholder="请选择"
          filterable
        >
          <el-option
            v-for="item in userList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="评论给" prop="toUserId">
        <el-select v-model="dataForm.toUserId" placeholder="请选择" filterable>
          <el-option
            v-for="item in userList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getAllUser } from "@/api/user";
import { getInfoById, createOrUpdate } from "@/api/comment";
export default {
  data() {
    return {
      visible: false,
      isQuest: false,
      dataForm: {
        id: 0,
        content: "",
        toUserId: "",
        fromUserId: "",
        articleId: "",
        questionId: ""
      },
      userList: [],
      dataRule: {
        content: [{ required: true, message: "内容不能为空", trigger: "blur" }],
        fromUserId: [
          { required: true, message: "评论者不能为空", trigger: "blur" }
        ],
        articleId: [
          { required: true, message: "文章id不能为空", trigger: "blur" }
        ],
        questionId: [
          { required: true, message: "问题id不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    init(id, isQuest) {
      this.dataForm.id = id || 0;
      this.visible = true;
      this.isQuest = isQuest;
      this.$nextTick(() => {
        this.$refs.dataForm.resetFields();
        if (this.dataForm.id) {
          getInfoById(id, isQuest).then(res => {
            if (res.code === 0) {
              this.dataForm.content = res.data.content;
              this.dataForm.fromUserId = res.data.fromUserId;
              this.dataForm.toUserId = res.data.toUserId;
              if (isQuest) {
                this.dataForm.questionId = res.data.questionId;
              } else {
                this.dataForm.articleId = res.data.articleId;
              }
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
          createOrUpdate(this.dataForm, this.isQuest).then(res => {
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
    getUserList() {
      getAllUser().then(res => {
        if (res.code === 0) {
          this.userList = res.data;
        }
      });
    }
  },
  mounted() {
    this.getUserList();
  }
};
</script>
