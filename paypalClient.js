// paypalClient.js
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');

// Create PayPal environment
function environment() {
  let clientId = process.env.PAYPAL_CLIENT_ID;
  let clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  console.log(clientId);

  return new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
}

// Returns PayPal HTTP client instance with environment
function client() {
  return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
}

module.exports = { client };
