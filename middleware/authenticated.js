import { AuthService } from "../services/auth.service";

export default function({ store, req }) {
  const isServer = !!process.server;

  // If nuxt generate, pass this middleware
  if (isServer && !req) return;
  const authService = new AuthService();
  const token = isServer
    ? authService.getTokenFromCookie(req)
    : authService.getTokenFromLocalStorage();
  store.commit("setAuthorization", token.raw);
}
