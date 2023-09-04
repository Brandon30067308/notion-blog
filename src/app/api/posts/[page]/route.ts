import { getAllBlogPosts } from "@/lib/notion/getAllBlogPosts";
import getBlogPosts from "@/lib/notion/getBlogPosts";

export async function GET(
  req: Request,
  { params }: { params: { page: string } }
) {
  try {
    const page = parseInt(params.page);
    const allPosts = await getAllBlogPosts();
    const startCursor = allPosts.find((_, i) => i === (page - 1) * 9)?.id;

    const data = await getBlogPosts(startCursor);

    if (!data) {
      return new Response(
        JSON.stringify({ message: "Failed to fetch blog posts" }),
        {
          status: 500,
        }
      );
    }

    return new Response(JSON.stringify({ posts: data }), {
      status: 200,
    });
  } catch (err: any) {
    console.log("error: ", err.message);
    return new Response(
      JSON.stringify({ message: err?.message ?? "An error occurred" }),
      {
        status: 500,
      }
    );
  }
}
