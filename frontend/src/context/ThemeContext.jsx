// import React, { createContext, useState, useEffect } from 'react'

// export const ThemeContext = createContext()

// export const ThemeProvider = ({ children }) => {
//   const [isDark, setIsDark] = useState(() => {
//     const saved = localStorage.getItem('isDark')
//     return saved ? JSON.parse(saved) : false
//   })

//   useEffect(() => {
//     localStorage.setItem('isDark', JSON.stringify(isDark))
//     if (isDark) {
//       document.documentElement.classList.add('dark')
//     } else {
//       document.documentElement.classList.remove('dark')
//     }
//   }, [isDark])

//   const toggle = () => setIsDark(!isDark)

//   return <ThemeContext.Provider value={{ isDark, toggle }}>{children}</ThemeContext.Provider>
// }


import React, { createContext, useState, useEffect, useContext } from 'react'

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('isDark')
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    localStorage.setItem('isDark', JSON.stringify(isDark))
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  const toggle = () => setIsDark(!isDark)

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

/* ✅ ADD THIS CUSTOM HOOK */
export const useTheme = () => {
  return useContext(ThemeContext)
}
