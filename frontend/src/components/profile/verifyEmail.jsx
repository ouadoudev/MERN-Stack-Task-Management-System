import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const VerifyEmail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get('token');

  useEffect(() => {
    const verify = async () => {
      if (token) {
        try {
          const response = await axios.post('http://localhost:3000/users/verify-email', { token });
          if (response.data.error) {
            setError(response.data.error);
            toast.error(response.data.error);
          } else if (response.data.success) {
            localStorage.setItem('token', response.data.token);
            toast.success('Email successfully verified, redirecting to login...');
          }
        } catch (error) {
          setError(error.message);
          toast.error(error.message);
        } finally {
          setIsLoading(false);
          toast.success('Email successfully verified, redirecting to login...');

           navigate('/login');
          
        }
      }
    };

    verify();
  }, [navigate,token]);


  return (
    <div>
      <ToastContainer />
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-pulse flex flex-col items-center gap-4 w-60">
            <div>
              <div className="w-48 h-6 bg-gray-300 rounded-md"></div>
              <div className="w-28 h-4 bg-gray-300 mx-auto mt-3 rounded-md"></div>
            </div>
            <div className="h-7 bg-gray-300 w-full rounded-md"></div>
            <div className="h-7 bg-gray-300 w-full rounded-md"></div>
            <div className="h-7 bg-gray-300 w-full rounded-md"></div>
            <div className="h-7 bg-gray-300 w-1/2 rounded-md"></div>
          </div>
        </div>
      ) : error && (
        <div>
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
