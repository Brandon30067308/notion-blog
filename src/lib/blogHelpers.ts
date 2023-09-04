import { BlogPost } from "@/types/schema";
import { UserObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const getBlogLink = (slug: string) => {
  return `/blog/${slug}`;
};

export const getDateStr = (date: string) => {
  return new Date(date).toLocaleString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
};

export const postIsPublished = (post: any) => {
  return post.Published === "Yes";
};

export const normalizeSlug = (slug: any): any => {
  if (typeof slug !== "string") return slug;

  let startingSlash = slug.startsWith("/");
  let endingSlash = slug.endsWith("/");

  if (startingSlash) {
    slug = slug.substr(1);
  }
  if (endingSlash) {
    slug = slug.substr(0, slug.length - 1);
  }
  return startingSlash || endingSlash ? normalizeSlug(slug) : slug;
};

export const formatPageAsBlogPost = function (
  page: any,
  author?: UserObjectResponse
): BlogPost {
  let cover = page.cover;

  switch (cover?.type) {
    case "file":
      cover = page.cover.file.url;
      break;
    case "external":
      cover = page.cover.external.url;
      break;
    default:
      cover = "";
  }

  const properties = page.properties;

  return {
    id: page.id,
    author: {
      name: author?.name ?? "-",
      avatar: author?.avatar_url,
    },
    cover,
    title: properties.Name.title?.[0]?.plain_text ?? "",
    tags: properties.Tags.multi_select,
    description: properties.Description.rich_text?.[0]?.plain_text ?? "",
    date: properties.Created.created_time,
    slug: properties.Slug.formula.string,
  };
};

export const getBlogPageCount = function (allPosts: Array<any>) {
  let allPages = [0];
  allPosts.forEach(() => {
    const current = allPages.length - 1;
    const count = allPages?.[current];
    if (count < 9) {
      allPages[current] = count + 1;
    } else {
      allPages = [...allPages, 1];
    }
  });

  return allPages.length;
};
