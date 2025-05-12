import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    profile: {
      firstName: '',
      lastName: '',
      fullName: '', // Added fullName field
      phone: '',
      location: '',
      title: 'Job Seeker',
      professionalSummary: '',
      skills: ''
    }
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateForm = () => {
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (isSignUp) {
      if (!formData.username) {
        newErrors.username = 'Username is required';
      } else if (formData.username.length < 3) {
        newErrors.username = 'Username must be at least 3 characters';
      } else if (formData.username.length > 20) {
        newErrors.username = 'Username must not exceed 20 characters';
      }
      
      if (!formData.profile.firstName) {
        newErrors.firstName = 'First name is required';
      }
      
      if (!formData.profile.lastName) {
        newErrors.lastName = 'Last name is required';
      }
      
      if (!formData.profile.phone) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^[0-9+\-\s()]{10,15}$/.test(formData.profile.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
      
      if (!formData.profile.location) {
        newErrors.location = 'Location is required';
      }
      
      if (!formData.profile.title) {
        newErrors.title = 'Professional title is required';
      }
      
      if (!formData.profile.professionalSummary) {
        newErrors.professionalSummary = 'Professional summary is required';
      }
      
      if (!formData.profile.skills) {
        newErrors.skills = 'Skills are required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      
      // Special handling for firstName and lastName to update fullName
      if (child === 'firstName' || child === 'lastName') {
        const updatedProfile = {
          ...formData[parent],
          [child]: value
        };
        
        // Update fullName whenever firstName or lastName changes
        const newFirstName = child === 'firstName' ? value : formData.profile.firstName;
        const newLastName = child === 'lastName' ? value : formData.profile.lastName;
        updatedProfile.fullName = `${newFirstName} ${newLastName}`.trim();
        
        setFormData(prev => ({
          ...prev,
          [parent]: updatedProfile
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true);
      try {
        const url = isSignUp
          ? 'http://localhost:3000/auth/signup'
          : 'http://localhost:3000/auth/login';

        // Process skills as an array if provided
        const dataToSend = { ...formData };
        
        if (isSignUp) {
          // Ensure fullName is set correctly
          dataToSend.profile.fullName = `${formData.profile.firstName} ${formData.profile.lastName}`.trim();
          
          // Process skills
          if (formData.profile.skills) {
            dataToSend.profile.skills = formData.profile.skills
              .split(',')
              .map(skill => skill.trim())
              .filter(skill => skill);
          }
        }

        console.log('Data being sent to server:', dataToSend);
        const response = await axios.post(url, dataToSend);

        console.log('Server response:', response.data);

        if (response.data.token) {
          // Save token to localStorage
          localStorage.setItem('token', response.data.token);
          
          // Log the user in with the returned user data
          if (response.data.user) {
            // Make sure user data has fullName
            if (response.data.user.profile && !response.data.user.profile.fullName && 
                response.data.user.profile.firstName && response.data.user.profile.lastName) {
              response.data.user.profile.fullName = 
                `${response.data.user.profile.firstName} ${response.data.user.profile.lastName}`;
            }
            
            // Store the user data in context
            login(response.data.user);
            
            // Navigate to profile page
            navigate('/profile');
          } else {
            alert('Authentication successful but no user data received');
          }
        } else {
          alert('Authentication failed. Please try again.');
        }

        setErrors({});
      } catch (error) {
        console.error('Error:', error);
        if (error.response) {
          alert(error.response.data.message || 'Server error');
        } else {
          alert('Failed to connect to server.');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      username: '',
      email: '',
      password: '',
      profile: {
        firstName: '',
        lastName: '',
        fullName: '',
        phone: '',
        location: '',
        title: 'Job Seeker',
        professionalSummary: '',
        skills: ''
      }
    });
    setErrors({});
  };

  // Function to render required field marker
  const requiredField = () => (
    <span className="text-red-500 ml-1">*</span>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-2 mt-2">
      <div className="bg-white shadow-md rounded-lg w-full max-w-lg p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-gray-600 mt-2">
            {isSignUp ? 'Sign up to get started' : 'Please enter your credentials'}
          </p>
          {isSignUp && (
            <p className="text-red-500 text-sm mt-2">
              All fields are required
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isSignUp ? (
            // Login form fields
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email {requiredField()}
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-red-600'
                  }`}
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password {requiredField()}
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password (min 8 characters)"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.password ? 'border-red-500 focus:ring-red-500' : 'focus:ring-red-600'
                  }`}
                  required
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
            </>
          ) : (
            // Sign up form fields
            <>
              {/* Account Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Account Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username {requiredField()}
                  </label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.username ? 'border-red-500 focus:ring-red-500' : 'focus:ring-red-600'
                    }`}
                    required
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                  )}
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email {requiredField()}
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-red-600'
                    }`}
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password {requiredField()}
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password (min 8 characters)"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.password ? 'border-red-500 focus:ring-red-500' : 'focus:ring-red-600'
                    }`}
                    required
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                  )}
                </div>
              </div>
              
              {/* Personal Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Personal Information</h3>
                
                <div className="flex flex-wrap -mx-2">
                  <div className="w-full md:w-1/2 px-2 mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name {requiredField()}
                    </label>
                    <input
                      type="text"
                      name="profile.firstName"
                      placeholder="First Name"
                      value={formData.profile.firstName}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                        errors.firstName ? 'border-red-500 focus:ring-red-500' : 'focus:ring-red-600'
                      }`}
                      required
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  
                  <div className="w-full md:w-1/2 px-2 mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name {requiredField()}
                    </label>
                    <input
                      type="text"
                      name="profile.lastName"
                      placeholder="Last Name"
                      value={formData.profile.lastName}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                        errors.lastName ? 'border-red-500 focus:ring-red-500' : 'focus:ring-red-600'
                      }`}
                      required
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                    )}
                  </div>
                  
                  <div className="w-full md:w-1/2 px-2 mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone {requiredField()}
                    </label>
                    <input
                      type="text"
                      name="profile.phone"
                      placeholder="Phone Number"
                      value={formData.profile.phone}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                        errors.phone ? 'border-red-500 focus:ring-red-500' : 'focus:ring-red-600'
                      }`}
                      required
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                  
                  <div className="w-full md:w-1/2 px-2 mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location {requiredField()}
                    </label>
                    <input
                      type="text"
                      name="profile.location"
                      placeholder="City, State"
                      value={formData.profile.location}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                        errors.location ? 'border-red-500 focus:ring-red-500' : 'focus:ring-red-600'
                      }`}
                      required
                    />
                    {errors.location && (
                      <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Professional Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Professional Information</h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Professional Title {requiredField()}
                  </label>
                  <input
                    type="text"
                    name="profile.title"
                    placeholder="e.g. Frontend Developer"
                    value={formData.profile.title}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.title ? 'border-red-500 focus:ring-red-500' : 'focus:ring-red-600'
                    }`}
                    required
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Professional Summary {requiredField()}
                  </label>
                  <textarea
                    name="profile.professionalSummary"
                    placeholder="Write a brief summary of your professional background"
                    value={formData.profile.professionalSummary}
                    onChange={handleChange}
                    rows="3"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.professionalSummary ? 'border-red-500 focus:ring-red-500' : 'focus:ring-red-600'
                    }`}
                    required
                  />
                  {errors.professionalSummary && (
                    <p className="text-red-500 text-sm mt-1">{errors.professionalSummary}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Skills {requiredField()}
                  </label>
                  <input
                    type="text"
                    name="profile.skills"
                    placeholder="Skills (comma-separated)"
                    value={formData.profile.skills}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.skills ? 'border-red-500 focus:ring-red-500' : 'focus:ring-red-600'
                    }`}
                    required
                  />
                  <p className="text-gray-500 text-xs mt-1">Example: JavaScript, React, Node.js</p>
                  {errors.skills && (
                    <p className="text-red-500 text-sm mt-1">{errors.skills}</p>
                  )}
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-300 disabled:bg-red-400"
            disabled={loading}
          >
            {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
          </button>
        </form>

        <div className="text-center mt-4">
          <button 
            onClick={handleToggle}
            className="text-red-600 hover:underline"
            disabled={loading}
          >
            {isSignUp 
              ? 'Already have an account? Sign In' 
              : 'Don\'t have an account? Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

