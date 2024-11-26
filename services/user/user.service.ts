import { Alert } from "react-native";
import Network from "@/lib/network";

const GetMyInformation = async () => {
  try {
    // const res = await Network.get("user/me");
    return { data: {}, login: true };
    // return res;
  } catch (error: any) {
    Alert.alert(error.response.data.message);
  }
};

export { GetMyInformation };
