import React, { useState } from 'react';
import { FaSearch, FaFilter, FaTrophy, FaCoins, FaLock, FaUnlock, FaUserFriends, FaChartLine, FaChartBar, FaExchangeAlt } from 'react-icons/fa';
import { SiBinance, SiBitcoin, SiEthereum } from 'react-icons/si';
import { GiCash, GiPayMoney, GiMoneyStack, GiTrade } from 'react-icons/gi';
import { BsGraphUp, BsCurrencyExchange } from 'react-icons/bs';

const Trading = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Trading contests data
  const contests = [
    {
      id: 1,
      title: "Crypto Mega Contest",
      type: "megacontest",
      asset: "crypto",
      date: "2023-06-18",
      duration: "24 hours",
      participants: 850,
      prizePool: "$50,000",
      entryFee: "$50",
      locked: false,
      maxParticipants: 1000,
      volatility: "High",
      leverage: "10x"
    },
    {
      id: 2,
      title: "Weekly Stock Challenge",
      type: "weekly",
      asset: "stocks",
      date: "2023-06-12",
      duration: "5 days",
      participants: 420,
      prizePool: "$5,000",
      entryFee: "Free",
      locked: false,
      maxParticipants: 500,
      volatility: "Medium",
      leverage: "5x"
    },
    {
      id: 3,
      title: "1v1 Crypto Duel",
      type: "headtohead",
      asset: "crypto",
      date: "2023-06-10",
      duration: "1 hour",
      participants: 2,
      prizePool: "$200",
      entryFee: "$10",
      locked: false,
      maxParticipants: 2,
      volatility: "Extreme",
      leverage: "25x"
    },
    {
      id: 4,
      title: "Forex Masters",
      type: "megacontest",
      asset: "forex",
      date: "2023-06-20",
      duration: "48 hours",
      participants: 320,
      prizePool: "$25,000",
      entryFee: "$100",
      locked: true,
      maxParticipants: 500,
      volatility: "Low",
      leverage: "50x"
    },
    {
      id: 5,
      title: "Beginner's Crypto",
      type: "free",
      asset: "crypto",
      date: "2023-06-08",
      duration: "12 hours",
      participants: 1200,
      prizePool: "$1,000",
      entryFee: "Free",
      locked: false,
      maxParticipants: 1500,
      volatility: "Low",
      leverage: "1x"
    },
    {
      id: 6,
      title: "NFT Trading Battle",
      type: "headtohead",
      asset: "nft",
      date: "2023-06-09",
      duration: "6 hours",
      participants: 2,
      prizePool: "$500",
      entryFee: "$25",
      locked: false,
      maxParticipants: 2,
      volatility: "High",
      leverage: "None"
    },
  ];

  // Filter contests
  const filteredContests = contests.filter(contest => {
    const matchesFilter = activeFilter === 'all' || contest.type === activeFilter;
    const matchesSearch = contest.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         contest.asset.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Get asset icon
  const getAssetIcon = (asset) => {
    switch(asset) {
      case 'crypto': return <SiBitcoin className="text-yellow-500" />;
      case 'stocks': return <BsGraphUp className="text-green-500" />;
      case 'forex': return <BsCurrencyExchange className="text-blue-500" />;
      case 'nft': return <GiTrade className="text-purple-500" />;
      default: return <FaChartLine className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <GiTrade className="text-2xl text-purple-400" />
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
            Trading Arena
          </h1>
        </div>
        <p className="text-gray-400">Compete in real-time trading battles and climb the leaderboards</p>
      </div>

      {/* Market Stats Bar */}
      <div className="bg-gray-800 rounded-lg p-4 mb-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <SiBitcoin className="text-yellow-500" />
          <span>BTC: $26,842</span>
          <span className="text-red-400 text-xs">-2.4%</span>
        </div>
        <div className="flex items-center gap-2">
          <SiEthereum className="text-purple-400" />
          <span>ETH: $1,872</span>
          <span className="text-green-400 text-xs">+1.2%</span>
        </div>
        <div className="flex items-center gap-2">
          <FaChartLine className="text-blue-400" />
          <span>S&P 500: 4,328</span>
          <span className="text-green-400 text-xs">+0.8%</span>
        </div>
        <div className="flex items-center gap-2">
          <BsCurrencyExchange className="text-green-400" />
          <span>EUR/USD: 1.0924</span>
          <span className="text-red-400 text-xs">-0.3%</span>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        {/* Search Bar */}
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search contests..."
            className="pl-10 pr-4 py-2 w-full rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
              activeFilter === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <FaFilter /> All
          </button>
          <button
            onClick={() => setActiveFilter('megacontest')}
            className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
              activeFilter === 'megacontest' ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <FaTrophy /> Mega
          </button>
          <button
            onClick={() => setActiveFilter('weekly')}
            className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
              activeFilter === 'weekly' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <FaChartBar /> Weekly
          </button>
          <button
            onClick={() => setActiveFilter('headtohead')}
            className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
              activeFilter === 'headtohead' ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <FaExchangeAlt /> 1v1
          </button>
          <button
            onClick={() => setActiveFilter('free')}
            className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
              activeFilter === 'free' ? 'bg-yellow-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <FaUnlock /> Free
          </button>
        </div>
      </div>

      {/* Contests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContests.map(contest => (
          <div key={contest.id} className={`bg-gray-800 rounded-xl shadow-lg overflow-hidden border-t-4 ${
            contest.type === 'megacontest' ? 'border-red-500' :
            contest.type === 'weekly' ? 'border-blue-500' :
            contest.type === 'headtohead' ? 'border-green-500' :
            'border-yellow-500'
          } transition-transform hover:scale-[1.02] hover:shadow-xl`}>
            {/* Contest Header */}
            <div className="p-5 border-b border-gray-700 flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-white">{contest.title}</h3>
                <div className="flex items-center mt-2 gap-3">
                  <div className="flex items-center text-gray-400">
                    {getAssetIcon(contest.asset)}
                    <span className="ml-2 capitalize">{contest.asset}</span>
                  </div>
                  <div className="flex items-center text-xs bg-gray-700 px-2 py-1 rounded">
                    <FaChartLine className="mr-1" />
                    {contest.volatility}
                  </div>
                  <div className="flex items-center text-xs bg-gray-700 px-2 py-1 rounded">
                    <GiTrade className="mr-1" />
                    {contest.leverage}
                  </div>
                </div>
              </div>
              {contest.locked ? (
                <span className="bg-gray-700 text-purple-400 px-3 py-1 rounded-lg text-xs flex items-center">
                  <FaLock className="mr-1" /> PRO
                </span>
              ) : (
                <span className={`px-3 py-1 rounded-lg text-xs flex items-center ${
                  contest.entryFee === "Free" ? "bg-green-900 text-green-400" : "bg-blue-900 text-blue-400"
                }`}>
                  {contest.entryFee === "Free" ? "FREE ENTRY" : "PAID ENTRY"}
                </span>
              )}
            </div>

            {/* Contest Details */}
            <div className="p-5">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-400 text-sm">Starts</p>
                  <p className="font-medium">{new Date(contest.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Duration</p>
                  <p className="font-medium">{contest.duration}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Participants</p>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-700 rounded-full h-2 mr-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full" 
                        style={{ width: `${(contest.participants / contest.maxParticipants) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs">{contest.participants}/{contest.maxParticipants}</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Entry Fee</p>
                  <p className={`font-medium ${
                    contest.entryFee === "Free" ? "text-green-400" : "text-yellow-400"
                  }`}>
                    {contest.entryFee}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-400 text-sm">Prize Pool</p>
                  <p className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                    {contest.prizePool}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button className={`w-full py-3 rounded-lg font-medium flex items-center justify-center transition-colors ${
                contest.locked ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 
                contest.type === 'megacontest' ? 'bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white' :
                contest.type === 'weekly' ? 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white' :
                contest.type === 'headtohead' ? 'bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white' :
                'bg-gradient-to-r from-yellow-600 to-yellow-800 hover:from-yellow-700 hover:to-yellow-900 text-white'
              }`}>
                {contest.locked ? (
                  <>
                    <FaLock className="mr-2" /> Upgrade to PRO
                  </>
                ) : contest.entryFee === "Free" ? (
                  <>
                    <FaUnlock className="mr-2" /> Join Now
                  </>
                ) : (
                  <>
                    <FaCoins className="mr-2" /> Pay {contest.entryFee} to Enter
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredContests.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <FaSearch className="text-gray-400 text-3xl" />
          </div>
          <h3 className="text-xl font-medium text-gray-300">No contests found</h3>
          <p className="text-gray-500 mt-1">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Trading;