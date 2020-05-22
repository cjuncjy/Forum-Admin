<template>
  <vue-editor
    :editorToolbar="toolbar"
    @imageAdded="uploadImage"
    class="rich-editor"
    useCustomImageHandler
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
import NProgress from "nprogress";
import "nprogress/nprogress.css";
// noinspection ES6CheckImport
import { VueEditor } from "vue2-editor";

/*
 * Vue2Editor
 * 配置参考
 * https://www.vue2editor.com/
 * https://github.com/davidroyer/vue2-editor
 * https://quilljs.com/docs/quickstart/
 */
export default {
  name: "RichEditor",
  components: { VueEditor },
  inheritAttrs: false,
  props: {
    toolbar: {
      type: Array,
      default: () => [
        [{ header: [false, 1, 2, 3, 4, 5, 6] }], // 文本样式
        [{ size: [false, "small", "large", "huge"] }], // 字体大小
        ["bold", "italic", "underline", "strike"], // 字体样式
        ["", "center", "right", "justify"].map(align => ({ align })), // 对齐
        ["blockquote"], // 引用
        [{ list: "ordered" }, { list: "bullet" }], // 列表
        [{ indent: "-1" }, { indent: "+1" }], // 缩进
        [{ color: [] }, { background: [] }], // 颜色
        ["link", "image", "video"], // 多媒体
        ["clean"], // 清除样式
      ],
    },
  },
  data() {
    return {
      uploads: [],
    };
  },
  methods: {
    /* eslint-disable */
    async uploadImage(file, editor, cursor, resetUploader) {
      // 添加到上传队列
      this.uploads.push(file);
      // 初始显示进度
      this.updateProgress();
      // const id = parseInt(this.$route.params.memorialId, 10);
      // const result = await api.uploadTemporaryImageUsingPOST(id, file, {
      //   onUploadProgress: e => {
      //     file.loadedBytes = e.loadedBytes;
      //     // 刷新当前进度
      //     this.updateProgress();
      //   },
      // });
      // 进度完成
      file.loadedBytes = file.size;
      this.updateProgress();
      // if (result.success) {
      //   const { url } = result.data;
      //   // noinspection JSUnresolvedFunction
      //   editor.insertEmbed(cursor, "image", url);
      //   resetUploader();
      // } else if (result.error === "ImageError") {
      //   message.error(rules.imageTip);
      // } else if (result.error === "OutOfSpace") {
      //   message.error("空间不足");
      // }
    },
    updateProgress() {
      // sum是上一次reduce处理的结果,cur是数组中要处理的下一个元素,指定初始值为0
      const loadedBytes = this.uploads.reduce(
        (sum, cur) => sum + cur.loadedBytes || 0,
        0,
      );
      const totalBytes = this.uploads.reduce((sum, cur) => sum + cur.size, 0);
      if (loadedBytes === totalBytes) {
        this.uploads = [];
        if (NProgress.isStarted()) {
          NProgress.done();
        }
      } else {
        NProgress.set(loadedBytes / totalBytes);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.rich-editor {
  line-height: normal;

  //noinspection CssInvalidPseudoSelector
  ::v-deep .ql-snow {
    .ql-picker.ql-header {
      .ql-picker-item,
      .ql-picker-label {
        &:before {
          content: "正文";
        }

        &[data-value="1"]:before {
          content: "一级标题";
        }

        &[data-value="2"]:before {
          content: "二级标题";
        }

        &[data-value="3"]:before {
          content: "三级标题";
        }

        &[data-value="4"]:before {
          content: "四级标题";
        }

        &[data-value="5"]:before {
          content: "五级标题";
        }

        &[data-value="6"]:before {
          content: "六级标题";
        }
      }
    }

    .ql-picker.ql-size {
      .ql-picker-item,
      .ql-picker-label {
        &:before {
          content: "正常";
        }

        &[data-value="small"]:before {
          content: "小";
        }

        &[data-value="large"]:before {
          content: "大";
        }

        &[data-value="huge"]:before {
          content: "超大";
        }
      }
    }

    .ql-tooltip:before {
      content: "查看链接：";
    }

    a.ql-action:after {
      content: "编辑";
    }

    a.ql-remove:before {
      content: "移除";
    }

    .ql-tooltip[data-mode="link"]::before {
      content: "输入链接：";
    }

    .ql-tooltip.ql-editing a.ql-action:after {
      content: "保存";
    }
  }
}
</style>
