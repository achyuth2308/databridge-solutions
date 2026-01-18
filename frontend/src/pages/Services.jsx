import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

/**
 * Services Page Component
 * DataBridge Solutions – Enterprise Data & BPO Services
 */
function Services() {
    const services = [
        {
            id: 1,
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            title: 'XML Conversion Services',
            description:
                'Accurate and scalable XML conversion services for publishers, enterprises, and digital platforms. We convert complex data into structured, industry-standard XML formats.',
            features: ['DTD / XSD compliance', 'Large-volume conversion', 'Multi-format support', '99.9% accuracy'],
            color: 'from-blue-500 to-indigo-600',
        },
        {
            id: 2,
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7" />
                </svg>
            ),
            title: 'Data Processing & Management',
            description:
                'End-to-end data processing services designed to handle high-volume, mission-critical business data with precision, confidentiality, and speed.',
            features: ['Data validation', 'Data cleansing', 'Structured workflows', 'Secure handling'],
            color: 'from-cyan-500 to-teal-600',
        },
        {
            id: 3,
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            title: 'Digitization Services',
            description:
                'Convert physical documents into high-quality, searchable digital formats. Our digitization services ensure long-term accessibility and compliance.',
            features: ['Document scanning', 'OCR processing', 'Indexing & tagging', 'Archive digitization'],
            color: 'from-violet-500 to-purple-600',
        },
        {
            id: 4,
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4" />
                </svg>
            ),
            title: 'Quality Check & Validation',
            description:
                'Multi-layer quality assurance processes to ensure error-free delivery. Every project undergoes strict validation to meet global quality standards.',
            features: ['Manual + automated QC', 'Process audits', 'Accuracy reporting', 'Client-specific checks'],
            color: 'from-emerald-500 to-green-600',
        },
        {
            id: 5,
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-3.314 0-6 2.686-6 6v3h12v-3c0-3.314-2.686-6-6-6z" />
                </svg>
            ),
            title: 'BPO & Back-Office Support',
            description:
                'Reliable BPO services that streamline business operations. We act as an extension of your team, delivering consistency and scalability.',
            features: ['Data entry', 'Back-office operations', '24/7 support', 'Cost optimization'],
            color: 'from-orange-500 to-red-600',
        },
        {
            id: 6,
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V7l8-4z" />
                </svg>
            ),
            title: 'Data Security & Compliance',
            description:
                'Enterprise-grade data security practices to protect sensitive information and ensure compliance with international standards.',
            features: ['Secure infrastructure', 'Access controls', 'Compliance-ready workflows', 'Confidential handling'],
            color: 'from-rose-500 to-pink-600',
        },
    ]

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen pt-20">
            {/* Hero */}
            <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-950">
                <div className="section-container text-center max-w-3xl mx-auto">
                    <span className="text-indigo-600 dark:text-indigo-400 font-medium mb-4 block">
                        Our Services
                    </span>
                    <h1 className="section-title mb-6">
                        Precision-Driven Data Services
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        DataBridge Solutions delivers secure, accurate, and scalable data services
                        trusted by global organizations.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-16 lg:py-24">
                <div className="section-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group glass-card p-8 card-hover relative overflow-hidden"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-6`}>
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">{service.description}</p>
                            <ul className="space-y-2 mb-6">
                                {service.features.map(f => (
                                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        ✓ {f}
                                    </li>
                                ))}
                            </ul>
                            <Link to="/contact" className="text-indigo-600 dark:text-indigo-400 font-medium">
                                Learn More →
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 lg:py-24">
                <div className="section-container text-center">
                    <h2 className="text-3xl font-bold mb-4">Let’s Work Together</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        Partner with DataBridge Solutions for reliable, high-accuracy data services.
                    </p>
                    <Link to="/contact" className="btn-primary">
                        Contact Our Team
                    </Link>
                </div>
            </section>
        </motion.div>
    )
}

export default Services
