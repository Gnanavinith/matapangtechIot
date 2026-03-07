// Test script to check quote request endpoint
const API_URL = 'http://localhost:5000/api';

async function testQuoteRequest() {
  console.log('Testing quote request...\n');
  
  try {
    const response = await fetch(`${API_URL}/mail/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        phone: '+91 9876543210',
        service: 'Internet of Things',
        message: 'This is a test quote request'
      }),
    });
    
    const result = await response.json();
    console.log('Response:', result);
    
    if (result.success) {
      console.log('✅ Email sent successfully!');
    } else {
      console.log('❌ Failed to send email:', result.message);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\nMake sure your backend server is running on http://localhost:5000');
  }
}

testQuoteRequest();
