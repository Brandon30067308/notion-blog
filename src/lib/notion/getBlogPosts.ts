import { BlogPost } from "@/types/schema";
import notionClient from ".";
import { formatPageAsBlogPost } from "../blogHelpers";

const getBlogPosts = async function (
  startCursor?: string
): Promise<BlogPost[]> {
  const pageId = process.env.BLOG_INDEX_ID ?? "";

  const response = await notionClient.databases.query({
    database_id: pageId,
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
    page_size: 9,
    ...(startCursor ? { start_cursor: startCursor } : {}),
  });

  const posts = response.results.map((page) => formatPageAsBlogPost(page));

  return posts;
};

export default getBlogPosts;
