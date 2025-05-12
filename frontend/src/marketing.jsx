 

import React from 'react'
import { Link } from 'react-router-dom';

const Marketing = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden m-6">
      <div className="bg-red-600 text-white text-center py-6">
        <h1 className="text-3xl font-bold">Marketing Specialist</h1>
        <p className="text-sm">Techinnovate Solutions | Madinat Nasr, CAI</p>
      </div>

      <div className="p-6 grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Job Description</h2>
          <p className="text-gray-600 mb-4">
            We are seeking a creative Marketing Specialist to join our innovative team. The ideal candidate will have strong communication skills and a passion for developing compelling marketing strategies.
          </p>

          <h3 className="text-lg font-semibold mb-3 text-gray-800">Responsibilities</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Develop and implement marketing campaigns</li>
            <li>Collaborate with cross-functional teams</li>
            <li>Create engaging content across various platforms</li>
            <li>Participate in marketing strategy meetings</li>
            <li>Analyze marketing metrics and campaign performance</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Requirements</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
            <li>Bachelor's degree in Marketing, Communications, or related field</li>
            <li>3+ years of marketing experience</li>
            <li>Proficiency in digital marketing tools</li>
            <li>Strong communication and creative skills</li>
          </ul>

          <div className="bg-white p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Compensation</h3>
            <p className="text-gray-700">Salary: 15,000 LE - 30,000 LE per month</p>
            <p className="text-gray-700">Full-time position</p>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
            <Link to='/apply' ><div className="bg-red-600 text-white hover:bg-red-700 px-8 py-3 mb-3 hover:scale-98 transform transition duration-300 rounded-lg inline-block ">
              Apply Now
            </div></Link>
            
          </div>
    </div>
  )
}

export default Marketing;