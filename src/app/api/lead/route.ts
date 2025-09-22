export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body?.preferences) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (body?.honeypot) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ ok: true, message: "Thanks for reaching out. Our agronomy desk will reply within one business day." }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch {
    return new Response(
      JSON.stringify({ ok: false, message: "We couldn't submit your request. Please try again in a moment." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
