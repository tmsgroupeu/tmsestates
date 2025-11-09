import { headers } from "next/headers";

async function fetchVipForDebug(): Promise<string> {
  const API_URL = process.env.STRAPI_API_URL || process.env.NEXT_PUBLIC_API_URL;
  
  if (!API_URL) {
    return "CRITICAL ERROR: The API URL environment variable is not set on Vercel. Please check STRAPI_API_URL and NEXT_PUBLIC_API_URL.";
  }

  const params = new URLSearchParams({
    "filters[vip][$eq]": "true",
    "populate": "*",
    sort: "updatedAt:desc",
  });

  const fetchUrl = `${API_URL}/api/properties?${params.toString()}`;

  try {
    // Fetch the data, ensuring no cache is used.
    const res = await fetch(fetchUrl, { cache: 'no-store' });
    // Get the raw text of the response to prevent JSON parsing errors.
    const responseBody = await res.text();

    // Create a detailed report of everything we received from the API call.
    const report = {
      step: "FETCH_ATTEMPT_COMPLETE",
      message: "This is the raw data received by the Vercel server from the Strapi API.",
      url_we_fetched: fetchUrl,
      response_status_code: res.status,
      response_status_text: res.statusText,
      // Attempt to parse the body as JSON for easier reading, but fall back to raw text if it fails.
      response_body: (() => {
        try { return JSON.parse(responseBody); }
        catch { return responseBody; }
      })()
    };

    // Return the full report as a nicely formatted string.
    return JSON.stringify(report, null, 2);

  } catch (error: unknown) {
    const err = error as Error;
    // If the fetch itself failed (e.g., network error), create an error report.
    const errorReport = {
      step: "FETCH_ATTEMPT_FAILED",
      message: "A critical exception occurred during the fetch operation. This is likely a network or DNS issue.",
      error_name: err.name,
      error_message: err.message,
      error_stack: err.stack,
    };
    return JSON.stringify(errorReport, null, 2);
  }
}

// This component will ALWAYS render, showing us the debug information.
export default async function ExclusiveMandates() {
  headers(); // Ensures the component is re-rendered on every request.
  const debugInfo = await fetchVipForDebug();

  return (
    <div style={{
      margin: '20px auto',
      padding: '20px',
      border: '3px solid #FFD700', // Gold border
      backgroundColor: '#1A1A1A',
      color: '#F0F0F0',
      fontFamily: 'monospace',
      fontSize: '14px',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-all',
      maxWidth: '1200px',
      lineHeight: '1.6'
    }}>
      <h2 style={{ fontSize: '20px', color: 'white', borderBottom: '1px solid #555', paddingBottom: '10px' }}>
        Exclusive Mandates - Live Debug Output
      </h2>
      <p style={{ color: '#aaa' }}>
        This box is rendering the direct output from the Vercel server's API call.
      </p>
      <pre>
        {debugInfo}
      </pre>
    </div>
  );
}
