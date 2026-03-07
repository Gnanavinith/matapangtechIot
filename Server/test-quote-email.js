import fetch from 'node-fetch';

const API_URL = 'http://localhost:5000/api/mail/contact';

async function testQuoteEmail() {
  console.log('🧪 Testing Quote Request Email...\n');

  const testData = {
    name: 'Test User',
    email: 'vinithvini775@gmail.com', // Test with admin email to verify both arrive
    phone: '+91 8248742297',
    service: 'Internet of Things',
    message: 'This is a test quote request to verify email functionality.'
  };

  try {
    console.log('Sending quote request...');
    console.log('Test data:', testData);
    console.log('');

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData),
    });

    const result = await response.json();
    
    if (response.ok && result.success) {
      console.log('✅ SUCCESS!');
      console.log('Response:', result);
      console.log('\n📧 Two emails should have been sent:');
      console.log('   1. To admin (vinithvini775@gmail.com) - Quote notification');
      console.log('   2. To user (vinithvini775@gmail.com) - Confirmation email');
      console.log('\n📬 Check your inbox (and spam folder) for both emails!');
    } else {
      console.log('❌ FAILED!');
      console.log('Response:', result);
    }
  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
  }
}

testQuoteEmail();
