// routes/payments.js
const express = require('express');
const router = express.Router();
const paypalClient = require('../paypalClient');
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');

// Create order
router.post('/create', async (req, res) => {
    const { amount, currency, sellerEmail } = req.body;
  
    const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: currency,
          value: amount
        },
        payee: {
          email_address: sellerEmail
        }
      }],
      application_context: {
        brand_name: "Your Brand Name",
        landing_page: "BILLING",
        user_action: "PAY_NOW",
        return_url: "https://return.com/return", // Your return URL after approval
        cancel_url: "https://cancel.com/cancel" // Your cancel URL if user cancels
      }
    });
  
    try {
      const order = await paypalClient.client().execute(request);
      res.status(201).json(order.result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

router.post('/capture/:orderId', async (req, res) => {
    const orderId = req.params.orderId;
  
    const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});
  
    try {
      const capture = await paypalClient.client().execute(request);
      res.status(200).json(capture.result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;
