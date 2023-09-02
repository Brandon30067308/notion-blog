import BlogPostCard from "@/components/BlogPostCard";
import Newsletter from "@/components/Newsletter";
import getBlogPosts from "@/lib/notion/getBlogPosts";
import getSingleBlogPost from "@/lib/notion/getSingleBlogPost";
import { Sema } from "async-sema";

export default async function Blog() {
  const allPosts = await getBlogPosts();

  const sema = new Sema(5, { capacity: allPosts.length });
  const allPostsWithExcerpt = await Promise.all(
    allPosts.map(async (post) => {
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
          <div className="w-full">
            <h2 className="mb-6 font-bold">Recent Posts</h2>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allPostsWithExcerpt.map((post, i) => {
                return <BlogPostCard key={i} blogPost={post} />;
              })}
            </div>
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
