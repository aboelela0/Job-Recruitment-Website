import React from 'react';
import { Link } from 'react-router-dom';

const ProjectManager = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-8">
      
      <div className="bg-red-600 text-white p-6">
        <h1 className="text-3xl font-bold">Project Manager</h1>
        <p className="text-xl mt-2">CloudTech Solutions | Masr El-Gedida, CAI</p>
      </div>
      
     
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Job Description</h2>
            <p className="mb-6">
              We are looking for a skilled Project Manager to oversee and guide 
              multiple projects to successful completion. The ideal candidate will 
              have strong leadership and organizational skills to deliver projects 
              on time and within scope.
            </p>
            
            <h2 className="text-2xl font-bold mb-4">Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Lead project planning, execution, and closure</li>
              <li>Coordinate and manage cross-functional teams</li>
              <li>Ensure projects are completed on time, within scope, and within budget</li>
              <li>Manage risks, issues, and escalate when necessary</li>
              <li>Communicate with stakeholders and provide regular project updates</li>
            </ul>
          </div>
          
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Requirements</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Bachelor's degree in Business, Management, or related field</li>
              <li>3+ years of experience in project management</li>
              <li>Strong leadership and communication skills</li>
              <li>Proficiency in project management tools (e.g., Asana, Jira, Microsoft Project)</li>
              <li>Ability to manage multiple projects and prioritize effectively</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Compensation</h2>
            <p className="mb-1">Salary: 15,000 LE - 30,000 LE per month</p>
            <p>Full-time position</p>
          </div>
        </div>
        
       
        <div className="mt-6 text-center">
            <Link to='/apply' ><div className="bg-red-600 text-white hover:bg-red-700 px-8 py-3 mb-3 hover:scale-98 transform transition duration-300 rounded-lg inline-block ">
              Apply Now
            </div></Link>
            
          </div>
      </div>
    </div>
  );
};

export default ProjectManager;