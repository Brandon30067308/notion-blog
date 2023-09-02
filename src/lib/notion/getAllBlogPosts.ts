import getBlogPostsRaw from "./getBlogPostsRaw";

export async function getAllBlogPosts() {
  const allPosts = [];

  let nextCursor = null;

  do {
    const { nextCursor: next, posts } = await getBlogPostsRaw(nextCursor);
    allPosts.push(...posts);
    nextCursor = next;
  } while (nextCursor);

  return allPosts;
}
