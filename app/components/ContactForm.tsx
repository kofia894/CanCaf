'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { submitContactForm, ContactFormData } from '../actions/submitContactForm'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm() {
  const t = useTranslations('contact')
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('submitting')
    setErrorMessage('')

    try {
      const result = await submitContactForm(formData)

      if (result.success) {
        setFormState('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setFormState('error')
        setErrorMessage(result.message)
      }
    } catch {
      setFormState('error')
      setErrorMessage(t('errorMessage'))
    }
  }

  if (formState === 'success') {
    return (
      <div className="bg-[#0F766E]/5 border border-[#0F766E]/20 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-[#0F766E]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-[#0F766E]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-zinc-900 font-[family-name:var(--font-montserrat)] mb-2">
          {t('successTitle')}
        </h3>
        <p className="text-zinc-600">{t('successMessage')}</p>
        <button
          onClick={() => setFormState('idle')}
          className="mt-6 text-[#0F766E] hover:text-[#0d6b63] font-medium motion-fast"
        >
          {t('sendAnother')}
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {formState === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
          {errorMessage}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-zinc-700 mb-2"
          >
            {t('name')}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20 outline-none motion-fast"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-zinc-700 mb-2"
          >
            {t('email')}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20 outline-none motion-fast"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-zinc-700 mb-2"
        >
          {t('subject')}
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20 outline-none motion-fast"
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-zinc-700 mb-2"
        >
          {t('message')}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20 outline-none motion-fast resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={formState === 'submitting'}
        className="w-full sm:w-auto px-8 py-3 bg-[#0F766E] text-white rounded-full text-sm font-medium motion-fast hover:bg-[#0d6b63] hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {formState === 'submitting' ? t('sending') : t('send')}
      </button>
    </form>
  )
}
