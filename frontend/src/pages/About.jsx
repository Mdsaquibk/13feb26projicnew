import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { FaLightbulb, FaShieldAlt, FaUsers } from 'react-icons/fa'

export default function About() {
  const { isDark } = useContext(ThemeContext)

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50'} py-16`}>
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-8">About InterCracker</h1>
        
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-12 mb-12`}>
          <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            InterCracker is a comprehensive platform designed to help individuals ace their technical interviews. 
            With over 72 expertly curated questions across multiple programming languages and technologies, 
            we provide everything you need to succeed.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <FeatureCard 
              icon={<FaLightbulb />}
              title="Expert Content"
              description="Questions created by industry professionals"
              isDark={isDark}
            />
            <FeatureCard 
              icon={<FaShieldAlt />}
              title="Secure Platform"
              description="Your data is safe and secure with us"
              isDark={isDark}
            />
            <FeatureCard 
              icon={<FaUsers />}
              title="Community"
              description="Learn from and help others in our community"
              isDark={isDark}
            />
          </div>
        </div>

        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-12`}>
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-lg leading-relaxed`}>
            To empower developers worldwide by providing high-quality interview preparation materials 
            and fostering a supportive community where knowledge is shared freely.
          </p>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description, isDark }) {
  return (
    <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} p-8 rounded-lg text-center`}>
      <div className="text-5xl text-blue-500 mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{description}</p>
    </div>
  )
}
