import React, { useState, useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import api from '../services/api'

export default function Contact() {
  const { isDark } = useContext(ThemeContext)
 const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error('All fields required!')
      return
    }

    try {
      setLoading(true)
      await api.post('/contact/submit', form)
      toast.success('Message sent successfully! We will contact you soon.')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50'} py-16`}>
      <ToastContainer theme={isDark ? 'dark' : 'light'} />
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-5xl font-bold text-center mb-4">Contact Us</h1>
        <p className={`text-center mb-12 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Have questions or suggestions? We'd love to hear from you!
        </p>

        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-8`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-semibold mb-2">Name</label>
              <input 
                type="text"
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
                className={`w-full p-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Email</label>
              <input 
                type="email"
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
                className={`w-full p-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Subject</label>
              <input 
                type="text"
                value={form.subject}
                onChange={(e) => setForm({...form, subject: e.target.value})}
                className={`w-full p-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}
                placeholder="Topic"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Message</label>
              <textarea 
                value={form.message}
                onChange={(e) => setForm({...form, message: e.target.value})}
                className={`w-full p-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}
                rows="6"
                placeholder="Your message..."
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg font-semibold transition"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
