import Cookie from "js-cookie";
import jwtDecode from "jwt-decode";
import Request from "../utils/request";

export class AuthService {
  async login(username: string, password: string): Promise<string> {
    const request = new Request();
    try {
      const response = await request.Post("auth/token", { username, password });
      if (response) {
        await this.setToken(response.data.authorization);
        return response.data.authorization;
      } else {
        throw new Error(
          "Unable to Login. Check your credentials and try again."
        );
      }
    } catch (err) {
      throw err;
    }
  }

  async logout() {
    this.unsetToken();
  }

  private setToken(token) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("authorization", token);
    Cookie.set("authorization", token);
  }

  private unsetToken() {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem("authorization");
    Cookie.remove("authorization");
  }

  getTokenFromLocalStorage() {
    const authorization = window.localStorage.authorization;
    return {
      raw: authorization || null,
      parsed: authorization ? jwtDecode(authorization) : {}
    };
  }

  getTokenFromCookie(req) {
    const output = {
      raw: null,
      parsed: null
    };
    if (!req.headers.cookie) return output;
    const cookie = req.headers.cookie
      .split(";")
      .find(c => c.trim().startsWith("authorization="));
    if (!cookie) return output;
    const authorization = cookie.split("=")[1];
    return {
      raw: authorization || null,
      parsed: authorization ? jwtDecode(authorization) : {}
    };
  }
}
