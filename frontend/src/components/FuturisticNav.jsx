import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Repeat, Link2, BookOpen, Sparkles, Activity } from 'lucide-react';

const FuturisticNav = ({ protocols, activeProtocol, onProtocolClick }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Toggle menu
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuOpen &&
                !event.target.closest('.mobile-menu-button') &&
                !event.target.closest('.mobile-menu')
            ) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [menuOpen]);

    // Close menu when route changes
    useEffect(() => {
        setMenuOpen(false);
    }, [activeProtocol]);

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={toggleMenu}
                className="mobile-menu-button md:hidden fixed top-4 right-4 z-[999] p-3 rounded-xl bg-gradient-to-r from-teal-500/20 to-purple-500/20 backdrop-blur-md border border-teal-400/30 shadow-lg transition-all duration-300 hover:scale-105"
                aria-label="Toggle menu"
            >
                <div className="relative w-6 h-6">
                    <span className={`absolute block h-0.5 w-6 bg-gradient-to-r from-teal-400 to-purple-400 transform transition-all duration-300 ${menuOpen ? 'rotate-45 top-3' : 'top-1'}`} />
                    <span className={`absolute block h-0.5 w-6 bg-gradient-to-r from-teal-400 to-purple-400 top-3 transition-all duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
                    <span className={`absolute block h-0.5 w-6 bg-gradient-to-r from-teal-400 to-purple-400 transform transition-all duration-300 ${menuOpen ? '-rotate-45 top-3' : 'top-5'}`} />
                </div>
            </button>

            {/* Desktop Navigation */}
            <nav
                className={`hidden md:flex fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? 'py-3' : 'py-4'} backdrop-blur-xl border-b`}
                style={{ backgroundColor: 'var(--primary-bg)', borderColor: 'var(--border-color)' }}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between w-full">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div>
                            <img
                                src="/icons/logo.png"
                                alt="Kasportal"
                                className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-110 hover:scale-105 drop-shadow-2xl"
                            />
                        </div>
                        <h2 className="text-2xl font-bold text-black">
                            Kasportal
                        </h2>
                    </Link>

                    {/* Navigation Items */}
                    <div className="flex items-center gap-2">
                        {protocols.map((protocol) => (
                            <Link
                                key={protocol.key}
                                to={protocol.path}
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                onMouseEnter={() => setHoveredItem(protocol.key)}
                                onMouseLeave={() => setHoveredItem(null)}
                                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 ${activeProtocol === protocol.key ? 'text-white' : 'hover:text-white'}`}
                                style={{ color: activeProtocol === protocol.key ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                            >
                                {/* Background gradient */}
                                <div
                                    className={`absolute inset-0 rounded-xl transition-all duration-300 ${activeProtocol === protocol.key
                                        ? 'opacity-100'
                                        : hoveredItem === protocol.key
                                            ? 'opacity-100'
                                            : 'opacity-0'
                                        }`}
                                    style={{
                                        background:
                                            activeProtocol === protocol.key
                                                ? 'linear-gradient(to right, rgba(var(--accent-primary-rgb-values), 0.3), rgba(var(--accent-secondary-rgb-values), 0.3))'
                                                : hoveredItem === protocol.key
                                                    ? 'linear-gradient(to right, rgba(var(--accent-primary-rgb-values), 0.2), rgba(var(--accent-secondary-rgb-values), 0.2))'
                                                    : 'none'
                                    }}
                                />

                                {/* Border glow */}
                                <div
                                    className={`absolute inset-0 rounded-xl transition-all duration-300 ${activeProtocol === protocol.key ? 'opacity-100' : 'opacity-0'}`}
                                    style={{ padding: '1px', background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))' }}
                                >
                                    <div className="w-full h-full rounded-xl" style={{ backgroundColor: 'var(--primary-bg)' }} />
                                </div>

                                {/* Content */}
                                <div className="relative z-10 flex items-center gap-2">
                                    <span style={{ color: activeProtocol === protocol.key ? 'var(--accent-primary)' : 'var(--text-secondary)' }}>
                                        {protocol.icon}
                                    </span>
                                    <span className="font-medium">{protocol.label}</span>
                                </div>

                                {/* Active indicator */}
                                {activeProtocol === protocol.key && (
                                    <div
                                        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 rounded-full"
                                        style={{ background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))' }}
                                    />
                                )}

                                {/* Hover particles */}
                                {hoveredItem === protocol.key && (
                                    <div className="absolute inset-0 pointer-events-none">
                                        {[...Array(3)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="absolute w-1 h-1 rounded-full animate-ping"
                                                style={{
                                                    left: `${20 + i * 30}%`,
                                                    top: '50%',
                                                    animationDelay: `${i * 0.2}s`,
                                                    animationDuration: '1.5s',
                                                    backgroundColor: 'var(--accent-primary)'
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation */}
            <nav
                className={`mobile-menu md:hidden fixed inset-0 backdrop-blur-xl z-[990] transition-all duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                style={{ backgroundColor: 'rgba(var(--primary-bg-rgb-values), 0.95)' }}
            >
                <div className="flex flex-col items-center justify-center text-center h-full space-y-6 py-16 px-4 overflow-y-auto">
                    {/* Mobile Logo */}
                    <div className="mb-8 flex flex-col items-center">
                        <img
                            src="/icons/logo.png"
                            alt="Kasportal"
                            className="w-20 h-20 mx-auto mb-2 hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
                        />
                        <h2 className="text-2xl font-bold text-black">Kasportal</h2>
                    </div>

                    {/* Navigation Items */}
                    <a
                        className="relative flex items-center justify-center w-full max-w-xs px-6 py-4 rounded-xl transition-all duration-300 transform hover:scale-105"
                        href="/"
                        data-discover="true"
                        style={{
                            animationDelay: `0s`,
                            backgroundColor: 'rgba(var(--accent-primary-rgb-values), 0.3)',
                            color: 'var(--text-primary)',
                            backgroundImage: 'linear-gradient(to right, rgba(var(--accent-primary-rgb-values), 0.3), rgba(var(--accent-secondary-rgb-values), 0.3))'
                        }}
                    >
                        <div
                            className="absolute inset-0 rounded-xl blur-xl"
                            style={{
                                background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))',
                                opacity: 0.2
                            }}
                        />
                        <div className="relative z-10 flex items-center gap-3">
                            <span style={{ color: 'var(--accent-primary)' }}>
                                {/* Insert Home SVG icon here */}
                            </span>
                            <span className="text-xl font-medium">Home</span>
                        </div>
                    </a>

                    <a
                        className="relative flex items-center justify-center w-full max-w-xs px-6 py-4 rounded-xl transition-all duration-300 transform hover:scale-105"
                        href="/features/token-swapping"
                        data-discover="true"
                        style={{
                            animationDelay: `0.1s`,
                            backgroundColor: 'transparent',
                            color: 'var(--text-secondary)',
                            backgroundImage: 'none'
                        }}
                    >
                        <div className="relative z-10 flex items-center gap-3">
                            <span style={{ color: 'var(--text-secondary)' }}>
                                {/* Insert Token Swapping SVG icon here */}
                            </span>
                            <span className="text-xl font-medium">Token Swapping</span>
                        </div>
                    </a>

                    <a
                        className="relative flex items-center justify-center w-full max-w-xs px-6 py-4 rounded-xl transition-all duration-300 transform hover:scale-105"
                        href="/features/cross-chain-compatibility"
                        data-discover="true"
                        style={{
                            animationDelay: `0.2s`,
                            backgroundColor: 'transparent',
                            color: 'var(--text-secondary)',
                            backgroundImage: 'none'
                        }}
                    >
                        <div className="relative z-10 flex items-center gap-3">
                            <span style={{ color: 'var(--text-secondary)' }}>
                                {/* Insert Cross Chain SVG icon here */}
                            </span>
                            <span className="text-xl font-medium">Cross Chain</span>
                        </div>
                    </a>

                    <a
                        className="relative flex items-center justify-center w-full max-w-xs px-6 py-4 rounded-xl transition-all duration-300 transform hover:scale-105"
                        href="/learn"
                        data-discover="true"
                        style={{
                            animationDelay: `0.3s`,
                            backgroundColor: 'transparent',
                            color: 'var(--text-secondary)',
                            backgroundImage: 'none'
                        }}
                    >
                        <div className="relative z-10 flex items-center gap-3">
                            <span style={{ color: 'var(--text-secondary)' }}>
                                {/* Insert Learn SVG icon here */}
                            </span>
                            <span className="text-xl font-medium">Learn</span>
                        </div>
                    </a>
                </div>
            </nav>

            {/* Animated background line */}
            <div className="fixed top-0 left-0 right-0 h-px opacity-50 z-30"
                style={{ background: 'linear-gradient(to right, transparent, var(--accent-primary), transparent)' }}>
                <div className="h-full w-1/3 animate-slide"
                    style={{ background: 'linear-gradient(to right, transparent, var(--accent-secondary), transparent)' }} />
            </div>

            <style>{`
                @keyframes slide {
                  0% { transform: translateX(-100%); }
                  100% { transform: translateX(400%); }
                }
                
                .animate-slide {
                  animation: slide 3s linear infinite;
                }
            `}</style>
        </>
    );
};

export default FuturisticNav;
