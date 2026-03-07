// Quick script to add sample blog posts to the API
// Run this with: node add-sample-posts.js

const API_URL = 'http://localhost:5000/api';

async function createSamplePosts() {
  const samplePosts = [
    {
      title: "How IoT is Revolutionizing Industrial Maintenance",
      content: `Condition-based monitoring is changing the way factories operate, reducing downtime and costs. 

The Internet of Things (IoT) has emerged as a transformative technology in industrial settings, enabling real-time monitoring, predictive maintenance, and data-driven decision making.

Key Benefits:
- Reduced equipment downtime through predictive maintenance
- Lower maintenance costs by addressing issues before they become critical
- Improved operational efficiency through continuous monitoring
- Enhanced safety by detecting potential hazards early

IoT sensors collect data from machinery and equipment, analyzing patterns to predict when maintenance is needed. This proactive approach prevents unexpected breakdowns and extends equipment lifespan.

Industries adopting IoT-based maintenance report up to 30% reduction in maintenance costs and 45% decrease in downtime.`,
      author: "Admin",
      excerpt: "Condition-based monitoring is changing the way factories operate, reducing downtime and costs.",
      featuredImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
      category: "IoT",
      tags: ["IoT", "Industrial", "Maintenance", "Technology"],
      status: "published"
    },
    {
      title: "The Future of Smart Connectivity in 2026",
      content: `Exploring the next generation of IoT solutions and how they will shape the connected world.

As we advance into 2026, smart connectivity continues to evolve at an unprecedented pace. The convergence of 5G, AI, and IoT technologies is creating new possibilities for businesses and consumers alike.

Emerging Trends:
- Edge computing bringing processing closer to data sources
- AI-powered automation for smarter decision-making
- Enhanced security protocols for connected devices
- Seamless integration across different platforms

The future of connectivity lies in creating ecosystems where devices communicate seamlessly, sharing data and insights to optimize performance and user experience.

Experts predict that by 2027, there will be over 30 billion connected IoT devices worldwide, fundamentally transforming how we live and work.`,
      author: "Admin",
      excerpt: "Exploring the next generation of IoT solutions and how they will shape the connected world.",
      featuredImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
      category: "Technology",
      tags: ["Connectivity", "5G", "Smart Devices", "Future Tech"],
      status: "published"
    },
    {
      title: "Optimizing Utility Usage with Real-time Analytics",
      content: `Learn how data-driven decisions can boost operational efficiency in utility management.

Modern facilities are leveraging IoT sensors and advanced analytics to monitor and optimize their utility consumption in real-time, leading to significant cost savings and environmental benefits.

Implementation Strategies:
- Install smart meters for accurate consumption tracking
- Use IoT sensors to monitor energy, water, and gas usage
- Implement automated controls based on occupancy and demand
- Analyze historical data to identify optimization opportunities

Real-time analytics enable facility managers to:
- Detect anomalies and leaks immediately
- Adjust systems based on actual usage patterns
- Reduce waste through intelligent automation
- Meet sustainability goals with measurable results

Companies implementing these solutions report average savings of 20-30% on utility costs within the first year.`,
      author: "Admin",
      excerpt: "Learn how data-driven decisions can boost operational efficiency in utility management.",
      featuredImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
      category: "Energy",
      tags: ["Analytics", "Utilities", "Efficiency", "Sustainability"],
      status: "published"
    }
  ];

  console.log('Creating sample blog posts...\n');

  for (const post of samplePosts) {
    try {
      const response = await fetch(`${API_URL}/blog/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });

      const result = await response.json();
      
      if (result.success) {
        console.log(`✓ Created: "${post.title}"`);
      } else {
        console.log(`✗ Failed to create: "${post.title}"`);
        console.log('Error:', result.message);
      }
    } catch (error) {
      console.log(`✗ Error creating: "${post.title}"`);
      console.log('Error:', error.message);
    }
  }

  console.log('\nSample posts creation complete!');
  console.log(`\nView your blog at: http://localhost:5173/blog-grid`);
}

createSamplePosts();
