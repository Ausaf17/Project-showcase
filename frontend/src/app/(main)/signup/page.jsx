"use client"

import { useState } from "react"
import * as yup from "yup"
import axios from "axios"
import { Toaster, toast } from "react-hot-toast"
import { User, Mail } from "lucide-react"
import Image from "next/image"

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required").min(3, "Name must be at least 3 characters"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await validationSchema.validate(formData, { abortEarly: false })
      setErrors({})
      // Send data to the backend
      const response = await axios.post("http://localhost:5000/user/add", formData)
      toast.success("User registered successfully!")
      console.log("Response:", response.data)
    } catch (validationErrors) {
      if (validationErrors.name === "ValidationError") {
        const formattedErrors = {}
        validationErrors.inner.forEach((error) => {
          formattedErrors[error.path] = error.message
        })
        setErrors(formattedErrors)
        toast.error("Validation errors occurred. Please check your inputs.")
      } else {
        console.error("Error submitting form:", validationErrors)
        toast.error("An error occurred while submitting the form.")
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Toaster />
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full grid md:grid-cols-2">
        {/* Left Side - Illustration */}
        <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-8 flex items-center justify-center relative overflow-hidden">
          <div className="relative z-10">
            <Image
              src="https://static.vecteezy.com/system/resources/previews/021/943/689/non_2x/college-project-study-for-college-entrance-exam-university-concept-modern-flat-illustration-vector.jpg"
              alt="Digital Insurance Illustration"
              width={400}
              height={400}
              className="w-full h-auto max-w-sm"
            />
          </div>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full"></div>
            <div className="absolute top-20 right-20 w-1 h-1 bg-white rounded-full"></div>
            <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-white rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              One click to go <span className="text-blue-500">Digital Insurance.</span>
            </h1>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Sign up</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Email Address */}
              <div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              {/* Terms and Privacy */}
              <div className="text-sm text-gray-500 mb-6">
                You are agreeing to the{" "}
                <a href="#" className="text-blue-500 hover:underline">
                  Terms of services
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-500 hover:underline">
                  privacy policy
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Get Started
              </button>
            </form>

            {/* Sign In Link */}
            <div className="text-center mt-6">
              <span className="text-gray-500">Already a member? </span>
              <a href="#" className="text-blue-500 hover:underline font-medium">
                Sign in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
