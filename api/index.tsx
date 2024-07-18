import axios from 'axios';

export async function colorSaturation(sku, device, r, g, b) {
    try {
      const req = await axios.post("http://localhost:8000/color", {
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

export async function toggleLight(sku, device, value) {
    try {
      const req = await axios.post("http://localhost:8000/control", {
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
  
export async function setBrightness(sku, device, value) {
    try {
      const req = await axios.post("http://localhost:8000/brightness", {
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

export async function colorTemprature(sku, device, value) {
    try {
      const req = await axios.post("http://localhost:8000/temp", {
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
  