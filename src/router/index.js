import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/Layout/Layout.vue";

Vue.use(VueRouter);

export const constantRoutes = [
  {
    path: "/",
    // component: () => import("../views/Layout/Layout.vue"),
    component: Layout,
    redirect: "/home",
    icon: "el-icon-help",
    children: [
      {
        path: "home",
        component: () => import("../views/Home.vue"),
        name: "adminHome",
        meta: {
          title: "首页"
        }
      }
    ]
  },

  {
    path: "/login",
    name: "admin-login",
    component: () => import("../views/Login/AdminLogin.vue"),
    meta: {
      title: "登录页面"
    },
    hidden: true
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    hidden: true
  },
  {
    path: "/401",
    component: () => import("@/views/error-page/401.vue"),
    hidden: true
  }
];

export const asyncRoutes = [
  {
    path: "/userinfo",
    component: Layout,
    icon: "el-icon-user",
    meta: {
      title: "用户管理",
      roles: ["admin"]
    },
    children: [
      {
        path: "index",
        component: () => import("../views/UserInfo"),
        name: "userinfo",
        meta: {
          title: "用户管理",
          roles: ["admin", "editor"]
        }
      }
    ]
  },
  {
    path: "/article",
    component: Layout,
    redirect: "/article/ordinary",
    icon: "el-icon-document",
    meta: {
      title: "文章管理",
      roles: ["admin", "editor"]
    },
    children: [
      {
        path: "ordinary",
        component: () => import("../views/Article/Ordinary.vue"),
        name: "ordinary",
        icon: "el-icon-news",
        meta: {
          title: "普通文章"
        }
      },
      {
        path: "hot",
        component: () => import("../views/Article/Hot.vue"),
        name: "hot",
        icon: "el-icon-data-analysis",
        meta: {
          title: "热门文章"
        }
      }
      // {
      //   path: "follow",
      //   component: () => import("../views/Article/Follow.vue"),
      //   name: "follow",
      //   icon: "el-icon-star-off",
      //   meta: {
      //     title: "关注文章"
      //   }
      // }
    ]
  },
  {
    path: "/sort",
    component: Layout,
    icon: "el-icon-collection",
    meta: {
      roles: ["admin"],
      title: "分类管理"
    },
    children: [
      {
        path: "index",
        component: () => import("../views/Sort"),
        name: "sort",
        meta: {
          roles: ["admin"],
          title: "分类管理"
        }
      }
    ]
  },
  {
    path: "/tag",
    component: Layout,
    icon: "el-icon-notebook-1",
    meta: {
      roles: ["admin"],
      title: "标签管理"
    },
    children: [
      {
        path: "index",
        component: () => import("../views/Tag"),
        name: "tag",
        meta: {
          roles: ["admin"],
          title: "标签管理"
        }
      }
    ]
  },
  {
    path: "/quest",
    component: Layout,
    icon: "el-icon-discover",
    meta: {
      roles: ["admin"],
      title: "问答管理"
    },
    children: [
      {
        path: "index",
        component: () => import("../views/Quest"),
        name: "quest",
        meta: {
          roles: ["admin"],
          title: "问答管理"
        }
      }
    ]
  },
  {
    path: "/comment",
    component: Layout,
    icon: "el-icon-chat-dot-round",
    meta: {
      roles: ["admin"],
      title: "评论管理"
    },
    children: [
      {
        path: "article",
        component: () => import("../views/Comment/ArticleComment"),
        name: "articleComment",
        icon: "el-icon-data-analysis",
        meta: {
          roles: ["admin"],
          title: "文章评论"
        }
      },
      {
        path: "quest",
        component: () => import("../views/Comment/QuestComment"),
        name: "questComment",
        icon: "el-icon-data-analysis",
        meta: {
          roles: ["admin"],
          title: "问答评论"
        }
      }
    ]
  }
];

const createRouter = () =>
  new VueRouter({
    mode: "history", // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

// const router = new VueRouter({
//   mode: "history",
//   base: process.env.BASE_URL,
//   routes,
// });
const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
