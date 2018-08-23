import { AuthService } from "../services/auth.service";
import { ProviderService } from "../services/provider.service";

export const state = () => ({
  authorization: null,
  providerSummaryForTheTop100DRG: []
});

export const mutations = {
  setAuthorization(state, authorization: string) {
    state.authorization = authorization;
  },
  setProviderSummaryForTheTop100DRG(state, list) {
    state.providerSummaryForTheTop100DRG = list;
  }
};

export const actions = {
  async nuxtServerInit({ commit }, { app }) {},
  async login({ commit, dispatch, state, rootState }, payload) {
    const authService = new AuthService();
    const authorization = await authService.login(
      payload.username,
      payload.password
    );
    commit("setAuthorization", authorization);
  },
  async getProviderSummaryForTheTop100DRG(
    { commit, dispatch, state, rootState },
    filters
  ) {
    const providerService = new ProviderService(state.authorization);
    const response = await providerService.getProviderSummaryForTheTop100DRG(
      filters
    );
    commit("setProviderSummaryForTheTop100DRG", response);
  }
};

export const getters = {
  isAuthenticated(state) {
    return !!state.authorization;
  },
  providerSummaryForTheTop100DRG(state) {
    return state.providerSummaryForTheTop100DRG;
  }
};
