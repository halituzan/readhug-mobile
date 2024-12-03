import network from "@/connections/network";

const GetUserBooks = async (
  page: number = 0,
  userName: string,
  type?: "0" | "1" | "2"
) => {
  try {
    const res = await network.run(
      "GET",
      `/book/user/books/${userName}/${type}?page=${page}&limit=10&sort=desc`,
      null
    );
    return res;
    // return res;
  } catch (error: any) {
    // Alert.alert(error.response.data.message);
  }
};

export { GetUserBooks };
// type - required:
// 0-okundu
// 1-okunuyor
// 2-istek listesi
