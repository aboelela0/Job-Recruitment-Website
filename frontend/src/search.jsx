import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const jobOptions = [

  'Software Engineer',
  'Software Developer',
  'Senior Software Engineer',
  'Marketing Specialist',
  'Marketing Manager',
  'Marketing Coordinator',
  'Project Manager',
  'Project Coordinator',
  'Project Engineer',
  'Product Manager',
  'Product Owner',
  'Product Designer',
];

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

 
  const filteredJobs = jobOptions.filter(job => 
    job.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const handleJobSelect = (job) => {
    setSearchTerm(job);
    setShowDropdown(false);


    const swjob = job.toLowerCase().trim();
    if (swjob.includes('software engineer')) {
      navigate('/swEng');
    }

    const marjob = job.toLowerCase().trim();
    if (marjob.includes('marketing specialist')) {
      navigate('/marketing');
    }

    const pmjob = job.toLowerCase().trim();
    if (pmjob.includes('project manager')) {
      navigate('/projectManager');
    }

   
  };

  const handleSearch = () => {
    
    if (searchTerm.trim() !== '' && filteredJobs.length > 0) {
      handleJobSelect(filteredJobs[0]);
    }
  };

  return (
    <div className="max-h-screen bg-gray-100 flex flex-col items-center justify-center p-10 m-5">
      <div className="text-center max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Wazzafny
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Your gateway to discovering the best job opportunities tailored just for you. 
          Connect with top employers and take the next step in your career journey.
        </p>
        
        <div className="relative w-full max-w-md mx-auto">
          <div className="flex border rounded-lg overflow-hidden">
            <input 
              type="text" 
              placeholder="Search for jobs..." 
              className="flex-grow px-4 py-2 outline-none"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <button 
              className="bg-red-600 text-white px-6 py-2 hover:bg-red-700 transform transition duration-200"
              onClick={handleSearch}
            > 
              Search
            </button>
          </div>
          {showDropdown && searchTerm && filteredJobs.length > 0 && (
            <div className="absolute z-10 w-full bg-white border rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
              {filteredJobs.map((job, index) => (
                <div 
                  key={index} 
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleJobSelect(job)}
                >
                  {job}
                </div>
              ))}
            </div>
          )}
          {showDropdown && searchTerm && filteredJobs.length === 0 && (
            <div className="absolute z-10 w-full bg-white border rounded-lg shadow-lg mt-1 p-4 text-gray-500">
              No jobs found starting with "{searchTerm}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;