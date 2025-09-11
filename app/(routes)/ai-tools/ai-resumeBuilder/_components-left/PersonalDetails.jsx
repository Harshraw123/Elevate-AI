import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { User, Mail, Phone, MapPin, Briefcase, Save, AlertCircle, CheckCircle2 } from 'lucide-react'
import { useResumeInfo } from '@/context/ResumeInfoContext'
import { Button } from '@/components/ui/button'

const PersonalDetails = ({ onComplete,setActiveFormIndex,activeFormIndex }) => {
  const { resumeInfo, updatePersonalDetails } = useResumeInfo()
  
  const [formData, setFormData] = useState({
    firstName: resumeInfo?.firstName || '',
    lastName: resumeInfo?.lastName || '',
    jobTitle: resumeInfo?.jobTitle || '',
    email: resumeInfo?.email || '',
    phone: resumeInfo?.phone || '',
    address: resumeInfo?.address || '',
    city: resumeInfo?.city || '',
    state: resumeInfo?.state || '',
    zipCode: resumeInfo?.zipCode || '',
    linkedin: resumeInfo?.linkedin || '',
    website: resumeInfo?.website || '',
  })

  const [errors, setErrors] = useState({})

  // Update form data when context changes
  useEffect(() => {
    if (resumeInfo) {
      setFormData({
        firstName: resumeInfo.firstName || '',
        lastName: resumeInfo.lastName || '',
        jobTitle: resumeInfo.jobTitle || '',
        email: resumeInfo.email || '',
        phone: resumeInfo.phone || '',
        address: resumeInfo.address || '',
        city: resumeInfo.city || '',
        state: resumeInfo.state || '',
        zipCode: resumeInfo.zipCode || '',
        linkedin: resumeInfo.linkedin || '',
        website: resumeInfo.website || '',
      })
    }
  }, [resumeInfo])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    const updatedFormData = {
      ...formData,
      [name]: value
    }
    
    setFormData(updatedFormData)
    
    // Update context immediately for real-time preview
    updatePersonalDetails(updatedFormData)
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job title is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
   
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Check if form is complete for enabling next button
  useEffect(() => {
    const isComplete = formData.firstName && formData.lastName && formData.jobTitle && 
                      formData.email && formData.phone && formData.address
                  
    onComplete(isComplete)
  }, [formData, onComplete])

  const handleSave=(e)=>{
    e.preventDefault()
    setActiveFormIndex(activeFormIndex+1)
    
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-2xl rounded-3xl overflow-hidden">
        {/* Header Section */}
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="text-center">
              <CardTitle className="text-3xl font-bold mb-2">Personal Details</CardTitle>
              <p className="text-blue-100 text-lg">Let's start building your professional profile</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-2 mt-6">
            <div className="bg-white h-2 rounded-full transition-all duration-500" style={{ width: `${(Object.values(formData).filter(Boolean).length / 6) * 100}%` }}></div>
          </div>
          <p className="text-center text-blue-100 mt-2 text-sm">
            {Object.values(formData).filter(Boolean).length} of 6 fields completed
          </p>
        </CardHeader>
        
        <CardContent className="p-8">
          <form className="space-y-8">
            {/* Name Section */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                Full Name
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    First Name *
                  </label>
                  <div className="relative">
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter your first name"
                      className={`h-12 px-4 text-gray-800 bg-gray-50 border-2 rounded-xl transition-all duration-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 ${
                        errors.firstName ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : 'border-gray-200'
                      }`}
                    />
                    {formData.firstName && !errors.firstName && (
                      <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                    {errors.firstName && (
                      <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                    )}
                  </div>
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.firstName}
                    </p>
                  )}
                </div>
                
                
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Last Name *
                  </label>
                  <div className="relative">
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter your last name"
                      className={`h-12 px-4 text-gray-800 bg-gray-50 border-2 rounded-xl transition-all duration-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 ${
                        errors.lastName ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : 'border-gray-200'
                      }`}
                    />
                    {formData.lastName && !errors.lastName && (
                      <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                    {errors.lastName && (
                      <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                    )}
                  </div>
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Job Title Section */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-white" />
                </div>
                Professional Role
              </h3>
              
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Job Title *
                </label>
                <div className="relative">
                  <Input
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    placeholder="e.g., Software Engineer, Marketing Manager, Data Scientist"
                    className={`h-12 px-4 text-gray-800 bg-gray-50 border-2 rounded-xl transition-all duration-200 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-100 ${
                      errors.jobTitle ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : 'border-gray-200'
                    }`}
                  />
                  {formData.jobTitle && !errors.jobTitle && (
                    <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                  )}
                  {errors.jobTitle && (
                    <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                  )}
                </div>
                {errors.jobTitle && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.jobTitle}
                  </p>
                )}
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                Contact Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="flex text-sm font-semibold text-gray-700 mb-3 items-center gap-2">
                    <Mail className="w-4 h-4 text-green-600" />
                    Email Address *
                  </label>
                  <div className="relative">
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className={`h-12 px-4 text-gray-800 bg-gray-50 border-2 rounded-xl transition-all duration-200 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-100 ${
                        errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : 'border-gray-200'
                      }`}
                    />
                    {formData.email && !errors.email && (
                      <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                    {errors.email && (
                      <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                    )}
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </p>
                  )}
                </div>
                
                <div className="group">
                  <label className="flex text-sm font-semibold text-gray-700 mb-3 items-center gap-2">
                    <Phone className="w-4 h-4 text-green-600" />
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(555) 123-4567"
                      className={`h-12 px-4 text-gray-800 bg-gray-50 border-2 rounded-xl transition-all duration-200 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-100 ${
                        errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : 'border-gray-200'
                      }`}
                    />
                    {formData.phone && !errors.phone && (
                      <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                    {errors.phone && (
                      <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                    )}
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                Location
              </h3>
              
              <div className="space-y-4">
                <div className="group">
                  <label className="flex text-sm font-semibold text-gray-700 mb-3 items-center gap-2">
                    <MapPin className="w-4 h-4 text-orange-600" />
                    Address *
                  </label>
                  <div className="relative">
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="123 Main Street"
                      className={`h-12 px-4 text-gray-800 bg-gray-50 border-2 rounded-xl transition-all duration-200 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 ${
                        errors.address ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : 'border-gray-200'
                      }`}
                    />
                    {formData.address && !errors.address && (
                      <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                    {errors.address && (
                      <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                    )}
                  </div>
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.address}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      City
                    </label>
                    <div className="relative">
                      <Input
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="New York"
                        className="h-12 px-4 text-gray-800 bg-gray-50 border-2 rounded-xl transition-all duration-200 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 border-gray-200"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      State
                    </label>
                    <div className="relative">
                      <Input
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="NY"
                        className="h-12 px-4 text-gray-800 bg-gray-50 border-2 rounded-xl transition-all duration-200 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 border-gray-200"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Zip Code
                    </label>
                    <div className="relative">
                      <Input
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="10001"
                        className="h-12 px-4 text-gray-800 bg-gray-50 border-2 rounded-xl transition-all duration-200 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 border-gray-200"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Links Section */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                Professional Links
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    LinkedIn Profile
                  </label>
                  <div className="relative">
                    <Input
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      placeholder="https://linkedin.com/in/yourprofile"
                      className="h-12 px-4 text-gray-800 bg-gray-50 border-2 rounded-xl transition-all duration-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 border-gray-200"
                    />
                  </div>
                </div>
                
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Website/Portfolio
                  </label>
                  <div className="relative">
                    <Input
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://yourwebsite.com"
                      className="h-12 px-4 text-gray-800 bg-gray-50 border-2 rounded-xl transition-all duration-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 border-gray-200"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-center pt-6">
              <Button 
                onClick={handleSave}  
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
              >
                <Save className="w-5 h-5" />
                Save & Continue
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default PersonalDetails
