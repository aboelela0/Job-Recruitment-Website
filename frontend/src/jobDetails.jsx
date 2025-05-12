import React, { useState, useRef } from 'react';

const JobDetailsListingsPage = () => {
  const [filterDepartment, setFilterDepartment] = useState('All');
  const [filterLocation, setFilterLocation] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;
  const pageTopRef = useRef(null);
  
 
  const jobListings = [
    {
      id: 1,
      title: 'Project Manager',
      department: 'Management',
      location: 'Madinat Nasr, CAI',
      type: 'Full-time',
      salary: '15,000 - 30,000 LE',
      posted: '3 days ago',
      company: 'TechInnovate Solutions'
    },
    {
      id: 2,
      title: 'Frontend Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      salary: '12,000 - 25,000 LE',
      posted: '1 week ago',
      company: 'CloudTech Solutions'
    },
    {
      id: 3,
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Masr El-Gedida, CAI',
      type: 'Full-time',
      salary: '10,000 - 20,000 LE',
      posted: '2 days ago',
      company: 'Creative Minds Agency'
    },
    {
      id: 4,
      title: 'Data Analyst',
      department: 'Analytics',
      location: 'Downtown, CAI',
      type: 'Full-time',
      salary: '13,000 - 22,000 LE',
      posted: '5 days ago',
      company: 'DataDriven Inc.'
    },
    {
      id: 5,
      title: 'Marketing Specialist',
      department: 'Marketing',
      location: 'Sheikh Zayed, CAI',
      type: 'Part-time',
      salary: '8,000 - 15,000 LE',
      posted: '1 day ago',
      company: 'Growth Marketing Agency'
    },
    {
      id: 6,
      title: 'Software Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Contract',
      salary: '20,000 - 35,000 LE',
      posted: '2 weeks ago',
      company: 'TechInnovate Solutions'
    },
    {
      id: 7,
      title: 'Product Manager',
      department: 'Management',
      location: 'New Cairo, CAI',
      type: 'Full-time',
      salary: '18,000 - 35,000 LE',
      posted: '4 days ago',
      company: 'ProductFirst Co.'
    },
    {
      id: 8,
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      salary: '25,000 - 40,000 LE',
      posted: '1 week ago',
      company: 'CloudTech Solutions'
    },
    {
      id: 9,
      title: 'Content Writer',
      department: 'Marketing',
      location: 'Zamalek, CAI',
      type: 'Freelance',
      salary: '5,000 - 10,000 LE',
      posted: '3 days ago',
      company: 'CreativeHub Agency'
    }
  ];
  
  
  const departments = ['All', ...new Set(jobListings.map(job => job.department))];
  const locations = ['All', ...new Set(jobListings.map(job => job.location))];
  
 
  const filteredJobs = jobListings.filter(job => {
    const matchesDepartment = filterDepartment === 'All' || job.department === filterDepartment;
    const matchesLocation = filterLocation === 'All' || job.location === filterLocation;
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesDepartment && matchesLocation && matchesSearch;
  });
  
 
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  
 
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  
 
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);

    if (pageTopRef.current) {
      pageTopRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
 
  const resetFilters = () => {
    setFilterDepartment('All');
    setFilterLocation('All');
    setSearchTerm('');
    setCurrentPage(1);
   
    if (pageTopRef.current) {
      pageTopRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto bg-gray-50 p-6 my-8">
      <div ref={pageTopRef}></div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Job Details</h1>
      
     
      <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filterDepartment}
            onChange={(e) => {
              setFilterDepartment(e.target.value);
              setCurrentPage(1); 

              if (pageTopRef.current) {
                pageTopRef.current.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
        
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filterLocation}
            onChange={(e) => {
              setFilterLocation(e.target.value);
              setCurrentPage(1);

              if (pageTopRef.current) {
                pageTopRef.current.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
        
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input 
            type="text" 
            placeholder="Search by job title or company..." 
            className="w-full p-2 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
             
              if (pageTopRef.current) {
                pageTopRef.current.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          />
        </div>
      </div>
      
      
      <div className="mb-4 text-gray-600">
        Showing {filteredJobs.length > 0 ? indexOfFirstJob + 1 : 0} - {Math.min(indexOfLastJob, filteredJobs.length)} of {filteredJobs.length} jobs
      </div>
      
     
      <div className="grid grid-cols-1 gap-6">
        {currentJobs.length > 0 ? (
          currentJobs.map(job => (
            <div key={job.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <h2 className="text-xl font-bold text-red-600">{job.title}</h2>
                  <p className="text-gray-700 mt-1">{job.company}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{job.department}</span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{job.location}</span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{job.type}</span>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 md:text-right">
                  <p className="text-gray-700">{job.salary} per month</p>
                  <p className="text-gray-500 text-sm mt-1">Posted {job.posted}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-lg text-gray-700">No jobs found matching your criteria.</p>
            <button 
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm transition duration-300"
              onClick={resetFilters}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
      

      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <nav className="flex space-x-2">
            <button 
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md ${
                currentPage === 1 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-4 py-2 rounded-md ${
                  currentPage === number
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {number}
              </button>
            ))}
            
            <button 
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md ${
                currentPage === totalPages 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default JobDetailsListingsPage;