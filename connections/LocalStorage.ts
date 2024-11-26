import AsyncStorage from "@react-native-async-storage/async-storage";

const LocalStorage = class LOCALSTORAGE {
  get = async (key: any) => {
    return await AsyncStorage.getItem(key);
  };

  set = async (key: any, value: any) => {
    return await AsyncStorage.setItem(key, value);
  };

  remove = async (key: any) => {
    return await AsyncStorage.removeItem(key);
  };
};

export default new LocalStorage();
