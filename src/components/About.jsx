import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useRef } from 'react'
import { FaTrophy, FaCoins, FaShieldAlt, FaLightbulb, FaGamepad, FaCode, FaMoneyBill } from 'react-icons/fa'
import { CgTerminal } from 'react-icons/cg'
import { SiBitcoinsv } from 'react-icons/si'
import { FaMoneyBillTrendUp } from 'react-icons/fa6'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const About = () => {
    const containerRef = useRef()
    const contentRef = useRef()
    const featureRefs = useRef([])

    useGSAP(() => {
        // Content animation
        gsap.from(contentRef.current.children, {
            scrollTrigger: {
                trigger: contentRef.current,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out"
        })

        // Feature cards animation
        featureRefs.current.forEach((ref, i) => {
            gsap.from(ref, {
                scrollTrigger: {
                    trigger: ref,
                    start: "top 75%",
                    toggleActions: "play none none none"
                },
                x: i % 2 === 0 ? -50 : 50,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.1,
                ease: "back.out(1.2)"
            })
        })

        // Floating elements
        gsap.to(".floating-icon", {
            y: 15,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        })

        // Animated gradient background
        gsap.to(".gradient-bg", {
            backgroundPosition: "100% 50%",
            duration: 15,
            repeat: -1,
            yoyo: true,
            ease: "none"
        })

    }, { scope: containerRef })

    const features = [
        {
            icon: <FaGamepad className="text-3xl" />,
            title: "Live Challenges",
            desc: "Compete in real-time gaming tournaments"
        },
        {
            icon: <FaMoneyBill className="text-3xl" />,
            title: "Real Rewards",
            desc: "Earn moeny for your skills"
        },
        {
            icon: <FaShieldAlt className="text-3xl" />,
            title: "Secure Platform",
            desc: "Blockchain-powered transparency"
        },
        {
            icon: <CgTerminal className="text-3xl" />,
            title: "Code Battles",
            desc: "Prove your coding expertise in challenges"
        }
    ]

    return (
        <div id='about' className='min-h-screen w-screen overflow-hidden relative' ref={containerRef}>
            {/* Animated gradient background */}
            <div className="gradient-bg absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-[size:400%_400%] opacity-90" />

            {/* Particle background */}
            <div className="absolute inset-0 overflow-hidden opacity-40">
                {[...Array(30)].map((_, i) => (
                    <div 
                        key={i}
                        className="absolute floating-icon"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: 0.3 + Math.random() * 0.4,
                            transform: `scale(${0.5 + Math.random()})`,
                            filter: `blur(${Math.random() * 3}px)`
                        }}
                    >
                        {Math.random() > 0.5 ? 
                            <FaCode className="text-cyan-400" /> : 
                            <FaGamepad className="text-purple-400" />
                        }
                    </div>
                ))}
            </div>

            {/* Glowing elements */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-cyan-600 filter blur-[100px] opacity-20" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-600 filter blur-[100px] opacity-20" />

            <div className='relative pt-36 px-5 sm:px-10 md:px-16 lg:px-24 pb-24' ref={contentRef}>
                <h1 className='font-mono text-sm uppercase tracking-widest text-cyan-300 md:text-xs'>
                    Welcome to skillBET
                </h1>
                
                <div className='mt-5 text-center text-5xl md:text-[5.5rem] font-bold leading-tight'>
                    <span className="font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-purple-200">
                        Level <b className="text-yellow-400">Up</b>
                    </span>
                    <div className="h-4" />
                    <span className="font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-purple-200">
                        Your <b className="text-yellow-400">Gaming</b>
                    </span>
                    <div className="h-4" />
                    <span className="font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-purple-200">
                        & <b className="text-yellow-400">Coding</b> Skills
                    </span>
                </div>
                
                <div className='mt-12 max-w-4xl mx-auto text-center text-lg md:text-xl text-gray-300 leading-relaxed font-mono'>
                    <p className='mb-6 font-medium'>
                        Transform your skills into Real Money through our revolutionary hybrid platform.
                    </p>
                    <p className="text-cyan-300">
                        Compete in  coding & other challenges - earn with your skills.
                    </p>
                </div>

                {/* Features grid */}
                <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {features.map((feature, i) => (
                        <div 
                            key={i}
                            ref={el => featureRefs.current[i] = el}
                            className="bg-gradient-to-br from-gray-800/50 to-gray-700/30 backdrop-blur-md p-8 rounded-2xl border border-cyan-400/20 hover:border-yellow-400/50 transition-all hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-2"
                        >
                            <div className="text-yellow-400 mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-bold text-white mb-3 font-mono">{feature.title}</h3>
                            <p className="text-gray-400 font-mono">{feature.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Stats section */}
                <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-yellow-400 mb-2">15K+</div>
                        <p className="text-cyan-300 uppercase text-sm tracking-wider font-mono">Daily Players</p>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-yellow-400 mb-2">$2M+</div>
                        <p className="text-cyan-300 uppercase text-sm tracking-wider font-mono">In Rewards</p>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-yellow-400 mb-2">100+</div>
                        <p className="text-cyan-300 uppercase text-sm tracking-wider font-mono">Game Titles</p>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-yellow-400 mb-2">50+</div>
                        <p className="text-cyan-300 uppercase text-sm tracking-wider font-mono">Code Langs</p>
                    </div>
                </div>
            </div>

            {/* Animated wave divider */}
            <div className="relative h-48 w-full overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent" />
                <svg 
                    viewBox="0 0 1200 120" 
                    preserveAspectRatio="none" 
                    className="absolute bottom-0 left-0 w-full h-full"
                >
                    <path 
                        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
                        opacity=".25" 
                        className="fill-gray-800" 
                    ></path>
                    <path 
                        d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
                        opacity=".5" 
                        className="fill-gray-800" 
                    ></path>
                    <path 
                        d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
                        className="fill-gray-900" 
                    ></path>
                </svg>
            </div>
        </div>
    )
}

export default About