import React from 'react';
import { Link } from 'react-router-dom';

const SwEng = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 mt-2">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden ">
        
        <div className="bg-red-600 text-white p-6">
          <h1 className="text-3xl font-bold">Software Engineer</h1>
          <p className="text-white mt-2">TechInnovate Solutions | Madinat Nasr, CAI</p>
        </div>

        
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
           
            <div>
              <h2 className="text-2xl font-bold mb-4 text-black">Job Description</h2>
              <p className="text-gray-700 mb-4">
                We are seeking a talented Software Engineer to join our innovative team. 
                The ideal candidate will have strong programming skills and a passion for 
                creating efficient, scalable solutions.
              </p>
              
              <h3 className="text-xl font-semibold mb-2 text-black">Responsibilities</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>Develop and maintain software applications</li>
                <li>Collaborate with cross-functional teams</li>
                <li>Write clean, efficient code</li>
                <li>Participate in code reviews</li>
                <li>Troubleshoot and debug software issues</li>
              </ul>
            </div>

            
            <div>
              <h2 className="text-2xl font-bold mb-4 text-black">Requirements</h2>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>Bachelor's degree in Computer Science or related field</li>
                <li>3+ years of software development experience</li>
                <li>Proficiency in JavaScript/TypeScript</li>
                <li>Experience with React and Node.js</li>
                <li>Strong problem-solving skills</li>
              </ul>

              <h3 className="text-xl font-semibold mt-4 mb-2 text-black">Compensation</h3>
              <p className="text-gray-700">
                Salary: 15,000 LE - 30,000 LE per month
                <br />
                Full-time position
              </p>
            </div>
          </div>

        
          <div className="mt-6 text-center">
            <Link to='/apply' ><div className="bg-red-600 text-white hover:bg-red-700 px-8 py-3 hover:scale-98 transform transition duration rounded-lg inline-block ">
              Apply Now
            </div></Link>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwEng;