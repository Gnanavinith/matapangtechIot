// In-memory storage for users (replace with database in production)
let users = [];
let nextId = 1;

// Admin credentials - loaded from environment variable
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '123456';

// Get all users
export const getAllUsers = () => {
  return users;
};

// Get user by email
export const getUserByEmail = (email) => {
  return users.find(user => user.email === email);
};

// Get user by ID
export const getUserById = (id) => {
  return users.find(user => user.id === parseInt(id));
};

// Create new user
export const createUser = (userData) => {
  // Check if admin credentials are being used
  if (userData.email === ADMIN_EMAIL) {
    const adminUser = {
      id: nextId++,
      name: userData.name || 'Admin',
      email: userData.email,
      password: userData.password,
      isAdmin: true,
      createdAt: new Date().toISOString(),
    };
    users.push(adminUser);
    return adminUser;
  }

  const newUser = {
    id: nextId++,
    name: userData.name,
    email: userData.email,
    password: userData.password,
    isAdmin: false,
    createdAt: new Date().toISOString(),
  };
  
  users.push(newUser);
  return newUser;
};

// Authenticate user
export const authenticateUser = (email, password) => {
  // Check admin credentials
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    let adminUser = getUserByEmail(ADMIN_EMAIL);
    if (!adminUser) {
      adminUser = {
        id: nextId++,
        name: 'Admin',
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        isAdmin: true,
        createdAt: new Date().toISOString(),
      };
      users.push(adminUser);
    }
    return adminUser;
  }

  // Check regular users
  const user = getUserByEmail(email);
  if (user && user.password === password && !user.isAdmin) {
    return user;
  }

  return null;
};

// Update user
export const updateUser = (id, userData) => {
  const userIndex = users.findIndex(user => user.id === parseInt(id));
  
  if (userIndex === -1) {
    return null;
  }
  
  const updatedUser = {
    ...users[userIndex],
    ...userData,
    id: users[userIndex].id,
    createdAt: users[userIndex].createdAt,
  };
  
  users[userIndex] = updatedUser;
  return updatedUser;
};

// Delete user
export const deleteUser = (id) => {
  const userIndex = users.findIndex(user => user.id === parseInt(id));
  
  if (userIndex === -1) {
    return false;
  }
  
  users.splice(userIndex, 1);
  return true;
};

export default {
  getAllUsers,
  getUserByEmail,
  getUserById,
  createUser,
  authenticateUser,
  updateUser,
  deleteUser,
};
