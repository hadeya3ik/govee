import axios from 'axios';

export async function POST(request) {
  const { sku, device, value } = await request.json();

  if (!sku || !device || value === undefined) {
    return new Response('Missing required fields: sku, device, value', {
      status: 400
    });
  }

  try {
    const response = await axios.post("https://openapi.api.govee.com/router/api/v1/device/control", {
      requestId: 'uuid',
      payload: {
        sku,
        device,
        capability: {
          type: 'devices.capabilities.color_setting',
          instance: 'colorRgb',
          value
        }
      }
    }, {
      headers: {
        "Govee-API-Key": "bdbf0e09-31c3-465d-948b-2bc617b29da4",
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
    return new Response(JSON.stringify({ error: 'Error controlling device' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
