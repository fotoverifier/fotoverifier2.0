import { NextRequest } from 'next/server';

async function forwardRequest(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> },
  method: string
) {
  const { path } = await context.params; // 👈 must await
  const backendUrl = process.env.BACKEND_URL;
  if (!backendUrl) {
    return new Response('Backend URL not configured', { status: 500 });
  }

  const url = `${backendUrl}/${path.join('/')}${req.nextUrl.search}`;

  const headers = new Headers(req.headers);

  let body: BodyInit | undefined;
  if (method !== 'GET' && method !== 'HEAD') {
    body = await req.blob();
  }

  let res = await fetch(url, { method, headers, body, redirect: 'manual' });
  if (res.status === 307) {
    const retryUrl = `${backendUrl}/${path.join('/')}/${req.nextUrl.search}`;
    res = await fetch(retryUrl, { method, headers, body, redirect: 'manual' });
  }
  return new Response(res.body, { status: res.status, headers: res.headers });
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return forwardRequest(req, context, 'GET');
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return forwardRequest(req, context, 'POST');
}
