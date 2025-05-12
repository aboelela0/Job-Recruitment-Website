import logo from './assets/logo3.png';
import { Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';

function Header() {
    const { user, logout } = useAuth();
    
    return (
      <header className="w-full flex justify-between items-center px-5 py-2 bg-linear-to-r from-white to-gray-400 shadow-md">
        <div className="flex items-center">
          <Link to="/">
            <img 
              src={logo}
              alt="RecruitNow Logo" 
              className="h-20 mr-20"
            />
          </Link>
        </div>
        
        <nav className="flex space-x-6">
          <Link to="/"
            className="text-gray-700 font-semibold hover:text-red-600 hover:scale-103 transform transition duration-300 drop-shadow-[1px_1px_1px_gray]"
          >
            Home
          </Link>
          
          <Link to="./jobDetails"
            className="text-gray-700 font-semibold hover:text-red-600 hover:scale-103 transform transition duration-300 drop-shadow-[1px_1px_1px_gray]"
          >
            Job Details
          </Link>

          
          <Link to="./aboutUs"
            className="text-gray-700 font-semibold hover:text-red-600 hover:scale-103 transform transition duration-300 drop-shadow-[1px_1px_1px_gray]"
          >
            About Us
          </Link>
          
          <Link to="./apply"
            className="text-red-600 font-bold hover:text-gray-700 hover:scale-103 transform transition duration-300 drop-shadow-[1px_1px_1px_black]"
          >
            Apply
          </Link>
        </nav>
        
        <div className="flex space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="./profile"
                className="px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-600 hover:text-white hover:scale-103 transform transition duration-200 drop-shadow-[1px_1px_1px_gray]"
              >
                Profile
              </Link>
              <button
                onClick={logout}
                className="px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-600 hover:text-white hover:scale-103 transform transition duration-200 drop-shadow-[1px_1px_1px_gray]"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="./login"
              className="px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-600 hover:text-white hover:scale-103 transform transition duration-200 drop-shadow-[1px_1px_1px_gray]"
            >
              Login/Sign-up
            </Link>
          )}
        </div>
      </header>
    );
  }
  
  export default Header;