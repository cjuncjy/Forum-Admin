import { login, getInfo } from "@/api/user.js";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "../../router";
const state = {
  token: getToken(),
  roles: [],
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then(response => {
          const { data } = response;
          commit("SET_TOKEN", data.token);
          setToken(data.token);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(response => {
          const { data } = response;

          if (!data) {
            reject("Verification failed, please Login again.");
          }
          data.roles = data.roles.split(",");
          const { roles } = data;

          // roles must be a non-empty array
          if (!roles || roles.length <= 0) {
            reject("getInfo: roles must be a non-null array!");
          }

          commit("SET_ROLES", roles);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  logout({ commit }) {
    return new Promise((resolve, reject) => {
      try {
        commit("SET_TOKEN", "");
        commit("SET_ROLES", []);
        removeToken();
        resetRouter();
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit("SET_TOKEN", "");
      removeToken();
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
