// In-memory storage for blog posts (replace with database in production)
let blogPosts = [];
let nextId = 1;

// Get all blog posts
export const getAllPosts = () => {
  return blogPosts;
};

// Get blog post by ID
export const getPostById = (id) => {
  return blogPosts.find(post => post.id === parseInt(id));
};

// Create new blog post
export const createPost = (postData) => {
  const newPost = {
    id: nextId++,
    title: postData.title,
    content: postData.content,
    author: postData.author || 'Admin',
    excerpt: postData.excerpt || '',
    featuredImage: postData.featuredImage || '',
    category: postData.category || 'General',
    tags: postData.tags || [],
    status: postData.status || 'draft', // draft, published
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  blogPosts.push(newPost);
  return newPost;
};

// Update blog post
export const updatePost = (id, postData) => {
  const postIndex = blogPosts.findIndex(post => post.id === parseInt(id));
  
  if (postIndex === -1) {
    return null;
  }
  
  const updatedPost = {
    ...blogPosts[postIndex],
    ...postData,
    id: blogPosts[postIndex].id,
    createdAt: blogPosts[postIndex].createdAt,
    updatedAt: new Date().toISOString(),
  };
  
  blogPosts[postIndex] = updatedPost;
  return updatedPost;
};

// Delete blog post
export const deletePost = (id) => {
  const postIndex = blogPosts.findIndex(post => post.id === parseInt(id));
  
  if (postIndex === -1) {
    return false;
  }
  
  blogPosts.splice(postIndex, 1);
  return true;
};

// Get published posts only
export const getPublishedPosts = () => {
  return blogPosts.filter(post => post.status === 'published');
};

export default {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getPublishedPosts,
};
