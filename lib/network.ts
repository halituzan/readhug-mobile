import LocalStorage from "@/connections/LocalStorage";
import axios from "axios";

const getToken = (cookie: string) => {
  if (!cookie) {
    return null;
  }
  let parsedCookies = {};
  cookie.split("; ").forEach((rawCookie: string) => {
    const parsedCookie = rawCookie.split("=");
    // @ts-ignore
    parsedCookies[parsedCookie[0]] = parsedCookie[1];
  });

  // @ts-ignore
  const token = parsedCookies["mobilyu-token"];
  return token;
};

const network = class NETWORK {
  [x: string]: any;

  constructor(axios: { create: (arg0: { baseURL: string }) => any }) {
    this.network = axios.create({
      baseURL: "http://localhost:4000/",
    });
  }

  run = async (context: any, method: string, url: string, data: any) => {
    const options = {
      method,
      url,
      data,
      headers: {},
    };

    if (context) {
      const token = getToken(context.req.headers.cookie);
      if (token) {
        options.headers = { authorization: `Bearer ${token}` };
      }
    } else {
      const token = LocalStorage.get("token");
      if (token) {
        options.headers = { authorization: `Bearer ${token}` };
      }
    }

    return await this.network(options)
      .then((response: any) => response.data)
      .catch((error: any) => {
        if (error.response.status === 400) {
          const message = error?.response?.data?.error?.message;
        } else if (error.response.status === 401) {
          if (context) {
            context.res.statusCode = 302;
            context.res.setHeader("Location", "/direct");
          } else {
            window.location.href = "/";
          }
        } else {
        }

        throw error;
      });
  };
};

export default new network(axios);
