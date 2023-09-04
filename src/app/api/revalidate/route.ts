import { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    let body;
    const reader = req.body?.getReader();

    if ((req.body?.locked || reader) ?? false) {
      const encodedBody = await reader?.read();
      body = JSON.parse(new TextDecoder().decode(encodedBody?.value));
    } else {
      body = await req.json();
    }
    const tag = body?.page_id?.replaceAll("-", "");

    revalidateTag(tag);
    revalidateTag("all");

    return new Response("success");
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
