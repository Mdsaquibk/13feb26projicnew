import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { FaCode, FaGraduationCap, FaChartLine, FaHeadset } from 'react-icons/fa'

export default function Services() {
  const { isDark } = useContext(ThemeContext)

  const services = [
    {
      icon: <FaCode />,
      title: 'Practice Questions',
      description: '72+ curated interview questions across multiple technologies'
    },
    {
      icon: <FaGraduationCap />,
      title: 'Learning Resources',
      description: 'Detailed explanations and solutions for every question'
    },
    {
      icon: <FaChartLine />,
      title: 'Progress Tracking',
      description: 'Monitor your improvement with detailed analytics'
    },
    {
      icon: <FaHeadset />,
      title: 'Support',
      description: '24/7 customer support and community assistance'
    }
  ]

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50'} py-16`}>
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-12">Our Services</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} isDark={isDark} />
          ))}
        </div>

        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-12`}>
          <h2 className="text-3xl font-bold mb-6">Why Choose InterCracker?</h2>
          <ul className={`space-y-4 text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <li>✅ Industry-standard questions</li>
            <li>✅ Comprehensive explanations</li>
            <li>✅ Regular updates with new content</li>
            <li>✅ Beautiful and intuitive interface</li>
            <li>✅ Dark mode support</li>
            <li>✅ Responsive design for all devices</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function ServiceCard({ icon, title, description, isDark }) {
  return (
    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg shadow-lg hover:shadow-xl transition`}>
      <div className="text-5xl text-blue-500 mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{description}</p>
    </div>
  )
}
