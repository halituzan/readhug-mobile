import { Alert } from "react-native";
import network from "@/connections/network";

const GetMyInformation = async () => {
  try {
    const res = await network.run("GET", "user/me", null);
    return res;
    // return res;
  } catch (error: any) {
    // Alert.alert(error.response.data.message);
  }
};

export { GetMyInformation };
