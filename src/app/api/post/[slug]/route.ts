import getSingleBlogPost from "@/lib/notion/getSingleBlogPost";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const postData = await getSingleBlogPost(params.slug);

    if (!postData) {
      return new Response(JSON.stringify({ message: "Blog post not found!" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ ...postData }), {
      status: 200,
    });
  } catch (err: any) {
    console.log("an error occurred: ", err.message);
    return new Response(
      JSON.stringify({ message: err?.message ?? "An error occurred" }),
      {
        status: 500,
      }
    );
  }
}
