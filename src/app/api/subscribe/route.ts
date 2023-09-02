export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return new Response(JSON.stringify({ message: "Email is required" }), {
        status: 400,
      });
    }

    const apiUrl = `https://a.klaviyo.com/api/v2/list/${process.env.KLAVIYO_LIST_ID}/subscribe?api_key=${process.env.KLAVIYO_PRIVATE_KEY}`;
    const res = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify({
        profiles: [{ email }],
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.ok) {
      return new Response(
        JSON.stringify({
          message: "You have been subscribed successfully!",
          success: true,
        }),
        {
          status: 201,
        }
      );
    } else {
      throw new Error(data?.detail ?? "An error occurred");
    }
  } catch (err: any) {
    console.log("error: ", err.message);
    return new Response(
      JSON.stringify({
        message: err?.message ?? "An error occurred",
        success: false,
      }),
      {
        status: 500,
      }
    );
  }
}
