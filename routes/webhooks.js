// routes/webhooks.js
const express = require('express');
const router = express.Router();

router.post('/webhook', async (req, res) => {
  const event = req.body;

  // Handle the webhook event
  switch (event.event_type) {
    case 'PAYMENT.CAPTURE.COMPLETED':
      // Handle payment capture completed
      break;
    // Handle other events as needed
    default:
      console.log(`Unhandled event type ${event.event_type}`);
  }

  res.sendStatus(200);
});

module.exports = router;
