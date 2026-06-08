import { type FormEvent, useState } from 'react'
import { FadeIn } from '@/components/FadeIn'

const SUBJECT_OPTIONS = [
  'General enquiry',
  'Careers',
  'Partnership',
  'Report misconduct',
  'Other',
] as const

export function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const mailSubject = encodeURIComponent(subject || 'Contact form')
    const body = encodeURIComponent(
      `${message}\n\n---\nFrom: ${name} <${email}>`,
    )
    const mailto = `mailto:info@atlanticcatering-gh.com?subject=${mailSubject}&body=${body}`
    window.location.href = mailto
  }

  return (
    <FadeIn>
      <form
        className="contact-form space-y-5"
        action="#"
        method="post"
        noValidate
        onSubmit={handleSubmit}
      >
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="contact-name" className="block text-[12px] font-medium text-acll-navy mb-1">
              Name <span className="text-acll-muted">*</span>
            </label>
            <input
              type="text"
              id="contact-name"
              name="name"
              required
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="contact-input-minimal w-full px-0 py-2.5 border-0 border-b border-acll-navy/15 bg-transparent text-acll-navy text-[15px] placeholder-acll-muted/60 focus:outline-none focus:border-acll-navy focus:ring-0 transition-colors"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="block text-[12px] font-medium text-acll-navy mb-1">
              Email <span className="text-acll-muted">*</span>
            </label>
            <input
              type="email"
              id="contact-email"
              name="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="contact-input-minimal w-full px-0 py-2.5 border-0 border-b border-acll-navy/15 bg-transparent text-acll-navy text-[15px] placeholder-acll-muted/60 focus:outline-none focus:border-acll-navy focus:ring-0 transition-colors"
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div>
          <label htmlFor="contact-subject" className="block text-[12px] font-medium text-acll-navy mb-1">
            Subject <span className="text-acll-muted">*</span>
          </label>
          <select
            id="contact-subject"
            name="subject"
            required
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            className="contact-input-minimal w-full px-0 py-2.5 border-0 border-b border-acll-navy/15 bg-transparent text-acll-navy text-[15px] focus:outline-none focus:border-acll-navy focus:ring-0 transition-colors appearance-none cursor-pointer"
          >
            <option value="">Select a subject</option>
            {SUBJECT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="contact-message" className="block text-[12px] font-medium text-acll-navy mb-1">
            Message <span className="text-acll-muted">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={4}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="contact-input-minimal w-full px-0 py-2.5 border-0 border-b border-acll-navy/15 bg-transparent text-acll-navy text-[15px] placeholder-acll-muted/60 focus:outline-none focus:border-acll-navy focus:ring-0 transition-colors resize-none min-h-[100px]"
            placeholder="Your message"
          />
        </div>
        <div className="pt-2">
          <button
            type="submit"
            className="contact-submit-btn inline-flex items-center justify-center rounded-full px-6 py-3 text-[15px] font-medium text-white bg-acll-green hover:bg-acll-green/90 transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-acll-green focus-visible:ring-offset-2"
          >
            Send Message
          </button>
        </div>
      </form>
    </FadeIn>
  )
}
