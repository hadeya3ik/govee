import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

export async function POST(request) {
  const { email, username, password } = await request.json();

  if (!email || !password === undefined) {
    return new Response('Missing required fields: email, password', {
      status: 400
    });
  }

  try {
    const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email, 
        username, 
        password
    });
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Error logging in' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

