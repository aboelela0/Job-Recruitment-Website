import React from 'react';
import { Link } from 'react-router-dom';


function Footer() {
    return (
      <footer className="w-full bg-linear-to-r from-gray-300 to-gray-400 px-12 py-6 flex justify-between items-center">
        <div className="quick-links">
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <div className="flex flex-col space-y-1">
            <p className="text-gray-700">Privacy Policy</p>
            <p className="text-gray-700">Terms of Service</p>
            <p className="text-gray-700">Help Center</p>
          </div>
        </div>
        
        <div className="contact-info text-left">
          <h4 className="font-semibold mb-2">Contact Us</h4>
          <div className="flex flex-col space-y-1">
            <p className="text-gray-700">Email: aboelela@gmail.com</p>
            <p className="text-gray-700">Phone: +20 1094181699</p>
            <Link to='./TicketForm' className="text-red-600 hover:underline">
            Submit a Ticket
          </Link>
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;