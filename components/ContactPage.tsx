import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        service: '',
        projectDescription: '',
        newsletter: false,
        confirmEmail: '' // Honeypot
    });

    const [status, setStatus] = useState<{
        type: 'idle' | 'loading' | 'success' | 'error';
        message: string;
    }>({ type: 'idle', message: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus({ type: 'loading', message: '' });

        try {
            const response = await fetch('/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setStatus({ type: 'success', message: result.message || 'Message sent successfully!' });
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    service: '',
                    projectDescription: '',
                    newsletter: false,
                    confirmEmail: ''
                });
            } else {
                throw new Error(result.error || 'Failed to send message.');
            }
        } catch (error: any) {
            console.error('Submission error:', error);
            setStatus({ type: 'error', message: error.message || 'Something went wrong. Please try again.' });
        }
    };

    return (
        <div className="min-h-screen bg-[#1A1A1A] text-white selection:bg-[#9BE12C] selection:text-black font-sans flex flex-col">
            <Header />

            <main className="flex-grow pt-32 pb-20 page-padding">
                <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* Left Column: Contact Info */}
                    <div className="flex flex-col justify-between h-full min-h-[400px]">
                        <div>
                            <h1 className="font-heading text-6xl md:text-8xl lg:text-[6rem] font-bold tracking-tighter leading-[0.9] text-white/90 mb-12">
                                CONTACT<br />ME
                            </h1>

                            <div className="space-y-8">
                                <div>
                                    <span className="block text-sm font-medium text-gray-400 mb-1">Location</span>
                                    <span className="text-xl">Mutiara Damansara, Malaysia</span>
                                </div>
                                <div>
                                    <span className="block text-sm font-medium text-gray-400 mb-1">Office Hours</span>
                                    <span className="text-xl">Monday - Friday<br />10 AM - 6 PM</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 lg:mt-0">
                            <a href="mailto:hello@thebrne.com" className="text-2xl md:text-4xl font-bold hover:text-[#9BE12C] transition-colors">
                                hello@thebrne.com
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="pt-4 lg:pt-8 relative">
                        <form onSubmit={handleSubmit} className="space-y-8">

                            {/* Honeypot */}
                            <div className="sr-only" aria-hidden="true">
                                <label htmlFor="confirmEmail">Don't fill this out if you're human:</label>
                                <input
                                    type="text"
                                    id="confirmEmail"
                                    name="confirmEmail"
                                    tabIndex={-1}
                                    value={formData.confirmEmail}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Name Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="relative group">
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-400 mb-2">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        required
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-b border-white/20 py-3 text-lg focus:outline-none focus:border-[#9BE12C] transition-colors placeholder-white/10"
                                        placeholder="Enter your first name"
                                    />
                                </div>
                                <div className="relative group">
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        required
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-b border-white/20 py-3 text-lg focus:outline-none focus:border-[#9BE12C] transition-colors placeholder-white/10"
                                        placeholder="Enter your last name"
                                    />
                                </div>
                            </div>

                            {/* Service Selection */}
                            <div className="relative group">
                                <label htmlFor="service" className="block text-sm font-medium text-gray-400 mb-2">Service</label>
                                <select
                                    id="service"
                                    name="service"
                                    required
                                    value={formData.service}
                                    onChange={handleChange}
                                    className="w-full bg-[#1A1A1A] border-b border-white/20 py-3 text-lg focus:outline-none focus:border-[#9BE12C] transition-colors appearance-none cursor-pointer"
                                >
                                    <option value="" disabled>Select a service</option>
                                    <option value="branding">Branding</option>
                                    <option value="development">Web Development</option>
                                    <option value="marketing">Digital Marketing</option>
                                    <option value="video">Video & Content Production</option>
                                    <option value="shojimp">Shoji MP 2026</option>
                                    <option value="other">Other</option>
                                </select>
                                <div className="absolute right-0 bottom-4 pointer-events-none text-gray-400">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="relative group">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-b border-white/20 py-3 text-lg focus:outline-none focus:border-[#9BE12C] transition-colors placeholder-white/10"
                                    placeholder="name@example.com"
                                />
                            </div>

                            {/* Newsletter */}
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        name="newsletter"
                                        checked={formData.newsletter}
                                        onChange={handleChange}
                                        className="peer sr-only"
                                    />
                                    <div className="w-5 h-5 border border-white/40 peer-checked:bg-[#9BE12C] peer-checked:border-[#9BE12C] transition-colors rounded-sm"></div>
                                    <svg className="absolute inset-0 w-5 h-5 text-black pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                                <span className="text-gray-300 group-hover:text-white transition-colors select-none">Sign up for news and updates</span>
                            </label>

                            {/* Project Description */}
                            <div className="relative group">
                                <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-400 mb-2">Project Description</label>
                                <textarea
                                    id="projectDescription"
                                    name="projectDescription"
                                    value={formData.projectDescription}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full bg-transparent border-b border-white/20 py-3 text-lg focus:outline-none focus:border-[#9BE12C] transition-colors placeholder-white/10 resize-none"
                                    placeholder="Tell us about your project..."
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={status.type === 'loading'}
                                className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-[#9BE12C] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-8 w-full md:w-auto"
                            >
                                {status.type === 'loading' ? 'Sending...' : 'Submit Inquiry'}
                            </button>

                            {/* Status Messages */}
                            {status.message && (
                                <div className={`p-4 rounded-lg mt-4 ${status.type === 'success'
                                        ? 'bg-green-900/20 text-green-400 border border-green-900/50'
                                        : 'bg-red-900/20 text-red-400 border border-red-900/50'
                                    }`}>
                                    {status.message}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ContactPage;
