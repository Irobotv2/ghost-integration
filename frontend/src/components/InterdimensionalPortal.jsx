import React, { useState, useEffect, useRef } from 'react';
import { Repeat, Wallet, Send, Home, MessageCircle } from 'lucide-react';
import TokenSwappingPage from './TokenSwappingPage';
import TraditionalNav from './TraditionalNav';
import BetaTestForm from './BetaTestForm';
import { useTheme } from '../context/ThemeContext';
import GuidedTour from './GuidedTour';
import { connectKasware, disconnectKasware, signTransaction } from '../services/kaswareService';
import { isMobile } from '../utils/walletDetect';

// Transaction type constants
export const TxType = {
  SIGN_TX: 0,
  SEND_KASPA: 1
};

const Kasportal = () => {
  // Enhanced starfield state for controlled movement with teal/purple theme
  const STAR_COUNT = 150;
  const createStars = () =>
    Array.from({ length: STAR_COUNT }).map(() => ({
      size: Math.random() * 3 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: Math.random() * 0.3 + 0.1,
      color: Math.random() > 0.5 ? 'teal' : 'purple'
    }));
  const [stars, setStars] = useState(createStars);

  // Mouse position for parallax effects
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Portal UI state
  const [activeProtocol, setActiveProtocol] = useState(null);
  const [portalActive, setPortalActive] = useState(false);
  const [showBetaForm, setShowBetaForm] = useState(false);

  // Wallet state
  const [kaswareInstalled, setKaswareInstalled] = useState(false);
  const [connected, setConnected] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState({
    confirmed: 0,
    unconfirmed: 0,
    total: 0,
  });
  const [network, setNetwork] = useState("kaspa_mainnet");
  // Removed KRC20 state

  // Form states for protocols
  const [recipientAddress, setRecipientAddress] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [isSendingKas, setIsSendingKas] = useState(false);

  // Mouse movement tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Protocol definitions for the portal UI with updated theme
  const protocols = {
    swap: {
      name: "Swap",
      icon: <Repeat className="text-teal-200" />,
      description: "Token exchange protocol",
      position: { top: '50%', left: '50%' },
      color: "from-teal-400 to-purple-600"
    }
  };

  // Handle protocol selection
  const handleProtocolClick = (key) => {
    if (key === 'swap') {
      window.location.href = '/swap';
      return;
    }
    setActiveProtocol(activeProtocol === key ? null : key);
  };

  // Connect to wallet
  const connectWallet = async () => {
    try {
      if (window.kasware) {
        const accounts = await window.kasware.requestAccounts();
        setAccounts(accounts);
        setConnected(true);
        setAddress(accounts[0]);

        const balance = await window.kasware.getBalance();
        setBalance(balance);

        // Removed KRC20 balance tracking
      }
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  };

  // Disconnect from wallet
  const disconnectWallet = async () => {
    try {
      setConnected(false);
      setAccounts([]);
      setAddress("");
      setBalance({ confirmed: 0, unconfirmed: 0, total: 0 });
      setKrc20Balances([]);
    } catch (error) {
      console.error("Error disconnecting from wallet:", error);
    }
  };

  // Only show swap functionality on mobile
  if (isMobile()) {
    return (
      <div className="w-full min-h-screen bg-black flex flex-col items-center justify-start pt-4">
        <TokenSwappingPage />
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Enhanced animated background with teal/purple theme */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/10 via-purple-900/10 to-blue-900/10"></div>
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(45,212,191,0.1),transparent_70%)]"
          style={{
            transform: `translate(${mousePosition.x * 50}px, ${mousePosition.y * 50}px)`
          }}
        ></div>

        {/* Enhanced floating particles with teal/purple colors */}
        {stars.map((star, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${star.color === 'teal' ? 'bg-teal-400/30' : 'bg-purple-400/30'} animate-float`}
            style={{
              width: star.size,
              height: star.size,
              left: `${star.left}%`,
              top: `${star.top}%`,
              opacity: star.opacity,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Top navigation bar with updated theme */}
      <div className="absolute top-0 w-full px-6 py-4 flex justify-between items-center z-[100]">
        <div className="text-xl font-bold text-white flex items-center cursor-pointer" onClick={() => window.location.href = '/'}>
          <Home size={20} className="mr-2 text-teal-400" />
          <span className="text-teal-400">Kaspa</span> Portal
        </div>
        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => window.location.href = '/swap'}
            className="flex items-center bg-teal-800 hover:bg-teal-700 text-white px-3 py-1 rounded transition-colors"
          >
            <Repeat size={16} className="mr-1" />
            Swap
          </button>
          <button
            onClick={() => window.open('/whitepaper.html', '_blank')}
            className="flex items-center bg-purple-800 hover:bg-purple-700 text-white px-3 py-1 rounded transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
            </svg>
            Research Paper
          </button>
        </div>

      </div>

      {/* Main portal interface with enhanced design */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Enhanced background effects with teal/purple theme */}
        <div className="absolute w-96 h-96 rounded-full border-2 border-teal-500/30 opacity-30 animate-pulse"></div>
        <div className="absolute w-80 h-80 rounded-full border-2 border-purple-400/40 opacity-40" style={{ animation: 'ping 4s infinite' }}></div>

        {/* Enhanced ripple effects */}
        <div className="absolute w-72 h-72 rounded-full border border-teal-400/40 opacity-40" style={{ animation: 'ripple 3s infinite' }}></div>
        <div className="absolute w-64 h-64 rounded-full border border-purple-500/30 opacity-30" style={{ animation: 'ripple 4s infinite 1s' }}></div>

        {/* Enhanced vortex effect */}
        <div className="absolute w-56 h-56 rounded-full border border-teal-300/50" style={{ animation: 'rotate3D 15s linear infinite' }}></div>
        <div className="absolute w-48 h-48 rounded-full border border-purple-400/50" style={{ animation: 'rotate3D 10s linear infinite reverse' }}></div>

        {/* Enhanced rotating outer ring */}
        <div className="absolute w-[450px] h-[450px] rounded-full border border-teal-300/30 border-dashed" style={{ animation: 'spin 30s linear infinite' }}></div>

        {/* Enhanced orbiting elements with teal/purple theme */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`orbit-element-${i}`}
            className={`absolute w-2 h-2 rounded-full ${i % 2 === 0 ? 'bg-teal-400/50' : 'bg-purple-400/50'}`}
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${i * 45}deg) translateX(${120 + i * 20}px) translateY(-50%)`,
              animation: `orbit ${8 + i}s linear infinite`
            }}
          />
        ))}

        {/* Protocol nodes */}
        {Object.entries(protocols).map(([key, protocol]) => (
          <React.Fragment key={key}>
            {/* Energy beam connection line */}
            <div
              className="absolute left-1/2 top-1/2 h-1.5 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-teal-400 to-transparent animate-pulse"
              style={{
                width: '180px',
                transformOrigin: 'left center',
                transform: `translateX(-50%) translateY(-50%) rotate(${Object.keys(protocols).indexOf(key) * 90}deg)`,
                opacity: activeProtocol === key ? 0.9 : 0.6,
                filter: activeProtocol === key ? 'drop-shadow(0 0 6px rgba(45, 212, 191, 0.7))' : 'none'
              }}
            ></div>

            {/* Protocol node */}
            <div
              id={`protocol-${key}`}
              className="absolute group flex flex-col items-center justify-center cursor-pointer transition-all duration-300 z-20"
              style={{
                ...protocol.position,
                transform: 'translate(-50%, -50%)',
                width: '80px',
                height: 'auto'
              }}
              onClick={() => handleProtocolClick(key)}
            >
              {/* Icon container */}
              <div className={`w-16 h-16 rounded-full flex items-center justify-center
                            bg-gradient-to-br ${protocol.color}
                            border-2 ${activeProtocol === key ? 'border-teal-400 shadow-teal-500/60' : 'border-teal-600/50'}
                            shadow-lg shadow-teal-900/50
                            transition-all duration-300
                            hover:scale-110 hover:shadow-xl hover:shadow-teal-500/40
                            ${activeProtocol === key ? 'scale-110 shadow-xl' : 'scale-100'}`}>
                {protocol.icon}
              </div>

              {/* Label */}
              <span className="text-teal-200 text-xs mt-2 font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                {protocol.name}
              </span>
            </div>
          </React.Fragment>
        ))}

        {/* Central portal */}
        <div className="relative w-32 h-32 rounded-full z-30 cursor-pointer group" onClick={() => setShowBetaForm(true)}>
          {/* Portal core */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-400/30 to-purple-600/30 animate-pulse"></div>
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-teal-300/50 to-purple-500/50 animate-spin" style={{ animationDuration: '8s' }}></div>
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white/80 to-teal-200/80 group-hover:scale-110 transition-transform"></div>

          {/* Alpha access indicator */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-teal-800 opacity-70 group-hover:opacity-100 transition-opacity">
              ALPHA
            </span>
          </div>
        </div>
      </div>

      {/* Protocol panels */}
      {activeProtocol && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-sm border border-teal-500/30 rounded-lg p-6 w-96 z-50">
          <h3 className="text-teal-400 text-lg font-bold mb-4">{protocols[activeProtocol].name}</h3>

          {activeProtocol === 'send' && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Recipient Address"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                className="w-full bg-gray-800 border border-teal-600/50 rounded px-3 py-2 text-white"
              />
              <input
                type="number"
                placeholder="Amount (KAS)"
                value={sendAmount}
                onChange={(e) => setSendAmount(e.target.value)}
                className="w-full bg-gray-800 border border-teal-600/50 rounded px-3 py-2 text-white"
              />
              <button
                className="w-full bg-gradient-to-r from-teal-500 to-purple-500 hover:from-teal-400 hover:to-purple-400 text-white py-2 rounded transition-all"
                disabled={isSendingKas}
              >
                {isSendingKas ? 'Sending...' : 'Send KAS'}
              </button>
            </div>
          )}

        </div>
      )}

      {/* Wallet info panel */}
      {connected && (
        <div className="absolute top-20 right-6 bg-gray-900/95 backdrop-blur-sm border border-teal-500/30 rounded-lg p-4 w-64 z-50">
          <h3 className="text-teal-400 font-bold mb-2">Wallet</h3>
          <p className="text-white text-sm mb-1">Address: {address.slice(0, 8)}...{address.slice(-8)}</p>
          <p className="text-white text-sm">Balance: {(balance.total / 100000000).toFixed(4)} KAS</p>
        </div>
      )}

      {/* Beta Test Form */}
      <BetaTestForm
        isVisible={showBetaForm}
        onClose={() => setShowBetaForm(false)}
      />


      {/* CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes ripple {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes rotate3D {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(var(--radius, 120px)) translateY(-50%); }
          100% { transform: rotate(360deg) translateX(var(--radius, 120px)) translateY(-50%); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Kasportal;
