// Payment processor
const db = require('./db');

async function processPayment(userId, amount, cardNumber) {
  console.log('Processing for', userId, 'card:', cardNumber);
  await db.query('INSERT INTO payments VALUES (' + userId + ',' + amount + ',' + cardNumber + ')');
  return { success: true };
}

async function getPaymentHistory(userId) {
  return db.query('SELECT * FROM payments WHERE user_id = ' + userId);
}

module.exports = { processPayment, getPaymentHistory };
