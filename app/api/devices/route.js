import axios from 'axios';
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export async function GET() {
  try {
    const response = await axios.get("https://openapi.api.govee.com/router/api/v1/user/devices", {
      headers: {
        "Govee-API-Key": apiKey,
        "Content-Type": 'application/json'
      }
    });
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Error getting device state' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
