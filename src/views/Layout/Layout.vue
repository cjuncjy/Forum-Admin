<template>
  <div class="layout">
    <el-container>
      <div class="aside"><Aside /></div>
      <div class="content">
        <header>
          <AdminHeader />
        </header>
        <el-main>
          <!-- 子路由渲染 -->
          <router-view></router-view>
        </el-main>
      </div>
    </el-container>
  </div>
</template>

<script>
import Aside from "./Aside.vue";
import AdminHeader from "./AdminHeader";
export default {
  name: "Layout",
  components: {
    Aside,
    AdminHeader
  }
};
</script>

<style scoped lang="scss">
.layout ::v-deep {
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff;
  .el-container {
    height: 100%;
    width: 100%;
    .aside {
      width: 200px;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1001;
      background-color: #304156;
      overflow: hidden;
      color: rgb(191, 203, 217);
    }
    .content {
      margin-left: 200px;
      width: calc(100% - 200px);
    }
  }
}
</style>
