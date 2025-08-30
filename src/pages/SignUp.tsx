import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, Lock, Building2, Users, Truck, Package, Wrench, AlertCircle, CheckCircle } from 'lucide-react';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: '',
    subUserType: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userTypes = [
    { value: 'industry', label: 'Industry', icon: Building2, description: 'Post requirements and hire professionals' },
    { value: 'professional', label: 'Professional', icon: Users, description: 'Find opportunities and showcase expertise' },
    { value: 'vendor', label: 'Vendor', icon: Package, description: 'Provide services and submit quotations' }
  ];

  const vendorSubTypes = [
    { value: 'service', label: 'Service Vendors', icon: Wrench, description: 'Provide professional services' },
    { value: 'inventory', label: 'Inventory Vendors', icon: Package, description: 'Supply products and materials' },
    { value: 'logistics', label: 'Logistics Vendors', icon: Truck, description: 'Transportation and delivery services' }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required field validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    if (!formData.userType) newErrors.userType = 'Please select a user type';

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (formData.phone && !/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Password validation
    if (formData.password && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    // Password confirmation
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Vendor sub-type validation
    if (formData.userType === 'vendor' && !formData.subUserType) {
      newErrors.subUserType = 'Please select a vendor type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleUserTypeChange = (userType: string) => {
    setFormData(prev => ({
      ...prev,
      userType,
      subUserType: userType !== 'vendor' ? '' : prev.subUserType
    }));
    if (errors.userType) {
      setErrors(prev => ({ ...prev, userType: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Account created successfully! Please check your email for verification.');
      // In real app, redirect to login or dashboard
    } catch (error) {
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A2A4F] to-[#2F80ED] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        {/* <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 text-white hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center font-bold">
              D
            </div>
            <span className="text-2xl font-bold">Deligence.ai</span>
          </Link>
        </div> */}

        {/* Sign Up Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 max-h-[93vh]">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#333333] mb-2">Create Your Account</h2>
            <p className="text-[#828282]">Join thousands of professionals and businesses</p>
          </div>
          <div className='max-h-[60vh] overflow-y-auto scrollable'>
            <form onSubmit={handleSubmit} className="space-y-4 p-2">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-[#333333] mb-2">
                    First Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#828282] w-4 h-4" />
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F80ED] focus:border-transparent ${errors.firstName ? 'border-red-500' : 'border-[#E0E0E0]'
                        }`}
                      placeholder="Enter your first name"
                    />
                  </div>
                  {errors.firstName && (
                    <div className="flex items-center space-x-1 mt-1">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-red-500 text-sm">{errors.firstName}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-[#333333] mb-2">
                    Last Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#828282] w-4 h-4" />
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F80ED] focus:border-transparent ${errors.lastName ? 'border-red-500' : 'border-[#E0E0E0]'
                        }`}
                      placeholder="Enter your last name"
                    />
                  </div>
                  {errors.lastName && (
                    <div className="flex items-center space-x-1 mt-1">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-red-500 text-sm">{errors.lastName}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#333333] mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#828282] w-4 h-4" />
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F80ED] focus:border-transparent ${errors.phone ? 'border-red-500' : 'border-[#E0E0E0]'
                        }`}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  {errors.phone && (
                    <div className="flex items-center space-x-1 mt-1">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-red-500 text-sm">{errors.phone}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#333333] mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#828282] w-4 h-4" />
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F80ED] focus:border-transparent ${errors.email ? 'border-red-500' : 'border-[#E0E0E0]'
                        }`}
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && (
                    <div className="flex items-center space-x-1 mt-1">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-red-500 text-sm">{errors.email}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-[#333333] mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#828282] w-4 h-4" />
                    <input
                      type="password"
                      id="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F80ED] focus:border-transparent ${errors.password ? 'border-red-500' : 'border-[#E0E0E0]'
                        }`}
                      placeholder="Create a password"
                    />
                  </div>
                  {errors.password && (
                    <div className="flex items-center space-x-1 mt-1">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-red-500 text-sm">{errors.password}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#333333] mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#828282] w-4 h-4" />
                    <input
                      type="password"
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F80ED] focus:border-transparent ${errors.confirmPassword ? 'border-red-500' : 'border-[#E0E0E0]'
                        }`}
                      placeholder="Confirm your password"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <div className="flex items-center space-x-1 mt-1">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-red-500 text-sm">{errors.confirmPassword}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* User Type Selection */}
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-3">
                  User Type *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {userTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <div
                        key={type.value}
                        onClick={() => handleUserTypeChange(type.value)}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${formData.userType === type.value
                          ? 'border-[#2F80ED] bg-[#2F80ED]/5'
                          : 'border-[#E0E0E0] hover:border-[#2F80ED]/50'
                          }`}
                      >
                        <div className='flex flex-row justify-center'>
                          <div className="text-center flex">
                            <Icon className={`w-5 h-5 mx-2 ${formData.userType === type.value ? 'text-[#2F80ED]' : 'text-[#828282]'
                              }`} />
                            <h3 className="font-medium text-[#333333] ">{type.label}</h3>
                            {/* <p className="text-xs text-[#828282]">{type.description}</p> */}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {errors.userType && (
                  <div className="flex items-center space-x-1 mt-2">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <span className="text-red-500 text-sm">{errors.userType}</span>
                  </div>
                )}
              </div>

              {/* Vendor Sub-Type Selection */}
              {formData.userType === 'vendor' && (
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-3">
                    Vendor Type *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {vendorSubTypes.map((subType) => {
                      const Icon = subType.icon;
                      return (
                        <div
                          key={subType.value}
                          onClick={() => handleInputChange('subUserType', subType.value)}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${formData.subUserType === subType.value
                            ? 'border-[#F2994A] bg-[#F2994A]/5'
                            : 'border-[#E0E0E0] hover:border-[#F2994A]/50'
                            }`}
                        >
                          <div className="text-center flex flex-row">
                            <Icon className={`w-5 h-5 mx-1 ${formData.subUserType === subType.value ? 'text-[#F2994A]' : 'text-[#828282]'
                              }`} />
                            <h4 className="font-medium text-[#333333] text-sm">{subType.label}</h4>
                            {/* <p className="text-xs text-[#828282]">{subType.description}</p> */}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {errors.subUserType && (
                    <div className="flex items-center space-x-1 mt-2">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-red-500 text-sm">{errors.subUserType}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 text-[#2F80ED] border-[#E0E0E0] rounded focus:ring-[#2F80ED] mt-1"
                  required
                />
                <label htmlFor="terms" className="text-sm text-[#828282]">
                  I agree to the{' '}
                  <a href="#" className="text-[#2F80ED] hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-[#2F80ED] hover:underline">Privacy Policy</a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#2F80ED] text-white py-3 rounded-lg hover:bg-[#1A2A4F] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Create Account</span>
                  </>
                )}
              </button>
            </form>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-[#828282]">
              Already have an account?{' '}
              <Link to="/login" className="text-[#2F80ED] hover:underline font-medium">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;