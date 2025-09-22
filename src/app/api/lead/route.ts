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
      JSON.stringify({ ok: true, message: "[Copy_Breve_89]" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch {
    return new Response(
      JSON.stringify({ ok: false, message: "[Copy_Breve_90]" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
