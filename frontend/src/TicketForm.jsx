import { useState } from 'react';
import axios from 'axios';

export default function TicketForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitted: false,
        error: true,
        message: 'Please fill in all required fields'
      });
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3000/api/tickets/submit', formData); // adjust URL if needed
  
      if (response.data.success) {
        setFormStatus({
          submitted: true,
          error: false,
          message: 'Your message has been sent successfully! We will get back to you soon.'
        });
  
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setFormStatus({
          submitted: false,
          error: true,
          message: response.data.message || 'Failed to submit the ticket'
        });
      }
    } catch (error) {
      console.error('Error submitting ticket:', error);
      setFormStatus({
        submitted: false,
        error: true,
        message: error.response?.data?.message || 'Something went wrong. Please try again.'
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-8">
      {/* Header */}
      <div className="bg-red-600 text-white p-6">
        <h1 className="text-3xl font-bold">Submit a ticket</h1>
        <p className="text-xl mt-2">Wazzafny | We're here to help!</p>
      </div>
      
      <div className="p-6">
        <div>
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Submit a Support Ticket</h2>
            
            {formStatus.submitted ? (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6">
                <p>{formStatus.message}</p>
              </div>
            ) : formStatus.error ? (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
                <p>{formStatus.message}</p>
              </div>
            ) : null}
            
            <div>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name*</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message*</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                ></textarea>
              </div>
              
              <button
                onClick={handleSubmit}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 w-full"
              >
                Submit Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

