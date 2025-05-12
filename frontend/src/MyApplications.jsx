import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/applications/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setApplications(response.data.applications);
      } else {
        setError('Failed to load applications.');
      }
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError('An error occurred while fetching your applications.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="w-full m-5 max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-4 text-red-600">My Applications</h1>

      {loading ? (
        <p>Loading your applications...</p>
      ) : error ? (
        <div className="p-3 bg-red-100 text-red-700 rounded-md">{error}</div>
      ) : applications.length === 0 ? (
        <p className="text-gray-600">You have not submitted any applications yet.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app._id} className="border p-4 rounded-md shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800">{app.position}</h2>
              <p className="text-sm text-gray-600">Status: <strong>{app.status}</strong></p>
              <p className="text-sm text-gray-600">Submitted: {new Date(app.createdAt).toLocaleDateString()}</p>
              <p className="text-sm text-gray-600 mt-2">Additional Info: {app.additionalInfo || 'N/A'}</p>
              <a
                href={`http://localhost:3000/uploads/${app.resumePath}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm mt-2 inline-block"
              >
                View Resume
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;
