import axios from '@/utils/axiosConfig';
import { NextResponse } from 'next/server';
export async function POST(request) {
  const { email, password } = await request.json();
  
  if (!email || !password === undefined) {
    return new Response('Missing required fields: email, password', {
      status: 400
    });
  }
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/login', {
      email,
      password,
    }, {
      withCredentials: true
    });

    // Extract Set-Cookie headers from the Django response
    const setCookieHeader = response.headers['set-cookie'];

    // Create a new response and set the cookies
    const res = new NextResponse(JSON.stringify(response.data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (setCookieHeader) {
      setCookieHeader.forEach(cookie => {
        res.headers.append('Set-Cookie', cookie);
      });
    }

    return res;
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.response.data }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
