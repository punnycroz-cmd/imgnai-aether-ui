export async function onRequest(context) {
  const { request, env } = context;
  
  // 1. Get the Replit URL from your Cloudflare Secrets
  // We will add this secret in the next step
  const REPLIT_URL = env.REPLIT_BACKEND_URL;

  // 2. Figure out what the UI is asking for (e.g., /generate or /health)
  const url = new URL(request.url);
  const path = url.pathname.replace('/api', ''); // Removes '/api' from the start
  
  // 3. Build the new request to Replit
  const backendRequest = new Request(REPLIT_URL + path, request);
  
  // 4. Send it to Replit and return the result to the browser
  return await fetch(backendRequest);
}
