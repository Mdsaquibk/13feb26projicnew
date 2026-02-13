// import React, { useState, useEffect, useContext } from 'react'
// import { FaArrowUp } from 'react-icons/fa'
// import { ThemeContext } from '../context/ThemeContext'

// export default function BackToTop() {
//   const { isDark } = useContext(ThemeContext)
//   const [isVisible, setIsVisible] = useState(false)

//   const toggleVisibility = () => {
//     setIsVisible(window.scrollY > 300)
//   }

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' })
//   }

//   useEffect(() => {
//     window.addEventListener('scroll', toggleVisibility)
//     return () => window.removeEventListener('scroll', toggleVisibility)
//   }, [])

//   return isVisible ? (
//     <button
//       onClick={scrollToTop}
//       className={`fixed bottom-8 right-8 ${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white p-4 rounded-full shadow-lg hover:shadow-xl transition z-40 animate-pulse`}
//       aria-label="Back to top"
//     >
//       <FaArrowUp size={20} />
//     </button>
//   ) : null
// }
import React, { useEffect, useState } from 'react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full shadow-lg z-50"
      >
        ↑
      </button>
    )
  )
}
