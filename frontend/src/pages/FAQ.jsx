import React, { useContext, useState } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

export default function FAQ() {
  const { isDark } = useContext(ThemeContext)
  const [activeIndex, setActiveIndex] = useState(null)

  const faqs = [
    {
      q: 'What is InterCracker?',
      a: 'InterCracker is a platform with 72+ curated interview questions to help you prepare for technical interviews across Java, MERN, Python, and Testing.'
    },
    {
      q: 'Do I need to create an account?',
      a: 'Yes, you need to register and login to access all the features including question filtering, progress tracking, and admin functionalities.'
    },
    {
      q: 'Is the platform free?',
      a: 'Yes! InterCracker is completely free to use. All questions and features are available without any subscription.'
    },
    {
      q: 'Can I suggest new questions?',
      a: 'Absolutely! You can use the Contact form or the suggestion feature to recommend new questions. Our admin team reviews all submissions.'
    },
    {
      q: 'How do I become an admin?',
      a: 'You can request admin access through the registration process. Your request will be reviewed and approved by our SuperAdmin team.'
    },
    {
      q: 'Is my data secure?',
      a: 'Yes, we take security seriously. All your data is encrypted and stored securely in our database.'
    },
    {
      q: 'Can I export questions?',
      a: 'Not currently, but we\'re working on adding an export feature. Stay tuned for updates!'
    },
    {
      q: 'How often are new questions added?',
      a: 'We regularly update our question bank. Follow us for announcements about new content.'
    }
  ]

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50'} py-16`}>
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-5xl font-bold text-center mb-4">Frequently Asked Questions</h1>
        <p className={`text-center mb-12 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Find answers to common questions about InterCracker
        </p>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <FAQItem 
              key={idx}
              question={faq.q}
              answer={faq.a}
              isOpen={activeIndex === idx}
              onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
              isDark={isDark}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function FAQItem({ question, answer, isOpen, onClick, isDark }) {
  return (
    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
      <button 
        onClick={onClick}
        className={`w-full p-6 flex justify-between items-center hover:bg-opacity-80 transition ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
      >
        <h3 className="font-bold text-lg text-left">{question}</h3>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      
      {isOpen && (
        <div className={`px-6 pb-6 ${isDark ? 'border-t border-gray-700 text-gray-300' : 'border-t border-gray-200 text-gray-700'}`}>
          {answer}
        </div>
      )}
    </div>
  )
}
