import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrophy, FaChartLine, FaCode, FaGamepad, FaCoins, FaUserShield } from 'react-icons/fa';
import { GiProgression, GiSwordman } from 'react-icons/gi';
import { RiSwordFill } from 'react-icons/ri';
import { SiLeetcode, SiCodewars, SiPython } from 'react-icons/si';

const Statistics = ({ isActive }) => {
  const navigate = useNavigate();
  
  // Sample data - replace with your actual data
  const stats = {
    accountBalance: 1850,
    winRate: 82,
    totalChallenges: 215,
    currentLevel: 47,
    xpProgress: 78,
    dailyStreak: 18,
    tournamentsWon: 9,
    codingRank: 'Diamond I',
    kdaRatio: 3.8,
    favoriteLanguages: ['Python', 'JavaScript', 'C++']
  };

  // Scroll to section when it becomes active
  useEffect(() => {
    if (isActive) {
      const element = document.getElementById('stats');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [isActive]);

  const navigateTo = (path) => {
    navigate(`/dashboard/${path}`);
  };

  return (
    <section 
      id="stats"
      className={`w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 transition-opacity duration-300 ${
        isActive ? 'opacity-100' : 'opacity-0 absolute'
      }`}
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Player Dashboard</h1>
        <p className="text-gray-600 mt-2">Your complete gaming and coding performance stats</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Account Balance */}
        <div 
          className="bg-white rounded-xl shadow-md p-6 flex items-center hover:shadow-lg transition-all cursor-pointer hover:scale-[1.02]"
          onClick={() => navigateTo('wallet')}
        >
          <div className="bg-gradient-to-br from-purple-100 to-purple-50 p-4 rounded-full mr-4">
            <FaCoins className="text-purple-600 text-2xl" />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Account Balance</h3>
            <p className="text-2xl font-bold text-gray-800">
              {stats.accountBalance} <span className="text-yellow-500">GC</span>
            </p>
            <p className="text-green-500 text-sm flex items-center">
              <GiProgression className="mr-1" /> +320 this week
            </p>
          </div>
        </div>

        {/* Win Rate */}
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
          <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-4 rounded-full mr-4">
            <FaChartLine className="text-blue-600 text-2xl" />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Win Rate</h3>
            <p className="text-2xl font-bold text-gray-800">{stats.winRate}%</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full" 
                style={{ width: `${stats.winRate}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Total Challenges */}
        <div 
          className="bg-white rounded-xl shadow-md p-6 flex items-center hover:shadow-lg transition-all cursor-pointer hover:scale-[1.02]"
          onClick={() => navigateTo('coding')}
        >
          <div className="bg-gradient-to-br from-green-100 to-green-50 p-4 rounded-full mr-4">
            <RiSwordFill className="text-green-600 text-2xl" />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Total Challenges</h3>
            <p className="text-2xl font-bold text-gray-800">{stats.totalChallenges}</p>
            <p className="text-gray-500 text-sm">24 completed this month</p>
          </div>
        </div>

        {/* Current Level */}
        <div 
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all cursor-pointer hover:scale-[1.02]"
          onClick={() => navigateTo('profile')}
        >
          <div className="flex items-center mb-4">
            <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 p-4 rounded-full mr-4">
              <FaUserShield className="text-yellow-600 text-2xl" />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Current Level</h3>
              <p className="text-2xl font-bold text-gray-800">Level {stats.currentLevel}</p>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm text-gray-500 mb-1">
              <span>XP Progress</span>
              <span>{stats.xpProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-gradient-to-r from-yellow-500 to-yellow-300 h-2.5 rounded-full" 
                style={{ width: `${stats.xpProgress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* KDA Ratio */}
        <div 
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all cursor-pointer hover:scale-[1.02]"
          onClick={() => navigateTo('gaming')}
        >
          <div className="flex items-center mb-4">
            <div className="bg-gradient-to-br from-red-100 to-red-50 p-4 rounded-full mr-4">
              <GiSwordman className="text-red-600 text-2xl" />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm font-medium">KDA Ratio</h3>
              <p className="text-2xl font-bold text-gray-800">{stats.kdaRatio}</p>
            </div>
          </div>
          <p className="text-gray-500 text-sm">Top 8% of players</p>
        </div>

        {/* Coding Rank */}
        <div 
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all cursor-pointer hover:scale-[1.02]"
          onClick={() => navigateTo('coding')}
        >
          <div className="flex items-center mb-4">
            <div className="bg-gradient-to-br from-indigo-100 to-indigo-50 p-4 rounded-full mr-4">
              <FaCode className="text-indigo-600 text-2xl" />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Coding Rank</h3>
              <p className="text-2xl font-bold text-gray-800">{stats.codingRank}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">Top 10%</span>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">+3 this month</span>
          </div>
        </div>

        {/* Tournaments Won */}
        <div 
          className="bg-white rounded-xl shadow-md p-6 flex items-center hover:shadow-lg transition-all cursor-pointer hover:scale-[1.02]"
          onClick={() => navigateTo('gaming')}
        >
          <div className="bg-gradient-to-br from-amber-100 to-amber-50 p-4 rounded-full mr-4">
            <FaTrophy className="text-amber-600 text-2xl" />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Tournaments Won</h3>
            <p className="text-2xl font-bold text-gray-800">{stats.tournamentsWon}</p>
            <p className="text-gray-500 text-sm">5 podium finishes</p>
          </div>
        </div>

        {/* Favorite Languages */}
        <div className="bg-white rounded-xl shadow-md p-6 col-span-1 md:col-span-2">
          <h3 className="text-gray-800 font-medium mb-4 flex items-center">
            <SiLeetcode className="mr-2 text-orange-500" /> Top Coding Languages
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {stats.favoriteLanguages.map((language, index) => (
              <div key={index} className="text-center group">
                <div className="relative h-32 w-full mb-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors p-4">
                  <div className="text-4xl mb-2">
                    {language === 'Python' && <SiPython className="text-blue-400" />}
                    {language === 'JavaScript' && <SiCodewars className="text-yellow-400" />}
                    {language === 'C++' && <FaCode className="text-purple-400" />}
                  </div>
                  <p className="text-sm font-medium text-gray-700">{language}</p>
                </div>
                <button 
                  onClick={() => navigateTo('coding')}
                  className="text-xs text-purple-600 hover:text-purple-400"
                >
                  View challenges →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;