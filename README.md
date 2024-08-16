
# Custom Govee Lights Controller
This repository contains a custom web application built with Next.js to control Govee smart lights. The application provides a more minimalistic interface.

## Features 
Minimal Govee Home API to control Govee smart light devices (bulbs, LED strips).

## Getting Started
in order to retrieve the user-assigned names of the devices, you can retrieve your Govee-API-Key as described [here](https://developer.govee.com/reference/apply-you-govee-api-key). 

1. Clone the repository
```bash
git clone https://github.com/hadeya3ik/govee.git
cd govee
```
2. Install dependencies:
```bash
npm install
```
3. Set up an Environment Variable:
In the root directory of the project, create a file named .env.local.
4. Add Your Environment Variable:
Open the .env.local file and add the necessary environment variables:
```bash
NEXT_PUBLIC_GOVEE_API_KEY=your-api-key-here
```
5. Run ther server
In the root directory run:
```bash
npm run dev
```
open [](http://localhost:3000) in your browser to see the application in action.

## References 
[https://developer.govee.com/docs/getting-started](https://developer.govee.com/docs/getting-started)
