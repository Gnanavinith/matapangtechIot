// Test API Endpoints
// You can run this file with: node test-api.js

const API_URL = 'http://localhost:5000/api';

// Helper function to make API calls
async function apiCall(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    const data = await response.json();
    console.log(`\n${options.method || 'GET'} ${endpoint}`);
    console.log('Response:', JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error(`Error calling ${endpoint}:`, error.message);
  }
}

// Test Blog API
async function testBlogAPI() {
  console.log('=== Testing Blog API ===\n');

  // 1. Create a new post
  const newPost = await apiCall('/blog/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: 'Getting Started with IoT',
      content: 'Internet of Things (IoT) is revolutionizing the way we interact with technology...',
      author: 'Admin',
      excerpt: 'Learn about IoT basics',
      category: 'Technology',
      tags: ['IoT', 'Technology', 'Smart Devices'],
      status: 'published',
    }),
  });

  // 2. Get all posts
  await apiCall('/blog/posts');

  // 3. Get published posts
  await apiCall('/blog/posts/published');

  // 4. Get single post (if created)
  if (newPost && newPost.data && newPost.data.id) {
    await apiCall(`/blog/posts/${newPost.data.id}`);

    // 5. Update the post
    await apiCall(`/blog/posts/${newPost.data.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: 'Updated: Getting Started with IoT',
        content: 'Updated content here...',
      }),
    });

    // 6. Delete the post
    await apiCall(`/blog/posts/${newPost.data.id}`, {
      method: 'DELETE',
    });
  }
}

// Test Mail API
async function testMailAPI() {
  console.log('\n=== Testing Mail API ===\n');

  // Test send email
  await apiCall('/mail/send', {
    method: 'POST',
    body: JSON.stringify({
      to: 'recipient@example.com',
      subject: 'Test Email from IoT Web',
      text: 'This is a test email sent from the IoT Web application.',
      html: '<h1>Test Email</h1><p>This is a <strong>test email</strong> sent from the IoT Web application.</p>',
    }),
  });

  // Test contact form
  await apiCall('/mail/contact', {
    method: 'POST',
    body: JSON.stringify({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      message: 'This is a test contact form submission.',
    }),
  });
}

// Run tests
console.log('Starting API Tests...\n');
console.log('Server URL:', API_URL);
console.log('==========================================');

// Uncomment to run tests
// testBlogAPI();
// testMailAPI();

console.log('\nTo run the tests, uncomment the function calls at the bottom of the file.');
console.log('Then run: node test-api.js');
