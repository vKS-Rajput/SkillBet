import React, { useState } from 'react';
import { FaFilter, FaSearch, FaTrophy, FaUsers, FaClock, FaLock, FaUnlock, FaGamepad, FaCoins, FaFire } from 'react-icons/fa';
import { SiValorant, SiCounterstrike, SiEpicgames, SiSteam, SiOrigin } from 'react-icons/si';
import { IoMdFootball } from 'react-icons/io';
import { GiPistolGun, GiBattleAxe, GiSwordman, GiArena, GiCrossedSwords, GiPodiumWinner } from 'react-icons/gi';
import { BsController } from 'react-icons/bs';
import { RiSwordFill } from 'react-icons/ri';

const Gaming = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Gaming contests data
  const contests = [
    {
      id: 1,
      title: "Valorant Champions Tour",
      type: "megacontest",
      category: "fps",
      platform: "valorant",
      date: "2023-06-15",
      duration: "4 hours",
      participants: 12500,
      prize: "$50,000",
      locked: false,
      difficulty: "Hard",
      entryFee: 50,
      featured: true
    },
    {
      id: 2,
      title: "Weekly CS:GO Tournament",
      type: "weekly",
      category: "fps",
      platform: "steam",
      date: "2023-06-12",
      duration: "2 hours",
      participants: 8500,
      prize: "Premium Skins",
      locked: false,
      difficulty: "Medium",
      entryFee: 10
    },
    {
      id: 3,
      title: "1v1 Fortnite Duel",
      type: "headtohead",
      category: "battle-royale",
      platform: "epic",
      date: "2023-06-10",
      duration: "1 hour",
      participants: 2,
      prize: "Exclusive Emote",
      locked: false,
      difficulty: "Easy",
      entryFee: 5
    },
    {
      id: 4,
      title: "FIFA 23 World Cup",
      type: "megacontest",
      category: "sports",
      platform: "steam",
      date: "2023-06-20",
      duration: "3 hours",
      participants: 20000,
      prize: "$30,000",
      locked: true,
      difficulty: "Hard",
      entryFee: 75,
      featured: true
    },
    {
      id: 5,
      title: "Free BGMI Challenge",
      type: "free",
      category: "battle-royale",
      platform: "mobile",
      date: "2023-06-08",
      duration: "1.5 hours",
      participants: 50000,
      prize: "In-game Currency",
      locked: false,
      difficulty: "Medium",
      entryFee: 0
    },
    {
      id: 6,
      title: "Apex Legends Showdown",
      type: "headtohead",
      category: "battle-royale",
      platform: "steam",
      date: "2023-06-09",
      duration: "45 mins",
      participants: 2,
      prize: "Legendary Skin",
      locked: false,
      difficulty: "Hard",
      entryFee: 15
    },
    {
      id: 7,
      title: "League of Legends Clash",
      type: "weekly",
      category: "moba",
      platform: "riot",
      date: "2023-06-14",
      duration: "3 hours",
      participants: 15000,
      prize: "RP & Skins",
      locked: false,
      difficulty: "Medium",
      entryFee: 20
    },
    {
      id: 8,
      title: "Call of Duty Warzone Trios",
      type: "team",
      category: "fps",
      platform: "battle.net",
      date: "2023-06-11",
      duration: "2.5 hours",
      participants: 300,
      prize: "$5,000",
      locked: false,
      difficulty: "Hard",
      entryFee: 30
    },
  ];

  // Filter contests based on active filter, category and search query
  const filteredContests = contests.filter(contest => {
    const matchesFilter = activeFilter === 'all' || contest.type === activeFilter;
    const matchesCategory = activeCategory === 'all' || contest.category === activeCategory;
    const matchesSearch = contest.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         contest.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contest.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesCategory && matchesSearch;
  });

  // Get platform icon
  const getPlatformIcon = (platform) => {
    switch(platform) {
      case 'valorant': return <SiValorant className="text-red-500 text-xl" />;
      case 'steam': return <SiSteam className="text-gray-200 text-xl" />;
      case 'epic': return <SiEpicgames className="text-purple-400 text-xl" />;
      case 'mobile': return <BsController className="text-yellow-400 text-xl" />;
      case 'riot': return <RiSwordFill className="text-yellow-600 text-xl" />;
      case 'battle.net': return <SiOrigin className="text-blue-400 text-xl" />;
      default: return <FaGamepad className="text-gray-400 text-xl" />;
    }
  };

  // Get category icon and color
  const getCategoryInfo = (category) => {
    switch(category) {
      case 'fps': 
        return { 
          icon: <GiPistolGun className="text-red-500 text-lg" />, 
          color: 'bg-red-900/50', 
          text: 'text-red-400',
          name: 'FPS'
        };
      case 'battle-royale': 
        return { 
          icon: <GiBattleAxe className="text-purple-400 text-lg" />, 
          color: 'bg-purple-900/50', 
          text: 'text-purple-400',
          name: 'Battle Royale'
        };
      case 'sports': 
        return { 
          icon: <IoMdFootball className="text-green-400 text-lg" />, 
          color: 'bg-green-900/50', 
          text: 'text-green-400',
          name: 'Sports'
        };
      case 'moba':
        return {
          icon: <GiSwordman className="text-yellow-500 text-lg" />,
          color: 'bg-yellow-900/50',
          text: 'text-yellow-400',
          name: 'MOBA'
        };
      default: 
        return { 
          icon: <FaGamepad className="text-gray-400 text-lg" />, 
          color: 'bg-gray-800/50', 
          text: 'text-gray-400',
          name: 'Other'
        };
    }
  };

  // Difficulty badge
  const getDifficultyBadge = (difficulty) => {
    switch(difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-900/50 text-green-400 border-green-600';
      case 'medium': return 'bg-yellow-900/50 text-yellow-400 border-yellow-600';
      case 'hard': return 'bg-red-900/50 text-red-400 border-red-600';
      default: return 'bg-gray-800/50 text-gray-400 border-gray-600';
    }
  };

  // Type badge
  const getTypeBadge = (type) => {
    switch(type.toLowerCase()) {
      case 'megacontest': return 'bg-gradient-to-r from-red-900/70 to-red-900/30 text-red-400 border-red-600';
      case 'weekly': return 'bg-gradient-to-r from-blue-900/70 to-blue-900/30 text-blue-400 border-blue-600';
      case 'headtohead': return 'bg-gradient-to-r from-green-900/70 to-green-900/30 text-green-400 border-green-600';
      case 'team': return 'bg-gradient-to-r from-purple-900/70 to-purple-900/30 text-purple-400 border-purple-600';
      case 'free': return 'bg-gradient-to-r from-cyan-900/70 to-cyan-900/30 text-cyan-400 border-cyan-600';
      default: return 'bg-gray-800/50 text-gray-400 border-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4 md:p-6 flex flex-col relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="absolute opacity-10">
            {i % 2 === 0 ? <GiCrossedSwords className="text-white" size={24} /> : <FaGamepad className="text-purple-300" size={20} />}
          </div>
        ))}
      </div>
      
      {/* Header */}
      <div className="mb-8 relative z-10">
        <div className="flex items-center gap-4">
          <GiArena className="text-purple-500 text-4xl md:text-5xl" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400">
              Battle Arena
            </h1>
            <p className="text-gray-400 mt-1 flex items-center gap-2">
              <span className="text-purple-400 animate-pulse">⚔️</span> 
              <span>Compete in esports tournaments and claim your glory</span>
              <span className="text-purple-400 animate-pulse">⚔️</span>
            </p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-lg p-4 mb-6 sticky top-0 z-10 border border-gray-700/50 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-600 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-cyan-600 rounded-full filter blur-3xl opacity-10"></div>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-purple-400" />
          </div>
          <input
            type="text"
            placeholder="Search tournaments by title, platform or category..."
            className="pl-10 pr-4 py-3 w-full rounded-lg bg-gray-700/70 border border-gray-600/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 backdrop-blur-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Category Filters */}
          <div className="flex-1">
            <h3 className="text-xs font-medium text-purple-300 mb-2 uppercase tracking-wider">Game Categories</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 transition-all ${
                  activeCategory === 'all' ? 
                  'bg-purple-600/90 text-white shadow-purple-glow' : 
                  'bg-gray-700/70 text-gray-300 border border-gray-600/50 hover:bg-gray-700 hover:border-gray-500'
                }`}
              >
                <FaGamepad /> All Games
              </button>
              <button
                onClick={() => setActiveCategory('fps')}
                className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 transition-all ${
                  activeCategory === 'fps' ? 
                  'bg-red-600/90 text-white shadow-red-glow' : 
                  'bg-gray-700/70 text-gray-300 border border-gray-600/50 hover:bg-gray-700 hover:border-gray-500'
                }`}
              >
                <GiPistolGun /> FPS
              </button>
              <button
                onClick={() => setActiveCategory('battle-royale')}
                className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 transition-all ${
                  activeCategory === 'battle-royale' ? 
                  'bg-purple-600/90 text-white shadow-purple-glow' : 
                  'bg-gray-700/70 text-gray-300 border border-gray-600/50 hover:bg-gray-700 hover:border-gray-500'
                }`}
              >
                <GiBattleAxe /> Battle Royale
              </button>
              <button
                onClick={() => setActiveCategory('sports')}
                className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 transition-all ${
                  activeCategory === 'sports' ? 
                  'bg-green-600/90 text-white shadow-green-glow' : 
                  'bg-gray-700/70 text-gray-300 border border-gray-600/50 hover:bg-gray-700 hover:border-gray-500'
                }`}
              >
                <IoMdFootball /> Sports
              </button>
              <button
                onClick={() => setActiveCategory('moba')}
                className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 transition-all ${
                  activeCategory === 'moba' ? 
                  'bg-yellow-600/90 text-white shadow-yellow-glow' : 
                  'bg-gray-700/70 text-gray-300 border border-gray-600/50 hover:bg-gray-700 hover:border-gray-500'
                }`}
              >
                <GiSwordman /> MOBA
              </button>
            </div>
          </div>

          {/* Type Filters */}
          <div className="flex-1">
            <h3 className="text-xs font-medium text-purple-300 mb-2 uppercase tracking-wider">Tournament Types</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 transition-all ${
                  activeFilter === 'all' ? 
                  'bg-gray-700 text-white border border-purple-400 shadow-purple-glow' : 
                  'bg-gray-700/70 text-gray-300 border border-gray-600/50 hover:bg-gray-700 hover:border-gray-500'
                }`}
              >
                <FaFilter /> All Types
              </button>
              <button
                onClick={() => setActiveFilter('megacontest')}
                className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 transition-all ${
                  activeFilter === 'megacontest' ? 
                  'bg-red-600/90 text-white shadow-red-glow' : 
                  'bg-gray-700/70 text-gray-300 border border-gray-600/50 hover:bg-gray-700 hover:border-gray-500'
                }`}
              >
                <FaTrophy /> Mega
              </button>
              <button
                onClick={() => setActiveFilter('weekly')}
                className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 transition-all ${
                  activeFilter === 'weekly' ? 
                  'bg-blue-600/90 text-white shadow-blue-glow' : 
                  'bg-gray-700/70 text-gray-300 border border-gray-600/50 hover:bg-gray-700 hover:border-gray-500'
                }`}
              >
                <FaClock /> Weekly
              </button>
              <button
                onClick={() => setActiveFilter('headtohead')}
                className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 transition-all ${
                  activeFilter === 'headtohead' ? 
                  'bg-green-600/90 text-white shadow-green-glow' : 
                  'bg-gray-700/70 text-gray-300 border border-gray-600/50 hover:bg-gray-700 hover:border-gray-500'
                }`}
              >
                <GiCrossedSwords /> 1v1
              </button>
              <button
                onClick={() => setActiveFilter('team')}
                className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 transition-all ${
                  activeFilter === 'team' ? 
                  'bg-purple-600/90 text-white shadow-purple-glow' : 
                  'bg-gray-700/70 text-gray-300 border border-gray-600/50 hover:bg-gray-700 hover:border-gray-500'
                }`}
              >
                <FaUsers /> Team
              </button>
              <button
                onClick={() => setActiveFilter('free')}
                className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 transition-all ${
                  activeFilter === 'free' ? 
                  'bg-cyan-600/90 text-white shadow-cyan-glow' : 
                  'bg-gray-700/70 text-gray-300 border border-gray-600/50 hover:bg-gray-700 hover:border-gray-500'
                }`}
              >
                <FaUnlock /> Free
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 flex-grow relative z-10">
        {filteredContests.map(contest => {
          const categoryInfo = getCategoryInfo(contest.category);
          return (
            <div key={contest.id} className={`relative bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border-t-4 transition-all hover:shadow-xl hover:-translate-y-1 hover:border-opacity-100 border-opacity-80 ${
              contest.type === 'megacontest' ? 'border-red-500' :
              contest.type === 'weekly' ? 'border-blue-500' :
              contest.type === 'headtohead' ? 'border-green-500' :
              contest.type === 'team' ? 'border-purple-500' :
              'border-cyan-500'
            } ${contest.featured ? 'ring-2 ring-purple-500/50' : ''}`}>
              
              {contest.featured && (
                <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 z-10">
                  <FaFire className="text-yellow-200" /> FEATURED
                </div>
              )}
              
              {/* Contest Header */}
              <div className="p-5 border-b border-gray-700/50 relative">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/10 to-cyan-900/10 opacity-30 pointer-events-none"></div>
                <div className="flex justify-between items-start mb-2 relative z-1">
                  <div className="flex items-center">
                    {categoryInfo.icon}
                    <span className={`ml-2 text-xs font-medium px-2 py-1 rounded-full ${categoryInfo.color} ${categoryInfo.text} border ${categoryInfo.color.replace('bg', 'border')}`}>
                      {categoryInfo.name}
                    </span>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getDifficultyBadge(contest.difficulty)}`}>
                    {contest.difficulty}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mt-2 relative z-1">{contest.title}</h3>
                <div className="flex items-center mt-2 text-gray-400 relative z-1">
                  {getPlatformIcon(contest.platform)}
                  <span className="ml-2 text-sm capitalize">{contest.platform.replace('.net', '').replace('.', ' ')}</span>
                </div>
              </div>

              {/* Contest Details */}
              <div className="p-5 relative">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/5 to-cyan-900/5 opacity-20 pointer-events-none"></div>
                <div className="grid grid-cols-2 gap-4 mb-4 relative z-1">
                  <div>
                    <p className="text-purple-300 text-xs uppercase tracking-wider">Date</p>
                    <p className="font-medium text-sm text-gray-200 flex items-center">
                      <FaClock className="mr-1 text-purple-400" /> 
                      {new Date(contest.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <div>
                    <p className="text-purple-300 text-xs uppercase tracking-wider">Duration</p>
                    <p className="font-medium text-sm text-gray-200">{contest.duration}</p>
                  </div>
                  <div>
                    <p className="text-purple-300 text-xs uppercase tracking-wider">Players</p>
                    <p className="font-medium text-sm text-gray-200 flex items-center">
                      <FaUsers className="mr-1 text-purple-400" /> 
                      {contest.participants > 1000 ? 
                        `${(contest.participants/1000).toFixed(1)}k` : 
                        contest.participants}
                    </p>
                  </div>
                  <div>
                    <p className="text-purple-300 text-xs uppercase tracking-wider">Prize</p>
                    <p className="font-medium text-sm text-yellow-400 flex items-center">
                      <GiPodiumWinner className="mr-1" /> 
                      {contest.prize}
                    </p>
                  </div>
                </div>

                {/* Type and Entry Fee */}
                <div className="mb-4 flex justify-between items-center relative z-1">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getTypeBadge(contest.type)}`}>
                    {contest.type === 'megacontest' ? 'Mega Contest' :
                     contest.type === 'headtohead' ? '1v1 Duel' :
                     contest.type === 'team' ? 'Team Battle' :
                     contest.type.charAt(0).toUpperCase() + contest.type.slice(1)}
                  </span>
                  <div className="text-right">
                    <p className="text-purple-300 text-xs uppercase tracking-wider">Entry Fee</p>
                    <p className="font-bold flex items-center justify-end text-gray-200">
                      {contest.entryFee > 0 ? (
                        <>
                          <FaCoins className="text-yellow-400 mr-1" /> {contest.entryFee}
                        </>
                      ) : (
                        <span className="text-green-400 flex items-center">
                          <FaUnlock className="mr-1" /> FREE
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <button className={`w-full py-3 rounded-lg font-medium flex items-center justify-center relative overflow-hidden transition-all ${
                  contest.locked ? 'bg-gray-700/70 text-gray-400 cursor-not-allowed border border-gray-600/50' : 
                  contest.type === 'megacontest' ? 'bg-gradient-to-r from-red-600/90 to-red-700/90 hover:from-red-700 hover:to-red-800 text-white shadow-red-glow' :
                  contest.type === 'weekly' ? 'bg-gradient-to-r from-blue-600/90 to-blue-700/90 hover:from-blue-700 hover:to-blue-800 text-white shadow-blue-glow' :
                  contest.type === 'headtohead' ? 'bg-gradient-to-r from-green-600/90 to-green-700/90 hover:from-green-700 hover:to-green-800 text-white shadow-green-glow' :
                  contest.type === 'team' ? 'bg-gradient-to-r from-purple-600/90 to-purple-700/90 hover:from-purple-700 hover:to-purple-800 text-white shadow-purple-glow' :
                  'bg-gradient-to-r from-cyan-600/90 to-cyan-500/90 hover:from-cyan-700 hover:to-cyan-600 text-white shadow-cyan-glow'
                }`}>
                  <span className="relative z-10 flex items-center">
                    {contest.locked ? (
                      <>
                        <FaLock className="mr-2" /> Unlock with Premium
                      </>
                    ) : (
                      <>
                        <FaTrophy className="mr-2" /> Join Tournament
                      </>
                    )}
                  </span>
                  <span className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity"></span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredContests.length === 0 && (
        <div className="flex-grow flex flex-col items-center justify-center py-12 relative z-10">
          <div className="w-32 h-32 bg-gray-800/70 rounded-full flex items-center justify-center mb-6 border-2 border-purple-500/50 backdrop-blur-sm">
            <GiArena className="text-purple-400 text-5xl animate-pulse" />
          </div>
          <h3 className="text-2xl font-medium text-white text-center">No tournaments found, champion</h3>
          <p className="text-gray-400 mt-2 max-w-md text-center">
            The arena is quiet now... Adjust your search or prepare for upcoming battles!
          </p>
          <button 
            onClick={() => {
              setActiveFilter('all');
              setActiveCategory('all');
              setSearchQuery('');
            }}
            className="mt-6 px-6 py-2 bg-gradient-to-r from-purple-600/90 to-blue-600/90 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all flex items-center gap-2 shadow-lg"
          >
            <GiCrossedSwords /> Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Gaming;

