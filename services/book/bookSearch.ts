import { Alert } from "react-native";
import network from "@/connections/network";

const GetThirdPartyBookSearch = async (query: string) => {
  try {
    const res = await network.run(
      "GET",
      `/third/google/book/search?name=${query}`,
      null
    );
    return res;
    // return res;
  } catch (error: any) {
    // Alert.alert(error.response.data.message);
  }
};
const CreateBookFromList = async (bookId: string, type: string) => {
  try {
    const res = await network.run("POST", `/book/user/createBookFromList`, {
      bookId,
      type,
    });
    return res;
    // return res;
  } catch (error: any) {
    // Alert.alert(error.response.data.message);
  }
};
const CreateBookFromThirdParty = async (payload: any) => {
  try {
    const res = await network.run("POST", `/third/google/book/create`, {
      ...payload,
    });
    return res;
    // return res;
  } catch (error: any) {
    console.log(error);
  }
};

export {
  GetThirdPartyBookSearch,
  CreateBookFromList,
  CreateBookFromThirdParty,
};
