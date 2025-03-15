
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/index';
import { clearError, verifyOTP } from '../../store/slices/authSlice';
import {  CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Otppage = () => {
    const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error,user,tempEmail } = useSelector((state: RootState) => state.auth);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6); // Only numbers, max 6 digits
    setOtp(value);
    if (errors) setErrors('');
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setErrors('OTP must be 6 digits');
      return;
    }
 
    

   
    if (!tempEmail) {
      toast.error('Email not found');
      return;
    }
    const resultAction = await dispatch(verifyOTP({ otp, tempEmail }));
      
  
      if (verifyOTP.fulfilled.match(resultAction)) {
        const userRole = resultAction.payload.user.role; // Assuming the role is returned in payload
  toast.success('Signin successfully! Redirecting...');

  if (userRole === 'Manager') {
    navigate('/manager/dashboard');
  } else if (userRole === 'Employee') {
    navigate('/employee/dashboard');
  } else {
    navigate('/');
  }
      } else {
        toast.error( 'OTP verification failed');
      }

    
  };

    useEffect(() => {
                // Cleanup function to clear the error on unmount
                return () => {
                  dispatch(clearError());
                };
              }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
    {/* Left Section */}
    <div className="w-full lg:w-1/2 p-6 md:p-8 lg:p-12 flex flex-col bg-white">
      <div className="flex items-center gap-2 text-gray-900 mb-8 lg:mb-16">
        
        <span className="text-xl md:text-2xl font-bold">TaskNest</span>
      </div>

      <div className="space-y-6 md:space-y-8">
        <div className="flex items-start gap-3">
          <div className="mt-1">
            <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-gray-900 text-lg md:text-xl font-semibold">Stay Organized Effortlessly</h3>
            <p className="text-gray-600 mt-1 text-sm md:text-base">Manage tasks with intuitive workflows and smart reminders.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="mt-1">
            <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-gray-900 text-lg md:text-xl font-semibold">Collaborate Seamlessly</h3>
            <p className="text-gray-600 mt-1 text-sm md:text-base">Connect teams with real-time updates and shared task lists.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="mt-1">
            <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-gray-900 text-lg md:text-xl font-semibold">Boost Productivity</h3>
            <p className="text-gray-600 mt-1 text-sm md:text-base">Track progress, set priorities, and hit deadlines with ease.</p>
          </div>
        </div>
      </div>

      <div className="mt-8 lg:mt-auto">
        <nav className="flex flex-wrap gap-4 md:gap-6 text-gray-500 text-sm md:text-base">
          <a href="#" className="hover:text-gray-700">About</a>
          <a href="#" className="hover:text-gray-700">Term & Conditions</a>
          <a href="#" className="hover:text-gray-700">Contact</a>
        </nav>
      </div>
    </div>

    {/* Right Section */}
    <div className="w-full lg:w-1/2 p-6 md:p-8 lg:p-12 flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-6 md:space-y-8 bg-white p-6 md:p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-center text-gray-900">Please Enter Your OTP</h2>
        </div>


        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={otp}
            onChange={handleChange}
            placeholder="Enter OTP"
            maxLength={6}
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors && <p className="text-red-500 text-xs mt-2">{errors}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          {loading ? 'Logging in...' : 'Enter OTP'}
        </button>
      </form>
        {error&& (
  <div className="flex justify-center items-center h-full">
    <p className="text-red-500">{error}</p>
  </div>
)}


        <p className="text-sm text-gray-600 text-center">
          Don't have an account yet?{' '}
          
          <a  className="text-blue-600 hover:text-blue-700">
          <Link to={'/auth/signup'}>
            Sign up here
            </Link>
          </a>
        
         
        </p>
      </div>
    </div>
  </div>
  )
}

export default Otppage
