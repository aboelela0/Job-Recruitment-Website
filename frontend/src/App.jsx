import { useState } from 'react'
import logo from './assets/logo3.png'
import viteLogo from '/vite.svg'
import './App.css'
import { Navigate } from 'react-router-dom';
import Header from './header'
import Search from './search'
import FeaturedJobListings from './categories'
import Footer from './footer.jsx'
import Apply from './apply'
import SwEng from './swEng'
import Marketing from './marketing'
import ProjectManager from './projectManager'

import AboutUs from './aboutUs'
import JobDetails from './jobDetails'
import Login from './login'
import Home from './home'
import Profile from './Profile'  // Import the new Profile component
import MyApplications from './MyApplications.jsx'
import TicketForm from './TicketForm.jsx'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'

function App() {
    const user = localStorage.getItem('user');
    return (
        <AuthProvider>
            <Router>
                <div className="bg-gray-100">
                    <Header/>
                    <Routes>
                        <Route path='/' element={<Home/>} />
                        <Route path='/aboutUs' element={<AboutUs/>} />
                        <Route path='/apply' element={<Apply/>} />
                        <Route path='/jobDetails' element={<JobDetails/>} />
                        <Route path="/" element={user ? <Navigate to="/profile" /> : <Login />} />
                        <Route path='/login' element={<Login/>} />
                        <Route path='/marketing' element={<Marketing/>} />
                        <Route path='/swEng' element={<SwEng/>} />
                        <Route path='/projectManager' element={<ProjectManager/>} />
                        <Route path='/profile' element={<Profile/>} /> {/* Add this new route */}
                        <Route path='/profile/MyApplications' element={<MyApplications/>} />
                        <Route path='/TicketForm' element={<TicketForm/>} />
                    </Routes>
                    <Footer/>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;