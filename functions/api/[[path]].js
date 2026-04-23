export async function onRequest(context) {
  const { request, env } = context;
  
  // 1. Get the Replit URL from your Dashboard
  const REPLIT_URL = env.REPLIT_BACKEND_URL;

  // 2. Take the incoming URL (e.g., https://your-site.com/api/generate)
  const url = new URL(request.url);
  
  // 3. Swap the domain and remove the '/api' prefix
  // This turns it into: https://your-replit.app/generate
  const proxyUrl = REPLIT_URL.replace(/\/$/, '') + url.pathname.replace('/api', '');
  
  // 4. Forward the request (method, body, headers) to Replit
  const backendRequest = new Request(proxyUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body,
    redirect: 'follow'
  });

  return await fetch(backendRequest);
}
