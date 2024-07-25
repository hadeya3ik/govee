import axios from 'axios';

export async function getDevices() {
  try {
    const response = await axios.get("/api/devices");
    return response.data;
  } catch (error) {
    if (error.response) {
      alert(`Error: ${error.response.status} - ${error.response.data.error}`);
    } else {
      alert('uh oh');
    }
    console.error(error);
  }
}


export async function setDeviceColor(sku, device, r, g, b) {
  if (device == "n/a" && sku == "n/a") {
    return
  }
  try {
    const req = await axios.post("/api/color", {
      sku, 
      device,
      value: ((r & 0xFF) << 16) | ((g & 0xFF) << 8) | ((b & 0xFF) << 0)
    });
    console.log('Response:', req.data);
  } catch (error) {
    if (error.response) {
      alert(`Error: ${error.response.status} - ${error.response.data}`);
    } else {
      alert('Error toggling the light');
    }
    console.error(error);
  }
}

  export async function getDeviceState(sku, device, value) {
    try {
      const req = await fetch('/api/state', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sku, device, value })
      });
  
      const data = await req.json();
  
      if (!req.ok) {
        throw new Error(data.error || 'Error toggling the light');
      }
  
      // console.log('Response:', data);
      return data.payload.capabilities;
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  }

export async function setDeviceLight(sku, device, value) {
  
  if (device == "n/a" && sku == "n/a") {
    return
  }
  
  try {
    const req = await fetch('/api/control', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sku, device, value })
    });

    const data = await req.json();

    if (!req.ok) {
      throw new Error(data.error || 'Error toggling the light');
    }

    console.log('Response:', data);
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
}

export async function setDeviceBrightness(sku, device, value) {
  if (device == "n/a" && sku == "n/a") {
    return
  }
  try {
    const req = await axios.post("/api/brightness", {
      sku, 
      device,
      value
    });
    console.log('Response:', req.data);
  } catch (error) {
    if (error.response) {
      alert(`Error: ${error.response.status} - ${error.response.data}`);
    } else {
      alert('Error toggling the light');
    }
    console.error(error);
  }
}

// export async function setDeviceBrightness(sku, device, value) {
//   try {
//     const req = await axios.post("http://localhost:8000/brightness", {
//       sku, 
//       device,
//       value
//     });
//     console.log('Response:', req.data);
//   } catch (error) { {
//       alert('Error toggling the light');
//     }
//     console.error(error);
//   }
// }

export async function setDeviceTemperature(sku, device, value) {
  if (device == "n/a" && sku == "n/a") {
    return
  }
  try {
    const req = await axios.post("/api/temp", {
      sku, 
      device,
      value
    });
    console.log('Response:', req.data);
  } catch (error) {
    if (error.response) {
      alert(`Error: ${error.response.status} - ${error.response.data}`);
    } else {
      alert('Error toggling the light');
    }
    console.error(error);
  }
}
