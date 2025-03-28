import React from 'react'
import { FaDiscord, FaTwitter, FaGithub, FaGamepad, FaCode } from 'react-icons/fa'
import { SiBitcoinsv } from 'react-icons/si'
import { CgTerminal } from 'react-icons/cg'

const Footer = () => {
  return (
    <footer className="relative bg-gray-900 border-t border-gray-800 overflow-hidden">
      {/* Glowing elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-cyan-600 filter blur-[100px] opacity-10" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-purple-600 filter blur-[100px] opacity-10" />

      <div className="container mx-auto px-5 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand info */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <FaGamepad className="text-2xl text-purple-400 mr-3" />
              <FaCode className="text-xl text-cyan-400" />
              <h3 className="font-mono text-2xl font-bold text-white ml-2">
                code<span className="text-yellow-400">Game</span>BET
              </h3>
            </div>
            <p className="font-mono text-gray-400 mb-6">
              The ultimate platform where gaming meets coding. Prove your skills, compete, and earn crypto rewards.
            </p>
            <div className="flex items-center space-x-4">
              <SiBitcoinsv className="text-yellow-400 text-xl" />
              <span className="font-mono text-sm text-gray-400">Cryptocurrency payments supported</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-mono text-lg font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="font-mono text-gray-400 hover:text-cyan-400 transition">Home</a></li>
              <li><a href="#features" className="font-mono text-gray-400 hover:text-cyan-400 transition">Features</a></li>
              <li><a href="#about" className="font-mono text-gray-400 hover:text-cyan-400 transition">About</a></li>
              <li><a href="#contact" className="font-mono text-gray-400 hover:text-cyan-400 transition">Contact</a></li>
              <li><a href="#" className="font-mono text-gray-400 hover:text-cyan-400 transition">Leaderboard</a></li>
            </ul>
          </div>

          {/* Social/contact */}
          <div>
            <h4 className="font-mono text-lg font-bold text-white mb-6">Connect</h4>
            <div className="space-y-4">
              <a href="#" className="flex items-center text-gray-400 hover:text-cyan-400 transition">
                <FaDiscord className="mr-3" />
                <span className="font-mono">Discord</span>
              </a>
              <a href="#" className="flex items-center text-gray-400 hover:text-purple-400 transition">
                <FaTwitter className="mr-3" />
                <span className="font-mono">Twitter</span>
              </a>
              <a href="#" className="flex items-center text-gray-400 hover:text-gray-300 transition">
                <FaGithub className="mr-3" />
                <span className="font-mono">GitHub</span>
              </a>
              <a href="#" className="flex items-center text-gray-400 hover:text-yellow-400 transition">
                <CgTerminal className="mr-3" />
                <span className="font-mono">Developer Docs</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="font-mono text-sm text-gray-500 mb-4 md:mb-0">
            © {new Date().getFullYear()} codeGameBET. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="font-mono text-sm text-gray-500 hover:text-cyan-400 transition">Terms</a>
            <a href="#" className="font-mono text-sm text-gray-500 hover:text-cyan-400 transition">Privacy</a>
            <a href="#" className="font-mono text-sm text-gray-500 hover:text-cyan-400 transition">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer