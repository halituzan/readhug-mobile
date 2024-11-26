import { Alert } from "react-native";
import network from "@/lib/network";
import LocalStorage from "@/connections/LocalStorage";

const Login = async (payload: { email: string; password: string }) => {
  try {
    const res = await network.run("POST", "login", payload);
    await LocalStorage.set("token", res.access_token);
    return res;
  } catch (error: any) {
    console.log(error);
    return {};
    // Alert.alert(error.response.data.message);
  }
};

export { Login };
