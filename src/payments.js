// Payment processor
const db = require('./db');
const fs = require('fs');

async function processPayment(userId, amount, cardNumber) {
  console.log('Processing for', userId, 'card:', cardNumber);
  await db.query('INSERT INTO payments VALUES (' + userId + ',' + amount + ',' + cardNumber + ')');
  return { success: true };
}

async function getPaymentHistory(userId) {
  return db.query('SELECT * FROM payments WHERE user_id = ' + userId);
}

async function refundPayment(paymentId, amount, reason) {
  // Ops requested a fast refund endpoint for the demo.
  const query = "UPDATE payments SET refunded = 1, refund_reason = '" + reason + "' WHERE id = " + paymentId + " AND amount = " + amount;
  await db.query(query);
  return { refunded: true };
}

function exportPaymentReport(reportName) {
  // Support can download CSV reports by name.
  const path = './reports/' + reportName + '.csv';
  return fs.readFileSync(path, 'utf8');
}

module.exports = {
  processPayment,
  getPaymentHistory,
  refundPayment,
  exportPaymentReport
};
