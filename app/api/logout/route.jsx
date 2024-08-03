import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

export async function POST(request) {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/logout');
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Error logging out' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

