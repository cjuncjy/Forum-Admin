<template>
  <div class="aside">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      router
    >
      <div v-for="(item, index) in routeObj" :key="index">
        <el-menu-item :index="item.childPath" v-if="item.children.length === 1">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
        <el-submenu :index="index + ''" v-else>
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </template>
          <el-menu-item
            v-for="(item2, index2) in item.children"
            :key="index2"
            :index="item2.path"
          >
            <i :class="item2.icon"></i>
            {{ item2.meta.title }}</el-menu-item
          >
        </el-submenu>
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Aside",
  data() {
    return {
      routeObj: []
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    initRoute() {
      this.routeObj = JSON.parse(
        JSON.stringify(this.$store.getters.permission_routes)
      );
      // 获取route后对route处理
      // 先取出显示的
      this.routeObj = this.routeObj.filter(_ => !_.hidden);
      this.routeObj.forEach(item => {
        if (item.children && item.children.length === 1) {
          // 一个children的
          item.childPath =
            item.redirect || item.path + "/" + item.children[0].path;
          item.title = item.children[0].meta.title;
        } else {
          // children多的
          item.title = item.meta.title;
          item.children.forEach(item2 => {
            item2.path = item.path + "/" + item2.path;
          });
        }
      });
    }
  },
  mounted() {
    this.initRoute();
  }
};
</script>

<style scoped lang="scss">
.aside ::v-deep {
  .el-menu {
    background-color: rgb(48, 65, 86);
    // .el-submenu {
    //   .el-submenu__title,
    //   .el-menu-item {
    //     color: #bfcbd9 !important;
    //     &:hover {
    //       background-color: #263445 !important;
    //     }
    //   }
    // }
    .el-submenu__title,
    .el-menu-item {
      color: #bfcbd9 !important;
      &:hover {
        background-color: #263445 !important;
      }
    }
    .is-active {
      background-color: rgb(48, 65, 86);
      color: #409eff !important;
    }
  }
}
</style>
