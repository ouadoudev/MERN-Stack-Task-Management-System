import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { loginUser } from '@/store/authSlice';
import { Form } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Login = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginUser({ email, password }));
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'Error logging in. Please try again later.');
    }
  };

  const handleForgetPassword = () => {
    navigate (`/password-reset`); 
  };
  // Check if the user is already authenticated
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Redirect logic
  if(isAuthenticated){
        return <Navigate to="/tasks" />;
      }
  
  return (
    <div className="flex items-center   dark:bg-gray-900">
      <div className="flex-1 h-full max-w-lg mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <Form onSubmit={handleSubmit}>
            <form className=" flex flex-col items-center justify-center gap-4 px-5 pt-16 w-full max-w-md mx-auto text-lg" onSubmit={handleSubmit}>
            <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Welcome Back!</h1>
          <p className="text-gray-700 pb-3">Login to your account</p>
          <span className="text-xl text-gray-500">Empowering Your Learning Journey</span>
        </div>
              <Label className="pr-[85%] " htmlFor="email">Email:</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                placeholder="user@doamin.com"
              />
              <Label className="pr-[80%] " htmlFor="password">Password:</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                placeholder="***************"
              />   
             <div className="w-full flex justify-end">
                <Button
                  type="button"
                  className=" bg-transparent h-4 text-sm text-indigo-600 hover:text-white"
                  onClick={handleForgetPassword}
                >
                  Forgot Password?
                </Button>
              </div>
            
              <Button
               className="bg-[#090909] w-[300px] h-9 mt-3"
                type="submit"
              >
                Login
              </Button>
              <div className="text-center pb-12">
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Not a Member{' '}
                  <Link
                    className="text-indigo-600 hover:text-amber-500"
                    to="/register"
                  >
                    Create Account
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
