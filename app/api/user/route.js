import axios from '@/utils/axiosConfig';

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
    const status = error.response ? error.response.status : 500;
    const message = error.response ? error.response.data : 'Server error';
    return new Response(JSON.stringify({ error: message }), {
      status: status,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
