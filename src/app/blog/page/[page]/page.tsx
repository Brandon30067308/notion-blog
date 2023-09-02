import { getAllBlogPosts } from "@/lib/notion/getAllBlogPosts";
import getSingleBlogPost from "@/lib/notion/getSingleBlogPost";
import { getBlogPageCount } from "@/lib/blogHelpers";
import getBlogPosts from "@/lib/notion/getBlogPosts";
import BlogPostCard from "@/components/BlogPostCard";
import Newsletter from "@/components/Newsletter";
import BlogPagniation from "./BlogPagination";
import { Sema } from "async-sema";
import { notFound } from "next/navigation";
import { unstable_cache } from "next/cache";

export default async function BlogPage({
  params,
}: {
  params: { page: string };
}) {
  const page = parseInt(params.page);
  const allPosts = await getAllBlogPosts();
  const pageCount = await getBlogPageCount(allPosts);
  const startCursor = allPosts.find((_, i) => i === (page - 1) * 9)?.id;

  const pageBlogPosts = await unstable_cache(
    async () => {
      const posts = await getBlogPosts(startCursor);
      return posts;
    },
    [`page-${page}`],
    { revalidate: 300, tags: [`page-${page}`] }
  )();

  if (!pageBlogPosts?.length) return notFound();

  const sema = new Sema(5, { capacity: allPosts.length });
  const allPostsWithExcerpt = await Promise.all(
    pageBlogPosts.map(async (post) => {
      sema.acquire();
      const { markdown } = await getSingleBlogPost(post.slug);
      sema.release();
      const excerpt = markdown
        .split(/(\n)+/)
        .filter((block) => !!block && block !== "\n")?.[0];
      return { ...post, excerpt };
    })
  );

  return (
    <div className="w-full h-full min-h-screen flex flex-col justify-between">
      {/* content */}
      <section className="w-full py-16">
        <div className="container flex flex-col justify-center items-center">
          {/* header */}
          <div className="w-full mb-16">
            <h1 className="mb-6 font-bold text-center">
              👋 Welcome to our blog
            </h1>
            <p className="text-base sm:text-[18px] text-gray-500 text-center">
              A place where fitness and inspirations flows and expands
            </p>
          </div>

          {/* posts */}
          <div className="w-full mb-10">
            <h2 className="mb-6 font-bold">Recent Posts</h2>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {allPostsWithExcerpt.map((post, i) => {
                return <BlogPostCard key={i} blogPost={post} />;
              })}
            </div>
          </div>

          {/* pagination */}
          <div className="w-full flex items-center justify-center">
            <BlogPagniation currentPage={page} totalPages={pageCount} />
          </div>
        </div>
      </section>

      {/* newsletter */}
      <section className="w-full self-end mb-20 sm:mb-24">
        <div className="container">
          <Newsletter />
        </div>
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  const allPosts = await getAllBlogPosts();
  const postsCount = getBlogPageCount(allPosts);

  const params = new Array(postsCount)
    .fill(null)
    .map((_, i) => ({ page: (i + 1).toString() }));
  return params;
}
