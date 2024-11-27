import { Alert } from "react-native";
import network from "@/connections/network";

const GetAllBooks = async (page: number = 0) => {
  try {
    const res = await network.run(
      "GET",
      "/posts/all?page=1&limit=10&sort=desc",
      null
    );
    return res;
    // return res;
  } catch (error: any) {
    // Alert.alert(error.response.data.message);
  }
};

export { GetAllBooks };
