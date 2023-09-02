import notionClient from ".";

const getBlogPostsRaw = async function (nextCursor: string | null): Promise<{
  posts: Array<any>;
  nextCursor: string | null;
  hasMore: boolean;
}> {
  const pageId = process.env.BLOG_INDEX_ID ?? "";

  const response = await notionClient.databases.query({
    database_id: pageId,
    filter_properties: [],
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "Created",
        direction: "descending",
      },
    ],
    page_size: 100,
    ...(nextCursor ? { start_cursor: nextCursor } : {}),
  });

  const posts = response.results;

  return {
    posts,
    nextCursor: response.next_cursor,
    hasMore: response.has_more,
  };
};

export default getBlogPostsRaw;
