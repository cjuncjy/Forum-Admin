<template>
  <div class="home">
    <h1>后台管理系统介绍</h1>
    <ul>
      <li>前后端分离，通过Json Web Token进行数据交互，可独立部署</li>
      <li>主题定制，通过scss变量统一一站式定制</li>
      <li>动态菜单，通过菜单管理统一管理访问路由</li>
      <li>数据切换，通过api文件配置对接口数据</li>
      <li>发布时，可动态配置CDN静态资源／切换新旧版本</li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.home {
  line-height: 1.5;
  padding: 0 20px;
  h1 {
    font-size: 24px;
    padding: 20px 0;
  }
  ul {
    padding-left: 10px;
    li {
      list-style-type: disc;
      font-size: 16px;
      margin-bottom: 10px;
    }
  }
}
</style>
