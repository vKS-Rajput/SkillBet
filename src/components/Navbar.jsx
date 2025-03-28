import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FaCoins, FaDice, FaVolumeUp, FaVolumeMute, FaCode, FaGamepad } from 'react-icons/fa';
import { SiBitcoinsv } from 'react-icons/si';
import { motion, AnimatePresence } from 'framer-motion';
import { GiConsoleController } from "react-icons/gi";
import { CgTerminal } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';

// Constants for better maintainability
const NAV_ITEMS = ['Home', 'Blog', 'About', 'Contact'];
const AUDIO_BARS = [0.3, 0.6, 0.9, 0.6, 0.3];

const Navbar = React.memo(() => {
    const navigate = useNavigate();
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isHoveringBet, setIsHoveringBet] = useState(false);
    const [bettingPulse, setBettingPulse] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [terminalEffect, setTerminalEffect] = useState(false);
    const audioElementRef = useRef(null);
    const pulseTimeoutRef = useRef(null);
    const terminalTimeoutRef = useRef(null);

    // Memoized audio toggle handler
    const toggleAudio = useCallback(() => {
        setIsAudioPlaying(prev => !prev);
    }, []);

    // Memoized betting click handler
    const handleBettingClick = useCallback(() => {
        navigate('/signin');
    }, [navigate]);

    // Memoized terminal effect trigger
    const triggerTerminalEffect = useCallback(() => {
        setTerminalEffect(true);
        if (terminalTimeoutRef.current) clearTimeout(terminalTimeoutRef.current);
        terminalTimeoutRef.current = setTimeout(() => setTerminalEffect(false), 1000);
    }, []);

    // Audio effect handler
    useEffect(() => {
        const audio = audioElementRef.current;
        if (!audio) return;

        const handleAudio = async () => {
            try {
                if (isAudioPlaying) {
                    await audio.play();
                } else {
                    audio.pause();
                }
            } catch (error) {
                console.log("Audio error:", error);
            }
        };

        handleAudio();

        return () => {
            if (pulseTimeoutRef.current) clearTimeout(pulseTimeoutRef.current);
            if (terminalTimeoutRef.current) clearTimeout(terminalTimeoutRef.current);
            audio.pause();
        };
    }, [isAudioPlaying]);

    // Logo animation variants for cleaner code
    const logoVariants = {
        terminal: {
            opacity: 1,
            x: 0
        },
        default: {
            opacity: 1,
            x: 0
        },
        exit: {
            opacity: 0,
            x: 10
        }
    };

    // Audio bar animation variants
    const audioBarVariants = {
        playing: (i) => ({
            height: `${AUDIO_BARS[i] * 100}%`,
            transition: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 0.5 + Math.random() * 0.5
            }
        }),
        muted: {
            height: '25%'
        }
    };

    return (
        <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className='fixed inset-x-0 top-0 z-50 h-20 bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-md shadow-lg border-b border-cyan-400/20'
        >
            <audio ref={audioElementRef} className='hidden' src="/audio/loop.mp3" loop />

            <header className='container mx-auto h-full px-4 sm:px-6'>
                <nav className='flex h-full items-center justify-between'>
                    {/* Logo Component */}
                    <motion.div
                        className='flex items-center gap-3 cursor-pointer'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400 }}
                        onClick={triggerTerminalEffect}
                    >
                        <div className='relative'>
                            <div className='flex items-center'>
                                <AnimatePresence mode='wait'>
                                    {terminalEffect ? (
                                        <motion.div
                                            key="terminal"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={logoVariants.terminal}
                                            exit={logoVariants.exit}
                                            className='flex items-center'
                                        >
                                            <CgTerminal className='text-2xl text-cyan-400 mr-2' />
                                            <span className='text-xl font-mono font-bold text-cyan-400'>$</span>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="default"
                                            initial={{ opacity: 0 }}
                                            animate={logoVariants.default}
                                            exit={logoVariants.exit}
                                            className='flex items-center'
                                        >
                                            <FaGamepad className='text-2xl text-purple-400 mr-2' />
                                            <FaCode className='text-xl text-cyan-400' />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                <div className='ml-2 text-2xl font-bold font-mono text-white'>
                                    <span className='text-cyan-400'>skill</span>
                                    <span className='text-purple-400'>BET</span>
                                </div>
                            </div>
                            <motion.div
                                className='absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500'
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                transition={{ duration: 1, delay: 0.5 }}
                                viewport={{ once: true }}
                            />
                        </div>
                    </motion.div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        className='block rounded-lg p-2 text-cyan-200 md:hidden'
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Toggle menu"
                    >
                        <GiConsoleController className='text-2xl' />
                    </motion.button>

                    {/* Desktop Navigation */}
                    <div className='hidden items-center gap-8 md:flex'>
                        {NAV_ITEMS.map((item) => (
                            <NavItem key={item} item={item} />
                        ))}

                        {/* Betting Button Component */}
                        <BettingButton 
                            isHoveringBet={isHoveringBet}
                            bettingPulse={bettingPulse}
                            setIsHoveringBet={setIsHoveringBet}
                            onClick={handleBettingClick}
                        />

                        {/* Audio Toggle Component */}
                        <AudioToggle 
                            isAudioPlaying={isAudioPlaying} 
                            toggleAudio={toggleAudio} 
                        />
                    </div>

                    {/* Mobile Menu */}
                    <MobileMenu 
                        mobileMenuOpen={mobileMenuOpen} 
                        setMobileMenuOpen={setMobileMenuOpen}
                        isAudioPlaying={isAudioPlaying}
                        toggleAudio={toggleAudio}
                    />
                </nav>
            </header>
        </motion.div>
    );
});

