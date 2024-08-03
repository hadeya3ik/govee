import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

export async function GET() {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/user");
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Error getting user' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
