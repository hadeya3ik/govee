import axios from '@/utils/axiosConfig';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { username, password } = await request.json();
  
  if (!username || password === undefined) {
    return new Response('Missing required fields: username, password', {
      status: 400
    });
  }

  try {
    const response = await axios.post('http://127.0.0.1:8000/api/login/', {
      username,
      password,
    });
    return new Response("yay", {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.response.data }), {
      status: error.response.status,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
