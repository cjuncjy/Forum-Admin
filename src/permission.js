import router from "./router";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth"; // get token from cookie
import store from "./store";
// import { Message } from "element-ui";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // set page title
  document.title = to.meta.title;

  // determine whether the user has logged in
  const hasToken = getToken();
  if (hasToken) {
    if (to.path === "/login") {
      // if is logged in, redirect to the home page
      next({ path: "/" });
      NProgress.done();
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      if (hasRoles) {
        next();
      } else {
        try {
          const { roles } = await store.dispatch("user/getInfo");
          // const roles = ["a"];
          const accessRoutes = await store.dispatch(
            "permission/generateRoutes",
            roles,
          );
          router.addRoutes(accessRoutes);
          next(to.path);
        } catch (error) {
          console.log(error);
          await store.dispatch("user/resetToken");
          // Message.error(error || "Has Error");
          // next(`/login?redirect=${to.path}`);
          next("/login");
          NProgress.done();
        }
      }
    }
  } else {
    /* has no token*/
    if (to.path === "/login") {
      next();
    } else {
      next("/login");
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
