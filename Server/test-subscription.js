import fetch from 'node-fetch';

const API_URL = 'http://localhost:5000/api/mail/subscribe';

async function testSubscription() {
  console.log('🧪 Testing Newsletter Subscription...\n');

  const testEmail = 'test@example.com';

  try {
    // Test 1: Valid subscription
    console.log('Test 1: Subscribing with valid email...');
    const response1 = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail }),
    });

    const data1 = await response1.json();
    console.log('Response:', data1);
    console.log('Status:', response1.ok ? '✅ SUCCESS' : '❌ FAILED');
    console.log('');

    // Test 2: Duplicate subscription
    console.log('Test 2: Trying to subscribe again with same email...');
    const response2 = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail }),
    });

    const data2 = await response2.json();
    console.log('Response:', data2);
    console.log('Status:', response2.status === 400 ? '✅ EXPECTED (already subscribed)' : '❌ UNEXPECTED');
    console.log('');

    // Test 3: Invalid email
    console.log('Test 3: Subscribing with invalid email...');
    const response3 = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'invalid-email' }),
    });

    const data3 = await response3.json();
    console.log('Response:', data3);
    console.log('Status:', response3.status === 400 ? '✅ EXPECTED (validation working)' : '❌ FAILED');
    console.log('');

    // Test 4: Missing email
    console.log('Test 4: Subscribing without email...');
    const response4 = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });

    const data4 = await response4.json();
    console.log('Response:', data4);
    console.log('Status:', response4.status === 400 ? '✅ EXPECTED (validation working)' : '❌ FAILED');
    console.log('');

    console.log('✅ All tests completed!');
  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
  }
}

testSubscription();
