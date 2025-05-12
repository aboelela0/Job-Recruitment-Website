import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if token exists and fetch user data
    const checkLoggedInUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Try to get user data from localStorage first for faster loading
          const cachedUser = localStorage.getItem('user');
          if (cachedUser) {
            setUser(JSON.parse(cachedUser));
          }
          
          // Verify token with backend
          try {
            const response = await axios.get('http://localhost:3000/auth/verify', {
              headers: { Authorization: `Bearer ${token}` }
            });
            
            if (response.data.user) {
              // Ensure profile data is properly structured
              const userData = response.data.user;
              
              // Ensure fullName is set correctly if not present in the response
              if (userData.profile && !userData.profile.fullName && 
                  userData.profile.firstName && userData.profile.lastName) {
                userData.profile.fullName = 
                  `${userData.profile.firstName} ${userData.profile.lastName}`;
              }
              
              // Ensure skills is always an array
              if (userData.profile && userData.profile.skills && 
                  !Array.isArray(userData.profile.skills)) {
                userData.profile.skills = userData.profile.skills
                  .split(',')
                  .map(skill => skill.trim())
                  .filter(Boolean);
              }
              
              setUser(userData);
              localStorage.setItem('user', JSON.stringify(userData));
            }
          } catch (err) {
            // Token might be invalid - clear data
            if (err.response && err.response.status === 401) {
              logout();
            }
          }
        }
      } catch (error) {
        console.error("Error during authentication check:", error);
      } finally {
        setLoading(false);
      }
    };
    
    checkLoggedInUser();
  }, []);
  
  const login = (userData) => {
    // Ensure proper data structure before storing
    if (userData.profile) {
      // Ensure fullName is set
      if (!userData.profile.fullName && 
          userData.profile.firstName && 
          userData.profile.lastName) {
        userData.profile.fullName = 
          `${userData.profile.firstName} ${userData.profile.lastName}`;
      }
      
      // Ensure skills is always an array
      if (userData.profile.skills && !Array.isArray(userData.profile.skills)) {
        userData.profile.skills = userData.profile.skills
          .split(',')
          .map(skill => skill.trim())
          .filter(Boolean);
      }
    }
    
    // Store user data in state and localStorage
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };
  
  const logout = () => {
    // Clear all auth data
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('profileData'); // Also clear profileData on logout
  };
  
  // Update user profile data
  const updateProfile = async (profileData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token || !user || !user.id) return false;
      
      // Ensure data is properly formatted before sending
      const dataToSend = {
        ...profileData,
        profile: {
          ...profileData.profile,
          fullName: `${profileData.profile.firstName} ${profileData.profile.lastName}`.trim(),
          skills: Array.isArray(profileData.profile.skills) 
            ? profileData.profile.skills 
            : (profileData.profile.skills ? profileData.profile.skills.split(',').map(s => s.trim()).filter(Boolean) : [])
        }
      };
      
      // Try different endpoint formats based on your backend API
      // First, try the profile/:id endpoint
      try {
        const response = await axios.put(
          `http://localhost:3000/auth/profile/${user.id}`,
          dataToSend,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        if (response.data.user) {
          // Update the user data in state and localStorage
          setUser(response.data.user);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          return true;
        }
      } catch (firstError) {
        console.log("First update attempt failed, trying alternate endpoint", firstError);
        
        // If that fails, try without the profile/ prefix
        try {
          const response = await axios.put(
            `http://localhost:3000/auth/${user.id}`,
            dataToSend,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          
          if (response.data.user) {
            // Update the user data in state and localStorage
            setUser(response.data.user);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            return true;
          }
        } catch (secondError) {
          console.error("Both update attempts failed:", secondError);
          throw secondError;
        }
      }
      
      return false;
    } catch (error) {
      console.error("Error updating profile:", error);
      // Log detailed error information
      if (error.response) {
        console.error('Response error:', error.response.data);
        console.error('Status code:', error.response.status);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      return false;
    }
  };
  
  const value = {
    user,
    login,
    logout,
    loading,
    updateProfile
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);