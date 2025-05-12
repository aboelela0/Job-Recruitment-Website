import React from 'react'
import mohamedPhoto from'./assets/mohamed.jpg'
import nasrPhoto from './assets/nasr.jpg'
import joePhoto from'./assets/joe.jpg'
import faresPhoto from'./assets/fares.jpg'

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
    
      <div className="bg-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-6xl font-bold mb-4 text-center">About Wazzafny</h1>
          <p className="text-m text-center max-w-3xl mx-auto">
            Connecting talent with opportunity
          </p>
        </div>
      </div>

      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          
          <p className="text-lg text-gray-600 mb-12 text-center">
            <span className="font-bold">Wazzafny</span> is a recruitment platform created by students from the <span className="font-bold">British University in Egypt</span> who are passionate about connecting people with the right opportunities. We know how tough job hunting can be, especially for fresh grads — so we built Wazzafny to make it easier, smarter, and more accessible.
            <br /><br />
            Our mission is to bridge the gap between job seekers and companies by offering a simple, efficient, and user-friendly experience. Whether you're looking for your first job or your next big move, Wazzafny is here to help you take the next step.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Innovation</h3>
              <p className="text-gray-600">
                We use the latest technology to create a smooth and intelligent job-matching experience that evolves with the job market.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Excellence</h3>
              <p className="text-gray-600">
                We're committed to delivering top-quality experiences for both employers and job seekers — every connection counts.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Accessibility</h3>
              <p className="text-gray-600">
                We believe opportunity should be open to everyone. Our platform is designed to be inclusive, easy to use, and accessible to all.
              </p>
            </div>
          </div>
        </div>
      </div>

      
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Our Team</h2>
          <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            Meet the dedicated students behind Wazzafny who are working to transform the recruitment experience.
          </p>

          <div className="flex flex-wrap justify-center max-w-6xl mx-auto">
            <div className="w-64 m-4">
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img 
            src={mohamedPhoto} 
            alt="Mohamed Aboelela" 
            className="w-full h-64 object-cover"
          />
                
                <div className="p-4">
                  <h3 className="text-xl font-semibold">Mohamed Aboelela</h3>
                  <p className="text-red-600 mb-2">CEO & Founder</p>
                  <p className="text-gray-600">
                    Leading our vision to revolutionize how people find career opportunities.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="w-64 m-4">
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img 
            src={nasrPhoto} 
            alt="ahmed nasr" 
            className="w-full h-64 object-cover"
          />
                
                <div className="p-4">
                  <h3 className="text-xl font-semibold">Ahmed Nasr</h3>
                  <p className="text-red-600 mb-2">CTO</p>
                  <p className="text-gray-600">
                    Building innovative technology that powers our matching algorithms.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="w-64 m-4">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img 
            src={joePhoto} 
            alt="joe" 
            className="w-full h-64 object-cover"
          />
                
                <div className="p-4">
                  <h3 className="text-xl font-semibold">Youssef Khaled</h3>
                  <p className="text-red-600 mb-2">Head of Marketing</p>
                  <p className="text-gray-600">
                    Connecting employers and candidates with our platform through strategic outreach.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="w-64 m-4">
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img 
            src={faresPhoto} 
            alt="fares" 
            className="w-full h-64 object-cover"
          />
                
                <div className="p-4">
                  <h3 className="text-xl font-semibold">Fares Ghoniem</h3>
                  <p className="text-red-600 mb-2">Lead Developer</p>
                  <p className="text-gray-600">
                    Creating intuitive experiences that make job hunting and recruiting seamless.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold text-gray-800 mb-12 text-center">Our Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-5xl font-bold text-red-600 mb-2">30,000+</p>
              <p className="text-xl text-gray-700">Successfully placed candidates</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-red-600 mb-2">5,000+</p>
              <p className="text-xl text-gray-700">Partner companies</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-red-600 mb-2">90%</p>
              <p className="text-xl text-gray-700">Satisfaction rate</p>
            </div>
          </div>
        </div>
      </div>

      
      
          
          
        </div>
    
  )
}

export default AboutUs;