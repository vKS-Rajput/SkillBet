import React, { useRef } from 'react';
import Button from './Button';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { FaCode, FaGamepad } from 'react-icons/fa';
import { CgTerminal } from 'react-icons/cg';
import { SiBitcoinsv, SiMoneygram } from 'react-icons/si';

const Hero = () => {
    const imageContainerRef = useRef(null);
    const textRef = useRef(null);

    useGSAP(() => {
        // Image container animation
        gsap.from(imageContainerRef.current, {
            duration: 1.5,
            opacity: 0,
            scale: 0.9,
            ease: 'power3.out',
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        });
        
        gsap.to(imageContainerRef.current, {
            duration: 1.8,
            clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)',
            borderRadius: '0 0 30% 15%',
            ease: 'elastic.out(1, 0.5)',
            delay: 0.3
        });

        // Text animation
        gsap.from(textRef.current.children, {
            duration: 1,
            y: 50,
            opacity: 0,
            stagger: 0.2,
            ease: 'back.out(1.7)',
            delay: 0.5
        });

        // Floating elements animation
        gsap.to(".floating-icon", {
            y: 10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }, []);

    return (
        <div className='relative h-dvh w-screen overflow-x-hidden bg-gradient-to-b from-gray-900 to-gray-800'>
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(12)].map((_, i) => (
                    <div 
                        key={i}
                        className="absolute floating-icon"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: 0.2 + Math.random() * 0.3,
                            transform: `scale(${0.5 + Math.random()})`
                        }}
                    >
                        {Math.random() > 0.5 ? (
                            <FaCode className="text-cyan-400" size={24 + Math.random() * 30} />
                        ) : (
                            <FaGamepad className="text-purple-400" size={24 + Math.random() * 30} />
                        )}
                    </div>
                ))}
            </div>

            {/* Wrapper for clip-path effect */}
            <div ref={imageContainerRef} className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <div className='relative z-10 h-dvh w-screen overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900'>
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-800/40 to-transparent" />
                    
                    {/* Abstract pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div ref={textRef} className='absolute left-0 top-0 z-40 size-full flex flex-col justify-between'>
                <div className='mt-24 px-5 sm:px-10 md:px-16 lg:px-24'>
                    <h1 className='font-mono text-6xl md:text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300 mb-4'>
                        code<a className="text-purple-400">Game</a>
                    </h1>
                    <p className='mb-8 max-w-xl font-mono text-gray-200 text-2xl md:text-3xl leading-tight'>
                        Prove Your <span className="font-semibold text-cyan-300">Skills</span>. <br /> 
                        <span className="font-semibold text-purple-300">Bet on Them</span>.
                        <span className="block text-yellow-400 mt-2">Earn Money.</span>
                    </p>
                    <div className="flex gap-4">
                        <Button
                            id='bet-skills'
                            title='Start Betting'
                            leftIcon={<SiMoneygram className="group-hover:rotate-12 transition-transform" />}
                            containerClass='!bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from--400 hover:to-yellow-500 !text-gray-900 flex-center gap-2 px-6 py-3 font-mono font-semibold transition-all hover:scale-105'
                        />
                        <Button
                            id='learn-more'
                            title='How It Works'
                            leftIcon={<CgTerminal className="group-hover:rotate-12 transition-transform" />}
                            containerClass='!bg-gray-700 hover:!bg-gray-600 !text-gray-100 border border-cyan-400/20 flex-center gap-2 px-6 py-3 font-mono font-semibold transition-all hover:scale-105'
                        />
                    </div>
                </div>

                {/* Bottom section */}
                <div className="px-5 sm:px-10 md:px-16 lg:px-24 pb-10 flex justify-between items-end">
                    <div className="max-w-md">
                        <p className="text-gray-300/80 font-mono mb-2">Join the revolution of skill-based betting</p>
                        <div className="h-1 w-16 bg-gradient-to-r from-cyan-400 to-purple-500 mb-4"></div>
                        <p className="text-gray-400/60 font-mono text-sm">Decentralized platform for competitive gamers & coders</p>
                    </div>
                    
                    <h1 className='font-mono text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-purple-200'>
                        <FaGamepad className="inline mr-2" />
                        Skill<a className="text-purple-400">Bet</a>
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default Hero;