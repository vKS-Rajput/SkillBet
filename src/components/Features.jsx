import React from 'react'
import { FaCode, FaChessKnight, FaChartLine, FaPlus, FaGamepad } from 'react-icons/fa'
import { SiBitcoinsv, SiCashapp } from 'react-icons/si'
import { motion } from 'framer-motion'

const FeatureCard = ({ icon, title, description, colorClass, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: delay * 0.2 }}
            viewport={{ once: true }}
            className={`relative h-full w-full overflow-hidden rounded-xl border ${colorClass} p-6 backdrop-blur-sm`}
        >
            <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="mb-6">
                    <div className="text-4xl mb-4">{icon}</div>
                    <h3 className="font-mono text-2xl font-bold text-white mb-3">{title}</h3>
                    <p className="text-gray-300 font-mono text-sm">{description}</p>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-mono text-xs text-gray-400">SkillBet Exclusive</span>
                    <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                        <FaPlus className="text-white text-xs" />
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

const Features = () => {
    const features = [
        {
            icon: <FaCode className="text-cyan-400" />,
            title: "Code Challenges",
            description: "Compete in real-time coding battles across multiple languages and frameworks.",
            colorClass: "bg-cyan-900/20 border-cyan-400/20 hover:border-cyan-400/50"
        },
        {
            icon: <FaChessKnight className="text-purple-400" />,
            title: "Strategy Games",
            description: "Test your tactical skills in competitive strategy game tournaments.",
            colorClass: "bg-purple-900/20 border-purple-400/20 hover:border-purple-400/50"
        },
        {
            icon: <FaChartLine className="text-yellow-400" />,
            title: "Market Games",
            description: "Predict market trends and compete with other traders in simulated environments.",
            colorClass: "bg-yellow-900/20 border-yellow-400/20 hover:border-yellow-400/50"
        },
        {
            icon: <FaGamepad className="text-green-400" />,
            title: "Esports Arena",
            description: "Join competitive gaming tournaments across popular titles.",
            colorClass: "bg-green-900/20 border-green-400/20 hover:border-green-400/50"
        }
    ]

    return (
        <section id="features" className="relative overflow-hidden bg-gray-900 py-32">
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
                {[...Array(20)].map((_, i) => (
                    <div 
                        key={i}
                        className="absolute"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: 0.3 + Math.random() * 0.4,
                            transform: `scale(${0.5 + Math.random()})`
                        }}
                    >
                        {Math.random() > 0.5 ? 
                            <FaCode className="text-cyan-400" /> : 
                            <FaGamepad className="text-purple-400" />
                        }
                    </div>
                ))}
            </div>

            <div className="container relative mx-auto px-5 md:px-10">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-24"
                >
                    <h2 className="font-mono text-sm uppercase tracking-widest text-cyan-300 mb-4">
                        SkillBet Features
                    </h2>
                    <h3 className="font-mono text-4xl md:text-6xl font-bold text-white mb-6">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-purple-200">
                            Gaming <span className="text-yellow-400">+</span> Coding
                        </span>
                    </h3>
                    <p className="font-mono text-gray-400 max-w-2xl">
                        Our platform combines competitive gaming with coding challenges, creating a unique ecosystem where skills translate to rewards.
                    </p>
                </motion.div>

                {/* Feature grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                    {features.map((feature, i) => (
                        <FeatureCard 
                            key={i}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            colorClass={feature.colorClass}
                            delay={i}
                        />
                    ))}
                </div>

                {/* Coming soon section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-700/30 border border-cyan-400/20 p-8 md:p-12"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex-1">
                            <h3 className="font-mono text-2xl md:text-3xl font-bold text-white mb-4">
                                More <span className="text-yellow-400">Coming Soon</span>
                            </h3>
                            <p className="font-mono text-gray-400 mb-6">
                                We're constantly expanding our challenge categories and game integrations. Stay tuned for blockchain development challenges, AI competitions, and more.
                            </p>
                            <div className="flex items-center gap-4">
                                <SiCashapp className="text-yellow-400 text-2xl" />
                                <span className="font-mono text-sm text-gray-300">
                                    All rewards paid as per contests
                                </span>
                            </div>
                        </div>
                        <div className="flex-1 flex justify-center">
                            <div className="relative">
                                <div className="absolute -inset-4 bg-cyan-400/10 rounded-full blur-lg"></div>
                                <div className="relative bg-gray-800/50 border border-cyan-400/20 rounded-full p-8">
                                    <FaPlus className="text-cyan-400 text-4xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default Features