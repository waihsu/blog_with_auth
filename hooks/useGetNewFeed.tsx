export const useGetNewFeed = () => {
  const getNewFeeds = async () => {
    const resp = await fetch("/api/post");
    const data = await resp.json();
    return data;
  };
  return { getNewFeeds };
};
