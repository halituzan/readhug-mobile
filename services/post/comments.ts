import network from "@/connections/network";

const CreateComments = async (content: string, postId: string) => {
  try {
    const res = await network.run("POST", `comment/posts/create`, {
      content,
      postId,
    });
    return res;
    // return res;
  } catch (error: any) {
    // Alert.alert(error.response.data.message);
  }
};

const GetComments = async (
  page: number,
  limit: number = 10,
  postId: string
) => {
  try {
    const res = await network.run(
      "GET",
      `/comment/posts/${postId}?page=${page}&limit=${limit}&sort=desc`,
      null
    );
    return res;
  } catch (error) {
    // Alert.alert(error.response.data.message);
  }
};

export { CreateComments, GetComments };
