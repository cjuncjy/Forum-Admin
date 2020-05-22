<template>
  <div class="nav">
    <div class="humbContainer">
      <i class="el-icon-s-fold"></i>
    </div>
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <!-- <el-breadcrumb-item
            v-if="breadcrumb.name !== '首页'"
            :to="{ path: breadcrumb.path }"
            >{{ breadcrumb.name }}</el-breadcrumb-item
          > -->
        <el-breadcrumb-item
          v-for="(item, index) in breadcrumb"
          :key="index"
          :to="{ path: item.path }"
          >{{ item.meta.title }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="right-menu">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img src="@/assets/1.gif" alt="" />
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminHeader",
  data() {
    return {
      breadcrumb: []
    };
  },
  watch: {
    "$route.path"() {
      this.breadcrumb = this.$route.matched.slice(1);
      if (
        this.breadcrumb.length === 1 &&
        this.breadcrumb[0].meta.name === "首页"
      ) {
        this.breadcrumb = [];
      }
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login`);
    }
  }
};
</script>

<style scoped lang="scss">
.nav ::v-deep {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .humbContainer {
    line-height: 50px;
    height: 100%;
    float: left;
    cursor: pointer;
    font-size: 24px;
    padding: 0 10px;
    font-weight: 400;
    color: #666;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  .breadcrumb {
    float: left;
    margin-left: 20px;
    .el-breadcrumb {
      height: 50px;
      line-height: 50px;
    }
  }
  .right-menu {
    float: right;
    margin-right: 30px;
    .el-dropdown {
      height: 50px;
      line-height: 50px;
      .el-dropdown-link {
        img {
          margin-top: 3px;
          height: 44px;
          border-radius: 8px;
        }
      }
    }
  }
}
</style>
