import network from "@/connections/network";

const GetUserPosts = async (page: number = 1, userName: string) => {
  try {
    const res = await network.run(
      "GET",
      `posts/user/${userName}?page=${page}&limit=10&sort=desc`,
      null
    );
    return res;
    // return res;
  } catch (error: any) {
    // Alert.alert(error.response.data.message);
  }
};

export { GetUserPosts };
