const express = require('express');
const bodyParser = require('body-parser');
const paymentsRouter = require('./routes/payments');
require('dotenv').config();

const webhooksRouter = require('./routes/webhooks');

// console.log(process.env.PAYPAL_CLIENT_ID);

const app = express();
app.use(bodyParser.json());
app.use('/api/payments', paymentsRouter);
app.use('/api/webhooks', webhooksRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
