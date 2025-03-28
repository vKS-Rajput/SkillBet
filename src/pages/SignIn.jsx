import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, db } from '../Firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { FaGamepad, FaCode, FaGoogle, FaGithub, FaEye, FaEyeSlash } from 'react-icons/fa';
import { SiBitcoinsv } from 'react-icons/si';
import { motion, AnimatePresence } from 'framer-motion';

// Constants for better maintainability
const AUTH_TYPES = {
  SIGN_IN: 'signin',
  SIGN_UP: 'signup'
};

const AuthPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullname: '',
    confirmPassword: ''
  });
  const [activeTab, setActiveTab] = useState(AUTH_TYPES.SIGN_IN);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Check if user is already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/dashboard');
      }
    });
    return unsubscribe;
  }, [navigate]);

  // Memoized handleChange to prevent unnecessary re-renders
  const handleChange = useCallback((e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ''
      }));
    }
  }, [errors]);

  // Memoized validation function
  const validateForm = useCallback(() => {
    const newErrors = {};
    
    if (activeTab === AUTH_TYPES.SIGN_UP) {
      if (!formData.fullname.trim()) newErrors.fullname = 'Full name is required';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [activeTab, formData]);

  // Memoized auth handler
  const handleAuth = useCallback(async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      if (activeTab === AUTH_TYPES.SIGN_IN) {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        toast.success('Signed in successfully!', { position: 'bottom-right' });
        navigate('/dashboard');
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        await setDoc(doc(db, "users", userCredential.user.uid), {
          email: formData.email,
          fullname: formData.fullname,
          createdAt: new Date()
        });
        toast.success(`${formData.fullname} registered successfully!`, { position: 'bottom-right' });
        navigate('/dashboard');
      }
    } catch (error) {
      let errorMessage = error.message;
      // More user-friendly error messages
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email already in use. Please sign in instead.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'User not found. Please check your email or sign up.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.';
      }
      toast.error(errorMessage, { position: 'bottom-right' });
    } finally {
      setIsSubmitting(false);
    }
  }, [activeTab, formData, validateForm, navigate]);

  // Memoized social login handler
  const handleSocialLogin = useCallback(async (providerName) => {
    let provider;
    if (providerName === 'google') {
      provider = new GoogleAuthProvider();
    } else if (providerName === 'github') {
      provider = new GithubAuthProvider();
    } else {
      return;
    }

    try {
      setIsSubmitting(true);
      await signInWithPopup(auth, provider);
      toast.success('Signed in successfully!', { position: 'bottom-right' });
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message, { position: 'bottom-right' });
    } finally {
      setIsSubmitting(false);
    }
  }, [navigate]);

  // Background elements memoized to prevent re-creation on every render
  const backgroundElements = useMemo(() => (
    [...Array(20)].map((_, i) => (
      <motion.div
        key={`bg-${i}`}
        className="absolute"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: 0.3 + Math.random() * 0.4,
          transform: `scale(${0.5 + Math.random()})`,
          filter: `blur(${Math.random() * 2}px)`
        }}
        animate={{
          y: [0, 10, 0],
          rotate: [0, Math.random() * 20 - 10]
        }}
        transition={{
          duration: 5 + Math.random() * 10,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        }}
      >
        {Math.random() > 0.5 ? 
          <FaCode className="text-cyan-400" /> : 
          <FaGamepad className="text-purple-400" />
        }
      </motion.div>
    ))
  ), []);

  // Input field component for better reusability
  const InputField = React.useCallback(({ 
    id, 
    label, 
    type, 
    value, 
    onChange, 
    error, 
    placeholder, 
    showPasswordToggle = false,
    onTogglePassword,
    icon
  }) => (
    <div>
      <label htmlFor={id} className="block font-mono text-sm text-gray-300 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-3 bg-gray-700/50 border ${error ? 'border-red-500' : 'border-gray-600/50'} rounded-lg font-mono text-white focus:outline-none focus:ring-2 ${icon ? 'pl-10' : ''} ${activeTab === AUTH_TYPES.SIGN_IN ? 'focus:ring-cyan-400/50' : 'focus:ring-purple-400/50'} focus:border-transparent`}
          placeholder={placeholder}
        />
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        {showPasswordToggle && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400"
            onClick={onTogglePassword}
          >
            {type === 'text' ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
      {error && <p className="mt-1 font-mono text-xs text-red-400">{error}</p>}
    </div>
  ), [activeTab]);

  // Submit button component
  const SubmitButton = React.useCallback(({ isSubmitting, label, isSignIn }) => (
    <button
      type="submit"
      disabled={isSubmitting}
      className={`w-full py-3 px-4 bg-gradient-to-r ${isSignIn ? 'from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700' : 'from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700'} rounded-lg font-mono font-bold text-white shadow-lg transition-all duration-300 flex items-center justify-center`}
    >
      {isSubmitting ? (
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full"
        />
      ) : (
        label
      )}
    </button>
  ), []);

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {backgroundElements}
      </div>

      {/* Glowing elements */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-cyan-600 filter blur-[100px] opacity-10"
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-600 filter blur-[100px] opacity-10"
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 6, repeat: Infinity, delay: 2 }}
      />

      <div className="container mx-auto px-5 py-20 flex items-center justify-center min-h-screen">
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-gray-800/70 backdrop-blur-md rounded-xl border border-gray-700/50 overflow-hidden shadow-2xl relative"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-700/50">
            <motion.div 
              className="flex items-center justify-center mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <FaGamepad className="text-2xl text-purple-400 mr-3" />
              <FaCode className="text-xl text-cyan-400" />
              <h2 className="font-mono text-2xl font-bold ml-2">
                code<span className="text-yellow-400">Game</span>BET
              </h2>
            </motion.div>
            <p className="text-center text-gray-400 font-mono text-sm">
              {activeTab === AUTH_TYPES.SIGN_IN ? 'Sign in to start competing' : 'Create your free account'}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-700/50 relative">
            <button
              onClick={() => setActiveTab(AUTH_TYPES.SIGN_IN)}
              className={`flex-1 py-4 font-mono text-sm font-medium z-10 ${activeTab === AUTH_TYPES.SIGN_IN ? 'text-cyan-400' : 'text-gray-400 hover:text-white'}`}
            >
              SIGN IN
            </button>
            <button
              onClick={() => setActiveTab(AUTH_TYPES.SIGN_UP)}
              className={`flex-1 py-4 font-mono text-sm font-medium z-10 ${activeTab === AUTH_TYPES.SIGN_UP ? 'text-purple-400' : 'text-gray-400 hover:text-white'}`}
            >
              SIGN UP
            </button>
            <motion.div
              className="absolute bottom-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500"
              initial={false}
              animate={{
                left: activeTab === AUTH_TYPES.SIGN_IN ? '0%' : '50%',
                width: '50%'
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            />
          </div>

          {/* Form */}
          <div className="p-6">
            <form onSubmit={handleAuth}>
              <AnimatePresence mode="wait">
                {activeTab === AUTH_TYPES.SIGN_IN ? (
                  <motion.div
                    key="signin"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <InputField
                      id="email"
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      placeholder="player@codegamebet.com"
                    />
                    <InputField
                      id="password"
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      error={errors.password}
                      placeholder="••••••••"
                      showPasswordToggle={true}
                      onTogglePassword={() => setShowPassword(!showPassword)}
                    />
                    <SubmitButton 
                      isSubmitting={isSubmitting} 
                      label="SIGN IN" 
                      isSignIn={true} 
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="signup"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <InputField
                      id="fullname"
                      label="Full Name"
                      type="text"
                      value={formData.fullname}
                      onChange={handleChange}
                      error={errors.fullname}
                      placeholder="Game Coder"
                    />
                    <InputField
                      id="email"
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      placeholder="player@codegamebet.com"
                    />
                    <InputField
                      id="password"
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      error={errors.password}
                      placeholder="••••••••"
                      showPasswordToggle={true}
                      onTogglePassword={() => setShowPassword(!showPassword)}
                    />
                    <InputField
                      id="confirmPassword"
                      label="Confirm Password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      error={errors.confirmPassword}
                      placeholder="••••••••"
                      showPasswordToggle={true}
                      onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                    <SubmitButton 
                      isSubmitting={isSubmitting} 
                      label="CREATE ACCOUNT" 
                      isSignIn={false} 
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700/50" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-800/70 font-mono text-gray-400">
                    OR CONTINUE WITH
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <motion.button
                  type="button"
                  onClick={() => handleSocialLogin('google')}
                  disabled={isSubmitting}
                  className="flex items-center justify-center py-2 px-4 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGoogle className="text-red-400 mr-2" />
                  <span className="font-mono text-sm">Google</span>
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => handleSocialLogin('github')}
                  disabled={isSubmitting}
                  className="flex items-center justify-center py-2 px-4 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub className="mr-2" />
                  <span className="font-mono text-sm">GitHub</span>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-900/30 text-center">
            <p className="font-mono text-xs text-gray-500">
              By signing in, you agree to our{' '}
              <a href="#" className="text-cyan-400 hover:underline">Terms</a> and{' '}
              <a href="#" className="text-cyan-400 hover:underline">Privacy Policy</a>.
            </p>
            <div className="mt-2 flex items-center justify-center">
              <SiBitcoinsv className="text-yellow-400 mr-2" />
              <span className="font-mono text-xs text-gray-500">Cryptocurrency rewards available</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default React.memo(AuthPage);