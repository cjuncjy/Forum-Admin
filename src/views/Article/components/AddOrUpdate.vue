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
      label-width="100px"
    >
      <el-form-item label="所属用户" prop="userId">
        <!-- <el-input v-model="dataForm.userId" placeholder="所属用户"></el-input> -->
        <el-select
          v-model="dataForm.userId"
          placeholder="请选择"
          clearable
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
      <el-form-item label="所属分类" prop="sortId">
        <el-select
          v-model="dataForm.sortId"
          placeholder="请选择"
          clearable
          filterable
          @change="sortChange"
        >
          <el-option
            v-for="item in sortList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <!-- <el-input v-model="dataForm.sortId" placeholder="所属分类"></el-input> -->
      </el-form-item>
      <el-form-item label="所属标签" prop="labelIds">
        <el-select
          v-model="dataForm.labelIds"
          placeholder="请选择"
          clearable
          filterable
          multiple
        >
          <el-option
            v-for="item in labelList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <!-- <el-input v-model="dataForm.sortId" placeholder="所属标签"></el-input> -->
      </el-form-item>
      <el-form-item label="文章封面" prop="avatarId">
        <!-- <el-input v-model="dataForm.avatar" placeholder="文章头像"></el-input> -->
        <file-upload
          @onSuccess="onUploadSuccess"
          :fileList="fileList"
          ref="fileUpload"
        ></file-upload>
      </el-form-item>
      <el-form-item label="文章标题" prop="title" style="width: 100%;">
        <el-input v-model="dataForm.title" placeholder="文章标题"></el-input>
      </el-form-item>
      <el-form-item label="文章摘要" prop="summary" style="width: 100%;">
        <el-input v-model="dataForm.summary" placeholder="文章摘要"></el-input>
      </el-form-item>
      <el-form-item label="文章内容" prop="content" class="editor-wrapper">
        <!-- <el-input v-model="dataForm.content" placeholder="文章内容"></el-input> -->
        <rich-editor
          class="edit"
          id="editor"
          placeholder="请输入内容"
          v-model="dataForm.content"
        />
        <el-button type="text" size="small" @click="full()" style="color:#999"
          >切换全屏</el-button
        >
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getInfoById, createOrUpdate } from "@/api/article.js";
import { getAllUser } from "@/api/user.js";
import { getAllSort } from "@/api/sort.js";
import { getLabelsBySortId } from "@/api/label.js";
// import RichEditor from "@/components/RichEditor/index.vue";
import RichEditor from "@/components/MarkdownEditor";
import FileUpload from "@/components/Upload/FileUpload.vue";
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        id: 0,
        userId: "",
        sortId: "",
        title: "",
        content: "",
        avatarId: "",
        summary: "",
        labelIds: []
      },
      fileList: [],
      dataRule: {
        userId: [
          { required: true, message: "所属用户不能为空", trigger: "blur" }
        ],
        sortId: [
          { required: true, message: "所属分类不能为空", trigger: "blur" }
        ],
        title: [{ required: true, message: "标题不能为空", trigger: "blur" }],
        summary: [{ required: true, message: "摘要不能为空", trigger: "blur" }],
        content: [{ required: true, message: "内容不能为空", trigger: "blur" }],
        avatarId: [
          { required: true, message: "头像不能为空", trigger: "blur" }
        ],
        labelIds: [{ required: true, message: "标签不能为空", trigger: "blur" }]
      },
      userList: [],
      sortList: [],
      labelList: []
    };
  },
  components: {
    RichEditor,
    FileUpload
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs.dataForm.resetFields();
        this.fileList = [];
        this.$refs.fileUpload.imageUrl = "";
        if (this.dataForm.id) {
          getInfoById(id).then(res => {
            if (res.code === 0) {
              this.dataForm.userId = res.data.userId;
              this.dataForm.sortId = res.data.sortId;
              this.dataForm.title = res.data.title;
              this.dataForm.content = res.data.content;
              this.dataForm.avatarId = res.data.avatarId;
              this.dataForm.summary = res.data.summary;
              this.dataForm.labelIds = res.data.labelIds;
              this.sortChange(this.dataForm.sortId, true);

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
          // this.dataForm.content = document.querySelector(
          //   ".tui-editor-contents"
          // ).innerHTML;
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
    initSelect() {
      getAllUser().then(res => {
        if (res.code === 0) {
          this.userList = res.data;
        }
      });
      getAllSort().then(res => {
        if (res.code === 0) {
          this.sortList = res.data;
        }
      });
    },
    sortChange(val, tag) {
      if (!tag) {
        this.dataForm.labelIds = []; // 改变分类时候先把标签清空，保证标签一定属于当前分类
      }
      getLabelsBySortId(+val).then(res => {
        this.labelList = res.data;
      });
    },
    onUploadSuccess(data) {
      this.dataForm.avatarId = data.id;
    },
    launchFullscreen(element) {
      console.log(element);
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullScreen();
      }
    },
    full() {
      const editor = document.querySelector("#editor");
      this.launchFullscreen(editor);
    }
  },
  mounted() {
    this.initSelect();
  }
};
</script>
<style lang="scss" scoped>
.editor-wrapper {
  width: 100% !important;
  .edit ::v-deep {
    width: 100%;
    .te-preview {
      background: #fff;
    }
  }
}
:-webkit-full-screen #editor {
  width: 100%;
  height: 100%;
  background: #fff;
  .te-preview {
    background: #fff !important;
  }
}
</style>
