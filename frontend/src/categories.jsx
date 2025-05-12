
import { Link } from 'react-router-dom';

function FeaturedJobListings() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Featured Job Listings
      </h2>
      <div className="flex justify-center space-x-6">
        <div className="w-80 bg-linear-to-r to from-white to to-gray-300 bg-white hover:scale-105 transform transion duration-400 ease-in-out shadow-md rounded-lg p-6 hover:shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Software Engineer
          </h3>
          <p className="text-gray-600 mb-1">
            TechCorp - Maadi, CAI
          </p>
          <p className="text-gray-500 text-sm">
            Join our dynamic team to develop cutting-edge software solutions.
          </p>
          <Link to='./swEng'>
            <button className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-gray-600 transform transition duration-300 ease-in-out hover:scale-99">
              View Details
            </button>
          </Link>
        </div>
        <div className="w-80 bg-linear-to-r to from-white to to-gray-300 bg-white hover:scale-105 transform transion duration-400 ease-in-out shadow-md rounded-lg p-6 hover:shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Marketing Specialist
          </h3>
          <p className="text-gray-600 mb-1">
            CreativeAgency - 6 Of October, GIZA
          </p>
          <p className="text-gray-500 text-sm">
            Drive innovative marketing campaigns and strategies in a creative environment.
          </p>
          <Link to='./marketing'>
            <button className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-gray-600 transform transition duration-300 ease-in-out hover:scale-99">
              View Details
            </button>
          </Link>
        </div>
        <div className="w-80 bg-linear-to-r to from-white to to-gray-300 bg-white hover:scale-105 transform transion duration-400 ease-in-out shadow-md rounded-lg p-6 hover:shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Project Manager
          </h3>
          <p className="text-gray-600 mb-1">
            ZarbawyTech - Zarb, SUEZ
          </p>
          <p className="text-gray-500 text-sm">
            Lead cross-functional teams to deliver projects on time and within budget.
          </p>
          <Link to='./projectManager'>
            <button className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-gray-600 transform transition duration-300 ease-in-out hover:scale-99">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FeaturedJobListings;