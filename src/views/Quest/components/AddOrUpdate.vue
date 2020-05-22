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
      label-width="100px"
    >
      <el-form-item label="用户" prop="userId">
        <el-select
          v-model="dataForm.userId"
          placeholder="请选择用户"
          filterable
          clearable
          style="width:100%"
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

      <el-form-item label="标题" prop="title">
        <el-input v-model="dataForm.title" placeholder="标签名"></el-input>
      </el-form-item>
      <el-form-item label="所属标签" prop="labelIds">
        <el-select
          v-model="dataForm.labelIds"
          placeholder="请选择标签"
          multiple
          style="width:100%"
          @change="labelChange"
        >
          <el-option
            v-for="item in labelList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <!-- <RichEditor></RichEditor> -->
        <MarksownEditor v-model="dataForm.content" class="createArticle" />
      </el-form-item>
      <!-- <el-form-item label="描述" prop="description">
        <el-input v-model="dataForm.description" placeholder="描述"></el-input>
      </el-form-item> -->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getInfoById, createOrUpdate } from "@/api/quest.js";
import MarksownEditor from "@/components/MarkdownEditor";

export default {
  components: {
    MarksownEditor
  },
  data() {
    return {
      visible: false,
      dataForm: {
        id: 0,
        userId: "",
        title: "",
        content: "",
        labelIds: []
      },
      dataRule: {
        userId: [{ required: true, message: "用户不能为空", trigger: "blur" }],
        title: [{ required: true, message: "标题不能为空", trigger: "blur" }],
        labelIds: [
          { required: true, message: "标签不能为空", trigger: "blur" }
        ],
        content: [{ required: true, message: "内容不能为空", trigger: "blur" }]
      }
    };
  },
  props: {
    labelList: {
      type: Array,
      default: () => []
    },
    userList: {
      type: Array,
      default: () => []
    }
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
              this.dataForm.title = res.data.title;
              this.dataForm.content = res.data.content;
              this.dataForm.labelIds = res.data.labelIds;
              this.dataForm.userId = res.data.userId;
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
                }
              });
            }
          });
        }
      });
    },
    labelChange(val) {
      if (this.dataForm.labelIds.length > 5) {
        this.$message.warning("最多选择5个标签");
        this.dataForm.labelIds.length = 5;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.createArticle ::v-deep {
  // .te-preview {
  //   width: 300px;
  // }
}
</style>
