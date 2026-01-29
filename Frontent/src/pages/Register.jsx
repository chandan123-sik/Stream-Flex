import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const result = await register(formData.name, formData.email, formData.password);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error || 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <img 
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
          alt="Background" 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/1920x1080/1a1a1a/fff?text=StreamFlix+Background";
          }}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/70"></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-8">
          <Link to="/" className="inline-block">
            <span className="text-3xl sm:text-4xl font-bold text-accent-red">StreamFlix</span>
          </Link>
        </div>

        <div className="bg-black/80 backdrop-blur-sm rounded-xl p-6 sm:p-8 lg:p-10 border border-white/10">
          <form onSubmit={handleSubmit}>
            <h1 className="text-xl sm:text-2xl font-bold text-white text-center mb-6 sm:mb-8">Sign Up</h1>

            {error && (
              <div className="bg-accent-red/10 border border-accent-red text-accent-red p-3 rounded-md mb-4 sm:mb-5 text-sm text-center">
                {error}
              </div>
            )}

            <div className="mb-4 sm:mb-5">
              <div className="relative flex items-center">
                <User className="absolute left-3 sm:left-4 text-text-secondary z-10" size={18} />
                <input
                  type="text"
                  name="name"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-primary-card border-2 border-border-color rounded-md text-white text-sm sm:text-base transition-all duration-300 focus:border-accent-red focus:shadow-lg focus:shadow-accent-red/20 placeholder-text-secondary"
                />
              </div>
            </div>

            <div className="mb-4 sm:mb-5">
              <div className="relative flex items-center">
                <Mail className="absolute left-3 sm:left-4 text-text-secondary z-10" size={18} />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-primary-card border-2 border-border-color rounded-md text-white text-sm sm:text-base transition-all duration-300 focus:border-accent-red focus:shadow-lg focus:shadow-accent-red/20 placeholder-text-secondary"
                />
              </div>
            </div>

            <div className="mb-4 sm:mb-5">
              <div className="relative flex items-center">
                <Lock className="absolute left-3 sm:left-4 text-text-secondary z-10" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 bg-primary-card border-2 border-border-color rounded-md text-white text-sm sm:text-base transition-all duration-300 focus:border-accent-red focus:shadow-lg focus:shadow-accent-red/20 placeholder-text-secondary"
                />
                <button
                  type="button"
                  className="absolute right-3 sm:right-4 text-text-secondary p-1 rounded transition-colors duration-300 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="mb-4 sm:mb-5">
              <div className="relative flex items-center">
                <Lock className="absolute left-3 sm:left-4 text-text-secondary z-10" size={18} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 bg-primary-card border-2 border-border-color rounded-md text-white text-sm sm:text-base transition-all duration-300 focus:border-accent-red focus:shadow-lg focus:shadow-accent-red/20 placeholder-text-secondary"
                />
                <button
                  type="button"
                  className="absolute right-3 sm:right-4 text-text-secondary p-1 rounded transition-colors duration-300 hover:text-white"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-accent-red text-white py-3 sm:py-4 rounded-md text-sm sm:text-base font-semibold cursor-pointer transition-all duration-300 hover:bg-red-700 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed mb-4 sm:mb-5"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>

            <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-white/5 rounded-md border border-white/10 text-center text-xs text-text-secondary">
              <p className="mb-2">
                By signing up, you agree to our{' '}
                <Link to="/terms" className="text-accent-red hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-accent-red hover:underline">Privacy Policy</Link>
              </p>
            </div>

            <div className="text-center mb-4 sm:mb-5 relative">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-border-color"></div>
              <span className="bg-black/80 px-4 sm:px-5 text-text-secondary text-xs sm:text-sm">Already have an account?</span>
            </div>

            <Link to="/login" className="block w-full text-center py-3 sm:py-4 bg-transparent border border-border-color text-white rounded-md font-semibold transition-all duration-300 hover:bg-white/10 hover:border-white text-sm sm:text-base">
              Sign in now
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;