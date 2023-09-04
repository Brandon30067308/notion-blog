import { BlogPost } from "@/types/schema";
import getBlogPosts from "@/lib/notion/getBlogPosts";
import getSingleBlogPost from "@/lib/notion/getSingleBlogPost";
import Newsletter from "@/components/Newsletter";
import BlogBreadCrumb from "./BlogBreadCrumb";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import clsx from "clsx";
import { User2 } from "lucide-react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { unstable_cache } from "next/cache";

export default async function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const postSlug = params.slug;
  const postId = postSlug.split("-").pop() ?? "";
  const postData: { post: BlogPost; markdown: string } | null =
    await unstable_cache(
      async () => {
        return await getSingleBlogPost(postSlug);
      },
      [postSlug],
      { revalidate: 300, tags: [postId] }
    )();

  if (!postData) {
    return notFound();
  }

  const { markdown, post } = postData;
  const { author, title, slug, date, cover } = post;
  const { name: authorName, avatar: authorAvatar } = author;
  const postDate = new Date(date).toLocaleDateString("en-us", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <>
      <div className="w-full h-full min-h-screen flex flex-col justify-between">
        <section className="w-full py-16">
          <div className="container flex flex-col justify-center">
            {/* bread crumb */}
            <div className="w-full mb-12">
              <BlogBreadCrumb postLink={`/blog/${slug}`} postTitle={title} />
            </div>

            {/* heading */}
            <h1 className="mb-6 font-bold text-[40px]">{title}</h1>

            {/* info */}
            <div className="w-full flex justify-between items-center mb-10">
              <div className="flex items-center">
                {authorAvatar ? (
                  <div className="w-[34px] h-[34px] flex items-end justify-center bg-gray-200/80 rounded-full overflow-hidden mr-4">
                    <Image
                      src={authorAvatar}
                      alt={authorName}
                      width={34}
                      height={34}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-[34px] h-[34px] flex items-end justify-center bg-gray-200/80 border border-gray-500/50 rounded-full overflow-hidden mr-4">
                    <User2 className="w-6 h-6 text-gray-500/50" />
                  </div>
                )}
                <p className="text-base text-gray-500">{authorName}</p>
              </div>

              <p className="text-base text-gray-500">{postDate}</p>
            </div>

            {/* content */}
            <div className="w-full flex flex-col">
              {cover && (
                <div className="w-full mb-8">
                  <Image
                    src={cover}
                    alt={title}
                    width={1136}
                    height={542}
                    className="w-full h-auto"
                  />
                </div>
              )}

              <article
                className={clsx(
                  "w-full prose-md prose prose-base prose-stone text-base text-gray-700 prose-p:leading-normal prose-headings:text-gray-900 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-hr:my-8",
                  "prose-blockquote:pl-4 prose-blockquote:border-l-2 prose-blockquote:border-slate-900 prose-blockquote:not-italic prose-blockquote:font-normal prose-blockquote:text-inherit",
                  "before:prose-p:content-[''] after:prose-p:content-['']"
                )}
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {markdown}
                </ReactMarkdown>
              </article>
            </div>
          </div>
        </section>
        <section className="w-full self-end mb-20 sm:mb-24">
          <div className="container">
            <Newsletter />
          </div>
        </section>
      </div>
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const blogPost = await getSingleBlogPost(params.slug);
  const description = blogPost?.post?.description;
  const title = blogPost?.post?.title;

  return {
    title: `${title ? `${title} | ` : ""}Doodle Blog`,
    description: description ?? "Doodle Blog",
  };
}

export async function generateStaticParams() {
  const allPosts = await getBlogPosts();
  return allPosts.map(({ slug }) => ({ slug }));
}
