import { PostPage } from "@/types/schema";
import notionClient from ".";
import { NotionToMarkdown } from "notion-to-md";
import { formatPageAsBlogPost } from "../blogHelpers";

export default async function getSingleBlogPost(
  slug: string
): Promise<PostPage | null> {
  const response = await notionClient.databases.query({
    database_id: process.env.BLOG_INDEX_ID ?? "",
    filter: {
      property: "Slug",
      formula: {
        string: {
          equals: slug,
        },
      },
    },
  });

  const page = response?.results?.[0];
  if (!page) {
    return null;
  }

  const userId = (page as any)?.created_by?.id;
  const author = await notionClient.users.retrieve({ user_id: userId });

  const notionToMd = new NotionToMarkdown({ notionClient });
  const mdBlocks = await notionToMd.pageToMarkdown(page.id);
  const markdown = (notionToMd.toMarkdownString(mdBlocks) as any)?.parent ?? "";
  const post = formatPageAsBlogPost(page, author);

  return {
    post,
    markdown: markdown,
  };
}
