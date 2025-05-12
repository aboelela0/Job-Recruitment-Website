import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext.jsx';
import { Link } from 'react-router-dom';
import MyApplications from './MyApplications.jsx';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    profile: {
      firstName: '',
      lastName: '',
      fullName: '',
      phone: '',
      location: '',
      title: 'Job Seeker',
      professionalSummary: '',
      skills: []
    }
  });

  // Load user data when component mounts or becomes visible
  useEffect(() => {
    const loadProfileData = () => {
      console.log("Loading profile data...");
      
      // First try to load from localStorage
      try {
        const savedData = localStorage.getItem('profileData');
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          console.log("Found data in localStorage:", parsedData);
          setProfileData(parsedData);
          return true;
        }
      } catch (err) {
        console.error("Error loading from localStorage:", err);
      }
      
      // Fall back to user data if available
      if (user) {
        console.log("Loading from user context:", user);
        
        const newProfileData = {
          username: user.username || '',
          email: user.email || '',
          profile: {
            firstName: user.profile?.firstName || '',
            lastName: user.profile?.lastName || '',
            fullName: user.profile?.fullName || `${user.profile?.firstName || ''} ${user.profile?.lastName || ''}`.trim(),
            phone: user.profile?.phone || '',
            location: user.profile?.location || '',
            title: user.profile?.title || 'Job Seeker',
            professionalSummary: user.profile?.professionalSummary || '',
            skills: Array.isArray(user.profile?.skills) 
              ? user.profile.skills 
              : (user.profile?.skills ? user.profile.skills.split(',').map(s => s.trim()) : [])
          }
        };
        
        setProfileData(newProfileData);
        localStorage.setItem('profileData', JSON.stringify(newProfileData));
        return true;
      }
      
      return false;
    };

    // Load data initially
    loadProfileData();
    
    // Add event listener for focus (when returning to the page)
    const handleFocus = () => {
      console.log("Window focused, reloading profile data");
      loadProfileData();
    };
    
    window.addEventListener('focus', handleFocus);
    
    // Clean up
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      
      // Special handling for firstName and lastName to update fullName
      if (child === 'firstName' || child === 'lastName') {
        const updatedProfile = {
          ...profileData[parent],
          [child]: value
        };
        
        // Update fullName whenever firstName or lastName changes
        const newFirstName = child === 'firstName' ? value : profileData.profile.firstName;
        const newLastName = child === 'lastName' ? value : profileData.profile.lastName;
        updatedProfile.fullName = `${newFirstName} ${newLastName}`.trim();
        
        const newData = {
          ...profileData,
          [parent]: updatedProfile
        };
        
        setProfileData(newData);
        localStorage.setItem('profileData', JSON.stringify(newData));
      } else {
        const newData = {
          ...profileData,
          [parent]: {
            ...profileData[parent],
            [child]: value
          }
        };
        
        setProfileData(newData);
        localStorage.setItem('profileData', JSON.stringify(newData));
      }
    } else {
      const newData = {
        ...profileData,
        [name]: value
      };
      
      setProfileData(newData);
      localStorage.setItem('profileData', JSON.stringify(newData));
    }
  };

  const handleSkillsChange = (e) => {
    const skillsString = e.target.value;
    const skillsArray = skillsString.split(',').map(skill => skill.trim()).filter(Boolean);
    
    const newData = {
      ...profileData,
      profile: {
        ...profileData.profile,
        skills: skillsArray
      }
    };
    
    setProfileData(newData);
    localStorage.setItem('profileData', JSON.stringify(newData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Ensure fullName is always set properly
      const fullName = `${profileData.profile.firstName} ${profileData.profile.lastName}`.trim();
      
      // Prepare data for submission
      const dataToSubmit = {
        ...profileData,
        profile: {
          ...profileData.profile,
          fullName: fullName,
          // Ensure skills is always an array
          skills: Array.isArray(profileData.profile.skills) 
            ? profileData.profile.skills 
            : (typeof profileData.profile.skills === 'string' 
                ? profileData.profile.skills.split(',').map(s => s.trim()) 
                : [])
        }
      };
      
      console.log("Submitting profile data:", dataToSubmit);
      
      // Use the updateProfile method from AuthContext
      const success = await updateProfile(dataToSubmit);
      
      if (success) {
        // Save to localStorage
        localStorage.setItem('profileData', JSON.stringify(dataToSubmit));
        
        setSuccess('Profile updated successfully!');
        setIsEditing(false);
      } else {
        setError('Profile updated successfully!');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.response?.data?.message || 'Failed to update profile. Please try again.');
      
      // More detailed error logging
      if (err.response) {
        console.error('Error response:', err.response.data);
        console.error('Status code:', err.response.status);
      } else if (err.request) {
        console.error('No response received:', err.request);
      } else {
        console.error('Error message:', err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Format skills for display
  const displaySkills = () => {
    if (!profileData.profile.skills || profileData.profile.skills.length === 0) {
      return 'No skills listed';
    }
    
    return profileData.profile.skills.map((skill, index) => (
      <span key={index} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
        {skill}
      </span>
    ));
  };

  // Get full name for display
  const getFullName = () => {
    if (profileData.profile.fullName && profileData.profile.fullName.trim()) {
      return profileData.profile.fullName;
    }
    
    const computed = `${profileData.profile.firstName || ''} ${profileData.profile.lastName || ''}`.trim();
    return computed || 'No name provided';
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Not Logged In</h2>
          <p className="text-gray-600">Please log in to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="bg-red-600 text-white p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-2xl font-bold">{getFullName()}</h1>
                <p className="text-white opacity-90 mt-1">{profileData.profile.title}</p>
              </div>
              <div className="mt-4 md:mt-0">
                {!isEditing ? (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="bg-white text-red-600 px-4 py-2 rounded font-medium hover:bg-gray-100 transition"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-200 text-gray-800 px-4 py-2 rounded font-medium hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSubmit}
                      className="bg-white text-red-600 px-4 py-2 rounded font-medium hover:bg-gray-100 transition"
                      disabled={loading}
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Notification Messages */}
          {error && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
              <p>{error}</p>
            </div>
          )}
          
          {success && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
              <p>{success}</p>
            </div>
          )}

          {/* Profile Content */}
          <div className="p-6">
            {isEditing ? (
              /* Edit Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Account Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Account Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                      <input
                        type="text"
                        name="username"
                        value={profileData.username}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                {/* Personal Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Personal Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        name="profile.firstName"
                        value={profileData.profile.firstName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        name="profile.lastName"
                        value={profileData.profile.lastName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="text"
                        name="profile.phone"
                        value={profileData.profile.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        name="profile.location"
                        value={profileData.profile.location}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Professional Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Professional Information</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Professional Title</label>
                      <input
                        type="text"
                        name="profile.title"
                        value={profileData.profile.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
                      <textarea
                        name="profile.professionalSummary"
                        value={profileData.profile.professionalSummary}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma-separated)</label>
                      <input
                        type="text"
                        value={Array.isArray(profileData.profile.skills) ? profileData.profile.skills.join(', ') : ''}
                        onChange={handleSkillsChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                        placeholder="e.g. JavaScript, React, Node.js"
                      />
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              /* View Profile */
              <div className="space-y-6">
                {/* Account Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Account Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Username</p>
                      <p className="text-gray-800">{profileData.username}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="text-gray-800">{profileData.email}</p>
                    </div>
                  </div>
                </div>
                
                {/* Personal Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Personal Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Full Name</p>
                      <p className="text-gray-800">{getFullName()}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Phone Number</p>
                      <p className="text-gray-800">{profileData.profile.phone || 'Not provided'}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Location</p>
                      <p className="text-gray-800">{profileData.profile.location || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
                
                {/* Professional Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Professional Information</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Professional Title</p>
                      <p className="text-gray-800">{profileData.profile.title}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Professional Summary</p>
                      <p className="text-gray-800 whitespace-pre-line">
                        {profileData.profile.professionalSummary || 'No professional summary provided'}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-2">Skills</p>
                      <div className="flex flex-wrap">
                        {displaySkills()}
                      </div>
                      <Link to="./MyApplications"
                        className="ml-80 text-lg px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-600 hover:text-white hover:scale-103 transform transition duration-200"
                      >
                        My Applications 
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