// Extracted NavItem component for better reusability
const NavItem = React.memo(({ item }) => (
    <motion.a
        href={`#${item.toLowerCase()}`}
        className='relative font-mono text-gray-200 hover:text-white group'
        whileHover={{ scale: 1.05 }}
    >
        <span className='text-cyan-400 mr-1'>#</span>
        {item}
        <motion.span
            className='absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500'
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
        />
    </motion.a>
));

// Extracted BettingButton component
const BettingButton = React.memo(({ isHoveringBet, bettingPulse, setIsHoveringBet, onClick }) => (
    <motion.button
        onClick={onClick}
        onHoverStart={() => setIsHoveringBet(true)}
        onHoverEnd={() => setIsHoveringBet(false)}
        animate={{
            scale: bettingPulse ? [1, 1.1, 1] : 1,
            boxShadow: bettingPulse
                ? '0 0 20px rgba(234, 179, 8, 0.9)'
                : isHoveringBet
                    ? '0 0 15px rgba(234, 179, 8, 0.7)'
                    : 'none',
            background: bettingPulse
                ? 'linear-gradient(45deg, #f59e0b, #fbbf24, #f59e0b)'
                : 'linear-gradient(45deg, #f59e0b, #fbbf24)'
        }}
        transition={{
            scale: bettingPulse ? { duration: 0.8 } : { duration: 0.3 },
            boxShadow: { duration: 0.3 },
            background: { duration: 0.5 }
        }}
        className='relative flex items-center gap-2 rounded-full px-6 py-2 font-mono font-medium text-gray-900 group'
    >
        <AnimatePresence>
            {isHoveringBet && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className='absolute -right-2 -top-2 rounded-full bg-yellow-400 p-1'
                >
                    <FaDice className='text-xs text-gray-900' />
                </motion.div>
            )}
        </AnimatePresence>
        <motion.div
            animate={{
                rotate: isHoveringBet ? [0, 15, -15, 0] : 0,
                transition: { duration: 0.5 }
            }}
        >
            <FaCode className='text-lg text-gray-900' />
        </motion.div>
        <span>Compete Now</span>
        <motion.span
            animate={{
                rotate: isHoveringBet ? 90 : 45,
                transition: { duration: 0.3 }
            }}
            className='text-xs'
        >
            ➤
        </motion.span>
    </motion.button>
));

// Extracted AudioToggle component
const AudioToggle = React.memo(({ isAudioPlaying, toggleAudio }) => {
    const audioBarVariants = {
        playing: (i) => ({
            height: `${AUDIO_BARS[i] * 100}%`,
            transition: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 0.5 + Math.random() * 0.5
            }
        }),
        muted: {
            height: '25%'
        }
    };

    return (
        <motion.button
            onClick={toggleAudio}
            className='flex items-center gap-2 rounded-full bg-gray-800/50 p-2 backdrop-blur-sm border border-cyan-400/20'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isAudioPlaying ? "Mute sound" : "Unmute sound"}
        >
            {isAudioPlaying ? (
                <>
                    <FaVolumeUp className='text-cyan-400' />
                    <div className='flex h-4 items-end gap-0.5'>
                        {AUDIO_BARS.map((_, i) => (
                            <motion.div
                                key={i}
                                className='w-1 bg-cyan-400'
                                custom={i}
                                initial={{ height: 0 }}
                                animate={isAudioPlaying ? "playing" : "muted"}
                                variants={audioBarVariants}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <FaVolumeMute className='text-gray-400' />
                    <div className='flex h-4 items-end gap-0.5'>
                        {[1, 1, 1, 1].map((_, i) => (
                            <div key={i} className='w-1 bg-gray-400/50' style={{ height: '25%' }} />
                        ))}
                    </div>
                </>
            )}
        </motion.button>
    );
});

// Extracted MobileMenu component
const MobileMenu = React.memo(({ mobileMenuOpen, setMobileMenuOpen, isAudioPlaying, toggleAudio }) => (
    <AnimatePresence>
        {mobileMenuOpen && (
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className='absolute left-0 top-20 z-50 w-full bg-gray-900/95 backdrop-blur-lg shadow-xl border-b border-cyan-400/20 md:hidden'
            >
                <div className='flex flex-col items-center space-y-6 p-6'>
                    {NAV_ITEMS.map((item) => (
                        <motion.a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className='text-xl font-mono text-gray-200 hover:text-white flex items-center'
                            onClick={() => setMobileMenuOpen(false)}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className='text-cyan-400 mr-2'>#</span>
                            {item}
                        </motion.a>
                    ))}
                    <div className='mt-4 text-center text-gray-400 font-mono'>
                        <div className='inline-flex items-center gap-2 rounded-lg bg-gray-800/70 px-4 py-2 border border-cyan-400/20'>
                            <SiBitcoinsv className='text-yellow-400' />
                            <span>Desktop mode required for betting</span>
                        </div>
                    </div>
                    <motion.button
                        onClick={toggleAudio}
                        className='flex items-center gap-2 rounded-full bg-gray-800/70 p-3 backdrop-blur-sm border border-cyan-400/20'
                        whileTap={{ scale: 0.95 }}
                        aria-label={isAudioPlaying ? "Mute sound" : "Unmute sound"}
                    >
                        {isAudioPlaying ? (
                            <FaVolumeUp className='text-cyan-400 text-xl' />
                        ) : (
                            <FaVolumeMute className='text-gray-400 text-xl' />
                        )}
                    </motion.button>
                </div>
            </motion.div>
        )}
    </AnimatePresence>
));

export default Navbar;