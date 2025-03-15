import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/index';
import { clearError, loginUser } from '../../store/slices/authSlice';
import {  CheckCircle, Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();


    const { loading, error } = useSelector((state: RootState) => state.auth);
    const [errors, setErrors] = useState({
        email: '',
        password: '',
      });
    

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
      });

      
    
      const validate = () => {
        let tempErrors = { email: '', password: '' };
        if (!formData.email) tempErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) tempErrors.email = 'Invalid email format';
    
        if (!formData.password) tempErrors.password = 'Password is required';
        setErrors(tempErrors);
        return Object.values(tempErrors).every((x) => x === '');
      };
    
      const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {

            const resultAction = await dispatch(loginUser({ email: formData.email, password: formData.password }));
          
              if (loginUser.fulfilled.match(resultAction)) {
                const userRole = resultAction.payload.user.role; 
                toast.success('Signin successfully! Redirecting...');

                if (userRole === 'Manager') {
                    navigate('/manager/Dashboard');
                } else if (userRole === 'Employee') {
                    navigate('/employee/dashboard');
                } 

              } else {
                toast.error( 'Signup failed');
              }

          
        }
      };
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({
          ...formData,
          [e.target.name]: value,
        });
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
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Welcome back</h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm md:text-base shadow-sm">
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4 md:w-5 md:h-5" />
            Log in with Google
          </button>
        
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 md:py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base"
                
              />
               {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
              </div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 md:py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base"
                
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
          </div>

          

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 md:py-2.5 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white transition-colors text-sm md:text-base"
          >
             {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {error && (
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

export default Login
