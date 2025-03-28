import React, { useState } from 'react';
import { FaFilter, FaSearch, FaTrophy, FaUsers, FaClock, FaLock, FaUnlock, FaCode, FaTerminal, FaDatabase } from 'react-icons/fa';
import { SiLeetcode, SiCodeforces, SiCodechef, SiJavascript, SiPython, SiTypescript, SiCplusplus } from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { BsCalendarEvent } from 'react-icons/bs';

const Coding = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Contest data with categories
  const contests = [
    {
      id: 1,
      title: "Binary Battle Royale",
      type: "megacontest",
      category: "algorithms",
      platform: "leetcode",
      date: "2023-06-15",
      duration: "3 hours",
      participants: 1250,
      prize: "$10,000",
      locked: false,
      difficulty: "Hard",
      tags: ["DP", "Graph", "Bitmask"]
    },
    {
      id: 2,
      title: "Weekly Code Sprint",
      type: "weekly",
      category: "data-structures",
      platform: "codeforces",
      date: "2023-06-12",
      duration: "2 hours",
      participants: 850,
      prize: "Premium Subscription",
      locked: false,
      difficulty: "Medium",
      tags: ["Array", "Hash Table", "Sorting"]
    },
    {
      id: 3,
      title: "TypeScript Duel",
      type: "headtohead",
      category: "typescript",
      platform: "codechef",
      date: "2023-06-10",
      duration: "1 hour",
      participants: 2,
      prize: "Exclusive Badge",
      locked: false,
      difficulty: "Easy",
      tags: ["Types", "Interfaces"]
    },
    {
      id: 4,
      title: "Dynamic Programming Masters",
      type: "megacontest",
      category: "algorithms",
      platform: "leetcode",
      date: "2023-06-20",
      duration: "4 hours",
      participants: 2000,
      prize: "$15,000",
      locked: true,
      difficulty: "Hard",
      tags: ["DP", "Memoization", "Optimization"]
    },
    {
      id: 5,
      title: "System Design Challenge",
      type: "free",
      category: "system-design",
      platform: "leetcode",
      date: "2023-06-08",
      duration: "1.5 hours",
      participants: 3200,
      prize: "Swag Kit",
      locked: false,
      difficulty: "Medium",
      tags: ["Scalability", "Microservices"]
    },
    {
      id: 6,
      title: "Low-Level Optimization",
      type: "headtohead",
      category: "c++",
      platform: "codechef",
      date: "2023-06-09",
      duration: "45 mins",
      participants: 2,
      prize: "Rating Points",
      locked: false,
      difficulty: "Hard",
      tags: ["Memory", "Pointers", "Optimization"]
    },
  ];

  // Filter contests based on active filter, category and search query
  const filteredContests = contests.filter(contest => {
    const matchesFilter = activeFilter === 'all' || contest.type === activeFilter;
    const matchesCategory = activeCategory === 'all' || contest.category === activeCategory;
    const matchesSearch = contest.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         contest.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contest.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contest.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesCategory && matchesSearch;
  });

  // Get platform icon
  const getPlatformIcon = (platform) => {
    switch(platform) {
      case 'leetcode': return <SiLeetcode className="text-orange-500" />;
      case 'codeforces': return <SiCodeforces className="text-red-500" />;
      case 'codechef': return <SiCodechef className="text-brown-500" />;
      default: return <FaTerminal className="text-gray-400" />;
    }
  };

  // Get category icon and color
  const getCategoryInfo = (category) => {
    switch(category) {
      case 'algorithms': 
        return { icon: <FaCode className="text-purple-400" />, color: 'bg-purple-900', text: 'text-purple-400' };
      case 'data-structures': 
        return { icon: <FaDatabase className="text-blue-400" />, color: 'bg-blue-900', text: 'text-blue-400' };
      case 'typescript': 
        return { icon: <SiTypescript className="text-blue-500" />, color: 'bg-blue-800', text: 'text-blue-300' };
      case 'javascript': 
        return { icon: <SiJavascript className="text-yellow-400" />, color: 'bg-yellow-900', text: 'text-yellow-400' };
      case 'python': 
        return { icon: <SiPython className="text-green-400" />, color: 'bg-green-900', text: 'text-green-400' };
      case 'c++': 
        return { icon: <SiCplusplus className="text-blue-300" />, color: 'bg-blue-800', text: 'text-blue-300' };
      case 'java': 
        return { icon: <FaJava className="text-red-400" />, color: 'bg-red-900', text: 'text-red-400' };
      case 'system-design': 
        return { icon: <FaCode className="text-red-400" />, color: 'bg-red-900', text: 'text-red-400' };
      default: 
        return { icon: <FaCode className="text-gray-400" />, color: 'bg-gray-800', text: 'text-gray-400' };
    }
  };

  // Difficulty badge
  const getDifficultyBadge = (difficulty) => {
    switch(difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-900 text-green-400 border-green-700';
      case 'medium': return 'bg-yellow-900 text-yellow-400 border-yellow-700';
      case 'hard': return 'bg-red-900 text-red-400 border-red-700';
      default: return 'bg-gray-800 text-gray-400 border-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6 flex flex-col">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
          &lt;CodeBattles/&gt;
        </h1>
        <p className="text-gray-400 mt-2 font-mono">Compete. Solve. Dominate.</p>
      </div>

      {/* Filters Section */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 mb-6 sticky top-0 z-10">
        {/* Search Bar */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search by title, platform, category or tags..."
            className="pl-10 pr-4 py-3 w-full rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono placeholder-gray-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Category Filters */}
          <div className="flex-1">
            <h3 className="text-xs font-mono text-gray-500 mb-2">CATEGORIES</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 font-mono ${activeCategory === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'}`}
              >
                <FaCode /> All
              </button>
              <button
                onClick={() => setActiveCategory('algorithms')}
                className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 font-mono ${activeCategory === 'algorithms' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'}`}
              >
                <FaCode /> Algos
              </button>
              <button
                onClick={() => setActiveCategory('data-structures')}
                className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 font-mono ${activeCategory === 'data-structures' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'}`}
              >
                <FaDatabase /> DS
              </button>
              <button
                onClick={() => setActiveCategory('typescript')}
                className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 font-mono ${activeCategory === 'typescript' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'}`}
              >
                <SiTypescript /> TS
              </button>
              <button
                onClick={() => setActiveCategory('c++')}
                className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 font-mono ${activeCategory === 'c++' ? 'bg-blue-400 text-white' : 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'}`}
              >
                <SiCplusplus /> C++
              </button>
            </div>
          </div>

          {/* Type Filters */}
          <div className="flex-1">
            <h3 className="text-xs font-mono text-gray-500 mb-2">CHALLENGE TYPES</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 font-mono ${activeFilter === 'all' ? 'bg-gray-600 text-white' : 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'}`}
              >
                <FaFilter /> All
              </button>
              <button
                onClick={() => setActiveFilter('megacontest')}
                className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 font-mono ${activeFilter === 'megacontest' ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'}`}
              >
                <FaTrophy /> Mega
              </button>
              <button
                onClick={() => setActiveFilter('weekly')}
                className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 font-mono ${activeFilter === 'weekly' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'}`}
              >
                <BsCalendarEvent /> Weekly
              </button>
              <button
                onClick={() => setActiveFilter('headtohead')}
                className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 font-mono ${activeFilter === 'headtohead' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'}`}
              >
                <FaUsers /> 1v1
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow">
        {filteredContests.map(contest => {
          const categoryInfo = getCategoryInfo(contest.category);
          return (
            <div key={contest.id} className={`bg-gray-800 rounded-lg overflow-hidden border-l-4 ${
              contest.type === 'megacontest' ? 'border-red-500' :
              contest.type === 'weekly' ? 'border-blue-500' :
              contest.type === 'headtohead' ? 'border-green-500' :
              'border-purple-500'
            } transition-all hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1`}>
              {/* Contest Header */}
              <div className="p-5 border-b border-gray-700">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    {categoryInfo.icon}
                    <span className={`ml-2 text-xs font-mono px-2 py-1 rounded ${categoryInfo.color} ${categoryInfo.text}`}>
                      {contest.category.replace('-', ' ')}
                    </span>
                  </div>
                  <span className={`text-xs font-mono px-2 py-1 rounded border ${getDifficultyBadge(contest.difficulty)}`}>
                    {contest.difficulty}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mt-2 font-mono">{contest.title}</h3>
                <div className="flex items-center mt-2 text-gray-400">
                  {getPlatformIcon(contest.platform)}
                  <span className="ml-2 text-sm capitalize font-mono">{contest.platform}</span>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {contest.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 bg-gray-700 rounded text-gray-300 font-mono">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contest Details */}
              <div className="p-5">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-gray-500 text-xs font-mono">DATE</p>
                    <p className="font-medium text-sm font-mono">{new Date(contest.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-mono">DURATION</p>
                    <p className="font-medium text-sm font-mono">{contest.duration}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-mono">PARTICIPANTS</p>
                    <p className="font-medium text-sm flex items-center font-mono">
                      <FaUsers className="mr-1 text-sm" /> {contest.participants.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-mono">PRIZE</p>
                    <p className="font-medium text-sm font-mono">{contest.prize}</p>
                  </div>
                </div>

                {/* Action Button */}
                <button className={`w-full py-3 rounded-lg font-medium flex items-center justify-center font-mono ${
                  contest.locked ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 
                  contest.type === 'megacontest' ? 'bg-gradient-to-r from-red-600 to-red-700 text-white' :
                  contest.type === 'weekly' ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white' :
                  contest.type === 'headtohead' ? 'bg-gradient-to-r from-green-600 to-green-700 text-white' :
                  'bg-gradient-to-r from-purple-600 to-purple-700 text-white'
                } transition-all hover:opacity-90`}>
                  {contest.locked ? (
                    <span className="flex items-center">
                      <FaLock className="mr-2" /> Unlock
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <FaTerminal className="mr-2" /> Join Now
                    </span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredContests.length === 0 && (
        <div className="flex-grow flex flex-col items-center justify-center py-12">
          <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center mb-6 border border-dashed border-gray-700">
            <FaSearch className="text-gray-600 text-4xl" />
          </div>
          <h3 className="text-2xl font-medium text-gray-300 font-mono">No challenges found</h3>
          <p className="text-gray-500 mt-2 max-w-md text-center font-mono">
            // Try adjusting your search or filter criteria
          </p>
          <button 
            onClick={() => {
              setActiveFilter('all');
              setActiveCategory('all');
              setSearchQuery('');
            }}
            className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-mono"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Coding;