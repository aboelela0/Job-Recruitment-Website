import React, { useState } from 'react';
import axios from 'axios';

const Apply = ({ jobId }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    additionalInfo: ''
  });

  const [resume, setResume] = useState(null);
  const [positions] = useState([
    { id: 1, title: 'Software Engineer' },
    { id: 2, title: 'Frontend Developer' },
    { id: 3, title: 'Backend Developer' },
    { id: 4, title: 'Full Stack Developer' },
    { id: 5, title: 'UI/UX Designer' },
    { id: 6, title: 'Product Manager' },
    { id: 7, title: 'QA Engineer' }
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');
    setSubmitSuccess(false);

    if (!formData.fullName || !formData.email || !formData.phone || !formData.position || !resume) {
      setFormError('Please fill in all required fields and upload your resume');
      setIsSubmitting(false);
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setFormError('You are not logged in. Please log in first.');
      setIsSubmitting(false);
      return;
    }

    const submitData = new FormData();
    submitData.append('fullName', formData.fullName);
    submitData.append('email', formData.email);
    submitData.append('phone', formData.phone);
    submitData.append('position', formData.position);
    submitData.append('additionalInfo', formData.additionalInfo);
    submitData.append('resume', resume);
    if (jobId) submitData.append('jobId', jobId);

    try {
      const response = await axios.post('http://localhost:3000/api/applications/submit', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setSubmitSuccess(true);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          position: '',
          additionalInfo: ''
        });
        setResume(null);
        const fileInput = document.getElementById('resume-upload');
        if (fileInput) fileInput.value = '';
      } else {
        setFormError(response.data.message || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Application submission error:', error);
      setFormError(
        error.response?.data?.message ||
        'An error occurred while submitting your application. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full m-5 max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-red-600 p-6">
        <h1 className="text-2xl font-bold text-white">Job Application</h1>
      </div>
      <form onSubmit={handleSubmit} className="p-6">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Personal Information</h2>
          <div className="h-px bg-gray-300 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">
                Full Name <span className="text-red-600">*</span>
              </label>
              <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email Address <span className="text-red-600">*</span>
              </label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                Phone Number <span className="text-red-600">*</span>
              </label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <div>
              <label htmlFor="position" className="block text-gray-700 font-medium mb-2">
                Position <span className="text-red-600">*</span>
              </label>
              <select id="position" name="position" value={formData.position} onChange={handleChange} required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500">
                <option value="">Select a position</option>
                {positions.map(pos => (
                  <option key={pos.id} value={pos.title}>{pos.title}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Resume</h2>
          <div className="h-px bg-gray-300 mb-6"></div>
          <label htmlFor="resume-upload" className="block text-gray-700 font-medium mb-2">
            Upload Resume <span className="text-red-600">*</span>
          </label>
          <input type="file" id="resume-upload" onChange={handleFileChange} accept=".pdf,.doc,.docx" required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
          <p className="text-sm text-gray-500 mt-1">PDF, DOC, DOCX (Max 5MB)</p>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Additional Information</h2>
          <div className="h-px bg-gray-300 mb-6"></div>
          <label htmlFor="additionalInfo" className="block text-gray-700 font-medium mb-2">
            Why are you interested in this position? (Optional)
          </label>
          <textarea id="additionalInfo" name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} rows="4"
            placeholder="Share why you're interested in this position and what makes you a good fit..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"></textarea>
        </div>

        {formError && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{formError}</div>}
        {submitSuccess && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">Your application has been submitted successfully!</div>}

        <button type="submit" disabled={isSubmitting}
          className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
};

export default Apply;
