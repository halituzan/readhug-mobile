import LocalStorage from "@/connections/LocalStorage";
import axios from "axios";

const network = class NETWORK {
  [x: string]: any;

  constructor(axios: { create: (arg0: { baseURL: string }) => any }) {
    this.network = axios.create({
      baseURL: "http://192.168.111.6:4000/",
    });
  }

  run = async (method: string, url: string, data: any) => {
    const options = {
      method,
      url,
      data,
      headers: {},
    };

    const token = await LocalStorage.get("token"); // Async işlem

    if (token) {
      options.headers = { authorization: `Bearer ${token}` };
    }

    return await this.network(options)
      .then((response: any) => response.data)
      .catch((error: any) => {
        console.log("Error Response:", error?.response || error);

        if (error.response) {
          const { status, data } = error.response;
          if (status === 400) {
            const message = data?.error?.message;
            console.log("400 Error:", message);
          } else if (status === 401 || status === 403) {
            console.log("Unauthorized or Forbidden:", data);
          }
        } else {
          console.error("Unexpected Error:", error.message);
        }

        throw error;
      });
  };
};

export default new network(axios);
