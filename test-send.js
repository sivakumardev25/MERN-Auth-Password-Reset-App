// Diagnostic script to test email sending
require('dotenv').config({ path: './backend/.env' });
const sendEmail = require('./backend/utils/sendEmail');

const TO = process.env.TEST_EMAIL || process.env.EMAIL_USER;
const LINK = process.env.TEST_LINK || 'https://example.com/reset/TEST_TOKEN';

(async () => {
  try {
    const info = await sendEmail(TO, LINK);
    console.log('SEND OK:', info && info.messageId ? info.messageId : info);
    process.exit(0);
  } catch (err) {
    console.error('SEND FAILED:', err && err.message ? err.message : err);
    process.exit(1);
  }
})();
