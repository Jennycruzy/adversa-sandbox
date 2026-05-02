// Minimal API server used by the sandbox demo.

const express = require('express');
const { rateLimit } = require('./rateLimit');
const { loginUser, getUserData } = require('./auth');
const { processPayment, getPaymentHistory } = require('./payments');

const app = express();

app.use(express.json());
app.use('/api', rateLimit);

app.post('/api/login', async (req, res) => {
  const result = await loginUser(req.body.username, req.body.password);
  if (!result) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }
  res.json(result);
});

app.get('/api/users/:userId', async (req, res) => {
  const user = await getUserData(req.params.userId);
  res.json(user);
});

app.post('/api/payments', async (req, res) => {
  const result = await processPayment(req.body.userId, req.body.amount, req.body.cardNumber);
  res.json(result);
});

app.get('/api/users/:userId/payments', async (req, res) => {
  const payments = await getPaymentHistory(req.params.userId);
  res.json(payments);
});

module.exports = { app };

if (require.main === module) {
  const port = Number(process.env.PORT || 3000);
  app.listen(port, () => {
    console.log(`Sandbox API listening on port ${port}`);
  });
}
