'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Image from 'next/image'

interface AttendeeEntry {
  fullName: string
  organisation: string
  email: string
  phone: string
}

export default function AttendancePage() {
  const [formData, setFormData] = useState<AttendeeEntry>({
    fullName: '',
    organisation: '',
    email: '',
    phone: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [view, setView] = useState<'form' | 'success'>('form')
  const [successName, setSuccessName] = useState('')
  const [formError, setFormError] = useState<string | null>(null)
  const [registeredCount, setRegisteredCount] = useState(0)
  const nameInputRef = useRef<HTMLInputElement>(null)

  const updateField = (field: keyof AttendeeEntry, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (formError) setFormError(null)
  }

  const handleRegisterAnother = () => {
    setFormData({ fullName: '', organisation: '', email: '', phone: '' })
    setView('form')
    setFormError(null)
    setTimeout(() => nameInputRef.current?.focus(), 100)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.fullName || !formData.organisation || !formData.email || !formData.phone) {
      setFormError('Please fill in all fields')
      return
    }

    setIsSubmitting(true)
    setFormError(null)

    try {
      const response = await fetch('/api/attendance/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.status === 409) {
        setFormError(`${data.fullName} has already been registered`)
        return
      }

      if (data.success) {
        setRegisteredCount(prev => prev + 1)
        setSuccessName(formData.fullName)
        setView('success')
      } else {
        setFormError(data.error || 'Registration failed. Please try again.')
      }
    } catch {
      setFormError('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0F766E] via-[#115E59] to-[#134E4A]">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-white/[0.03]" />
        <div className="absolute -bottom-60 -left-60 w-[600px] h-[600px] rounded-full bg-white/[0.03]" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-[#F59E0B]/[0.04]" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-8">
        {/* Logo & Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative h-14 md:h-16 w-auto">
              <Image
                src="/CancafLogoRemBg.png"
                alt="CanCAF Logo"
                width={280}
                height={95}
                className="h-14 md:h-16 w-auto"
                priority
              />
            </div>
          </div>

          <div className="space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-[family-name:var(--font-montserrat)] leading-tight"
            >
              Welcome to the Launch of
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
            >
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#F59E0B] font-[family-name:var(--font-montserrat)]">
                Cancer Care Africa Foundation
              </h2>
              <p className="text-white/50 text-sm md:text-base mt-1">(CanCAF)</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Registration Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/[0.08] backdrop-blur-xl rounded-3xl border border-white/[0.12] shadow-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              {view === 'form' ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Card Header */}
                  <div className="px-6 pt-6 pb-4 text-center border-b border-white/[0.08]">
                    <p className="text-white/90 text-sm font-medium">
                      Please enter your details to register your attendance
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">
                        Full Name
                      </label>
                      <input
                        ref={nameInputRef}
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => updateField('fullName', e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.07] border border-white/[0.12] text-white placeholder:text-white/30 focus:bg-white/[0.1] focus:border-[#F59E0B]/50 focus:ring-2 focus:ring-[#F59E0B]/20 outline-none transition-all text-sm"
                        autoFocus
                      />
                    </div>

                    <div>
                      <label htmlFor="organisation" className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">
                        Organisation
                      </label>
                      <input
                        id="organisation"
                        type="text"
                        value={formData.organisation}
                        onChange={(e) => updateField('organisation', e.target.value)}
                        placeholder="Enter your organisation"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.07] border border-white/[0.12] text-white placeholder:text-white/30 focus:bg-white/[0.1] focus:border-[#F59E0B]/50 focus:ring-2 focus:ring-[#F59E0B]/20 outline-none transition-all text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.07] border border-white/[0.12] text-white placeholder:text-white/30 focus:bg-white/[0.1] focus:border-[#F59E0B]/50 focus:ring-2 focus:ring-[#F59E0B]/20 outline-none transition-all text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">
                        Contact Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        placeholder="+233 XX XXX XXXX"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.07] border border-white/[0.12] text-white placeholder:text-white/30 focus:bg-white/[0.1] focus:border-[#F59E0B]/50 focus:ring-2 focus:ring-[#F59E0B]/20 outline-none transition-all text-sm"
                      />
                    </div>

                    {/* Error feedback */}
                    <AnimatePresence>
                      {formError && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center gap-3 rounded-xl px-4 py-3 bg-red-500/20 border border-red-400/20"
                        >
                          <div className="w-7 h-7 rounded-full bg-red-400/20 flex items-center justify-center flex-shrink-0">
                            <svg className="w-3.5 h-3.5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01" />
                            </svg>
                          </div>
                          <p className="text-sm text-red-300">{formError}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#F59E0B] text-[#1a1a1a] rounded-xl text-sm font-bold hover:bg-[#FBBF24] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-[#F59E0B]/20 mt-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-[#1a1a1a]/30 border-t-[#1a1a1a] rounded-full animate-spin" />
                          Registering...
                        </>
                      ) : (
                        'Register Attendance'
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="p-8 md:p-10 text-center"
                >
                  {/* Animated checkmark */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                    className="w-20 h-20 rounded-full bg-green-400/20 border-2 border-green-400/30 flex items-center justify-center mx-auto mb-6"
                  >
                    <motion.svg
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="w-10 h-10 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </motion.svg>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="space-y-2 mb-8"
                  >
                    <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-montserrat)]">
                      Welcome, {successName.split(' ')[0]}!
                    </h3>
                    <p className="text-white/60 text-sm">
                      Your attendance has been registered successfully.
                    </p>
                    <p className="text-white/40 text-xs">
                      Thank you for joining us at the CanCAF launch.
                    </p>
                  </motion.div>

                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    onClick={handleRegisterAnother}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 text-white rounded-xl text-sm font-medium border border-white/10 hover:border-white/20 active:scale-[0.98] transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Register Another Attendee
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Session counter */}
          <AnimatePresence>
            {registeredCount > 0 && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-white/40 text-xs mt-4"
              >
                {registeredCount} attendee{registeredCount !== 1 ? 's' : ''} registered this session
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-white/25 text-xs mt-8 text-center"
        >
          Cancer Care Africa Foundation &copy; {new Date().getFullYear()}
        </motion.p>
      </div>
    </div>
  )
}
