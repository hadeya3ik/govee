import axios from 'axios';

export async function POST(request) {
  const { sku, device, value } = await request.json();

  try {
    const response = await axios.post('https://openapi.api.govee.com/router/api/v1/device/control', {
      requestId: "uuid",
      payload: {
        sku,
        device,
        capability: {
          type: "devices.capabilities.on_off",
          instance: "powerSwitch",
          value
        }
      }
    }, {
      headers: {
        'Govee-API-Key': 'bdbf0e09-31c3-465d-948b-2bc617b29da4', // Replace with your actual API key
        'Content-Type': 'application/json'
      }
    });

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: error.response ? error.response.status : 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
