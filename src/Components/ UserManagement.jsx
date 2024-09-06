import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaTrash, FaEdit, FaMoon, FaSun } from 'react-icons/fa';

const UserManagement = () => {
  const [users, setUsers] = useState([]); //state stores the list of users fetched from the API. Initially,
  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '' });
  const [editingUser, setEditingUser] = useState(null);
  const [errors, setErrors] = useState({});
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
 
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };
 

   const handleSubmit = (e) => {
    e.preventDefault();
    // if (validateForm()) {
      if (editingUser) {
        setUsers(users.map(user => user.id === editingUser.id ? { ...user, ...newUser } : user));
        setEditingUser(null);
      } else {
        setUsers([...users, { ...newUser, id: Date.now() }]);
      }
      setNewUser({ name: '', email: '', phone: '' });
    // }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setNewUser({ name: user.name, email: user.email, phone: user.phone });
  };

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <div className={`min-h-screen p-8 transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">User Management</h1>

             <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-white'}`}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          </div>
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="name" className="block mb-1">Name</label>
                <div className="relative">
                  <input type="text" id="name" name="name" value={newUser.name} onChange={handleInputChange}
                    className={`w-full p-2 pl-10 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'} ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                    placeholder="Enter name"
                  />
                  <FaUser className="absolute left-3 top-3 text-gray-400" />
                </div>
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>

                <label htmlFor="email" className="block mb-1">Email</label>
                <div className="relative">
           <input type="email"id="email" name="email" value={newUser.email} onChange={handleInputChange}
                    className={`w-full p-2 pl-10 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'} ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                    placeholder="Enter email"
                  />
                  <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="block mb-1">Phone</label>
                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={newUser.phone}
                    onChange={handleInputChange}
                    className={`w-full p-2 pl-10 border rounded ${errors.phone ? 'border-red-500' : 'border-gray-300'} ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                    placeholder="Enter phone"
                  />
                  <FaPhone className="absolute left-3 top-3 text-gray-400" />
                </div>
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>
            <button
              type="submit"
              className={`mt-4 px-4 py-2 rounded ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors duration-300`}
            >
              {editingUser ? 'Update User' : 'Add User'}
            </button>
          </form>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map(user => (
              <div key={user.id} className={`p-4 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-1">{user.email}</p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{user.phone}</p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="p-2 rounded bg-yellow-500 text-white hover:bg-yellow-600 transition-colors duration-300"
                    aria-label="Edit user"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="p-2 rounded bg-red-500 text-white hover:bg-red-600 transition-colors duration-300"
                    aria-label="Delete user"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserManagement;