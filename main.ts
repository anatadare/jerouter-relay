Deno.serve(async (req) => {
  const u = new URL(req.url);

  if (!u.pathname.startsWith("/v1/")) {
    return new Response("not found", { status: 404 });
  }

  const upstream = await fetch("https://je.jerouter.web.id" + u.pathname + u.search, {
    method: req.method,
    headers: {
      "content-type": req.headers.get("content-type") || "application/json",
      "authorization": req.headers.get("authorization") || ""
    },
    body: req.method === "GET" ? undefined : await req.text()
  });

  return new Response(upstream.body, {
    status: upstream.status,
    headers: { "content-type": upstream.headers.get("content-type") || "application/json" }
  });
});
