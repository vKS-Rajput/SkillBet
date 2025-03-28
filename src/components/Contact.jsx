import React from 'react'
import { motion } from 'framer-motion'
import { FaDiscord, FaTwitter, FaGithub, FaEnvelope } from 'react-icons/fa'
import { SiBitcoinsv } from 'react-icons/si'
import { CgTerminal } from 'react-icons/cg'

const Contact = () => {
  return (
    <section id="contact" className="relative min-h-screen w-full overflow-hidden bg-gray-900 py-32 px-5 md:px-10">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(15)].map((_, i) => (
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
            <CgTerminal className="text-cyan-400" />
          </div>
        ))}
      </div>

      {/* Glowing elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-cyan-600 filter blur-[100px] opacity-10" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-600 filter blur-[100px] opacity-10" />

      <div className="container relative mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="font-mono text-sm uppercase tracking-widest text-cyan-300 mb-4">
            Get In Touch
          </h2>
          <h3 className="font-mono text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-purple-200">
              Join the <span className="text-yellow-400">codeGame</span> Community
            </span>
          </h3>
          <p className="font-mono text-gray-400 max-w-2xl mx-auto">
            Connect with other gamers and developers. Have questions? Want to collaborate? Reach out through any channel.
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-24">
          {/* Discord */}
          <motion.a
            href="https://discord.gg/yourlink"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-indigo-900/30 to-indigo-800/20 backdrop-blur-md p-8 rounded-xl border border-indigo-400/20 hover:border-indigo-400/50 transition-all hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-2"
          >
            <div className="text-indigo-400 mb-4">
              <FaDiscord className="text-4xl" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 font-mono">Discord</h3>
            <p className="text-gray-400 font-mono">Join our active gaming/coding community</p>
          </motion.a>

          {/* Twitter */}
          <motion.a
            href="https://twitter.com/yourhandle"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-md p-8 rounded-xl border border-blue-400/20 hover:border-blue-400/50 transition-all hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-2"
          >
            <div className="text-blue-400 mb-4">
              <FaTwitter className="text-4xl" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 font-mono">Twitter</h3>
            <p className="text-gray-400 font-mono">Follow for updates and announcements</p>
          </motion.a>

          {/* GitHub */}
          <motion.a
            href="https://github.com/yourrepo"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-800/30 to-gray-700/20 backdrop-blur-md p-8 rounded-xl border border-gray-400/20 hover:border-gray-400/50 transition-all hover:shadow-lg hover:shadow-gray-500/10 hover:-translate-y-2"
          >
            <div className="text-gray-300 mb-4">
              <FaGithub className="text-4xl" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 font-mono">GitHub</h3>
            <p className="text-gray-400 font-mono">Contribute to our open-source projects</p>
          </motion.a>

          {/* Email */}
          <motion.a
            href="mailto:contact@skillbet.com"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/20 backdrop-blur-md p-8 rounded-xl border border-yellow-400/20 hover:border-yellow-400/50 transition-all hover:shadow-lg hover:shadow-yellow-500/10 hover:-translate-y-2"
          >
            <div className="text-yellow-400 mb-4">
              <FaEnvelope className="text-4xl" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 font-mono">Email</h3>
            <p className="text-gray-400 font-mono">For business inquiries and support</p>
          </motion.a>
        </div>

        {/* Crypto payment info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-700/30 border border-cyan-400/20 p-8 max-w-3xl mx-auto text-center"
        >
          <div className="flex flex-col items-center">
            <SiBitcoinsv className="text-yellow-400 text-4xl mb-4" />
            <h3 className="font-mono text-xl font-bold text-white mb-2">Crypto Payments Support</h3>
            <p className="font-mono text-gray-400 mb-4">
              We accept cryptocurrency for all transactions. Contact us for wallet addresses.
            </p>
            <div className="flex gap-4">
              <span className="font-mono text-xs bg-gray-800/50 px-3 py-1 rounded-full text-cyan-300">BTC</span>
              <span className="font-mono text-xs bg-gray-800/50 px-3 py-1 rounded-full text-purple-300">ETH</span>
              <span className="font-mono text-xs bg-gray-800/50 px-3 py-1 rounded-full text-yellow-300">SOL</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact