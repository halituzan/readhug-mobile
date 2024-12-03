import network from "@/connections/network";

const updateBookCount = async (
  readCount: number,
  userBookId: string,
  type?: any
) => {
  try {
    const res = await network.run("PATCH", `/book/user/updateBookFromList`, {
      userBookId,
      type,
      readCount,
    });
    return res;
  } catch (error: any) {}
};

export { updateBookCount };
