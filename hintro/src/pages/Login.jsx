import { useState } from 'react';
import { Mail, Eye, EyeOff } from 'lucide-react';
import { authStore } from '../store/authStore';
import {useNavigate} from 'react-router-dom';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const {login} = authStore();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login('u1');
    navigate('/');

  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center mb-8">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-900">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                id="email"
                type="email"
                placeholder="Example@email.com"
                className="w-full h-12 pl-10 pr-3 rounded-lg border border-gray-200 bg-gray-50 text-sm placeholder:text-gray-400 focus:outline-none focus:border-gray-400"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-900">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="w-full h-12 pl-3 pr-10 rounded-lg border border-gray-200 bg-gray-50 text-sm placeholder:text-gray-400 focus:outline-none focus:border-gray-400"
              />
              <button
                type="button"
                onClick={()=>setShowPassword(pass=>!pass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword? <Eye className='h-4 w-4'/> : <EyeOff className='h-4 w-4'/>}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="h-12 mt-3 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;