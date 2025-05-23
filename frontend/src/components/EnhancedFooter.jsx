import React from 'react';
import Twitter from 'lucide-react/dist/esm/icons/twitter';
import Github from 'lucide-react/dist/esm/icons/github';
import Send from 'lucide-react/dist/esm/icons/send';
import DiscordIcon from './DiscordIcon';

const EnhancedFooter = () => {
    const socialLinks = [
        { name: "Twitter", icon: <Twitter size={20} />, href: "https://x.com/PORTAL_KAS", ariaLabel: "Follow us on Twitter" },
        { name: "GitHub", icon: <Github size={20} />, href: "https://github.com/GhostDevs", ariaLabel: "View our GitHub" },
        { name: "Discord", icon: <DiscordIcon size={20} />, href: "https://discord.gg/kaspa", ariaLabel: "Join our Discord server" },
        { name: "Telegram", icon: <Send size={20} />, href: "https://t.me/+LJanxsRyV645OWUx", ariaLabel: "Join our Telegram group" }
    ];

    return (
        <footer className="bg-black py-12 border-t border-green-400/10 relative">
            {/* Subtle grid background */}
            <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none"></div>

            <div className="mx-auto max-w-6xl px-4 flex flex-col items-center space-y-8 md:flex-row md:justify-between md:space-y-0">
                <div className="flex items-center group">
                    <span className="text-2xl font-bold text-green-400">Kaspa</span>
                    <span className="text-2xl font-bold text-white ml-2">Portal</span>
                    <div className="ml-2 h-4 w-4 rounded-full bg-green-400/20 group-hover:bg-green-400/40 transition-all duration-300"></div>
                </div>

                <nav className="flex flex-wrap justify-center gap-8" aria-label="Footer navigation">
                    <a href="#features" className="hover:text-green-400 transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-green-400 after:transition-all hover:after:w-full">Features</a>
                    <a href="#roadmap" className="hover:text-green-400 transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-green-400 after:transition-all hover:after:w-full">Roadmap</a>
                    <a href="https://kaspa.org" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-green-400 after:transition-all hover:after:w-full">Kaspa.org</a>
                </nav>

                <div className="flex space-x-6">
                    {socialLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={link.ariaLabel}
                            className="text-white opacity-80 hover:opacity-100 hover:text-green-400 transition-all duration-300 transform hover:scale-110 p-2 bg-green-900/30 rounded-full"
                        >
                            <span className="sr-only">{link.name}</span>
                            {link.icon}
                        </a>
                    ))}
                </div>
            </div>

            <div className="mt-12 text-center text-sm text-gray-500">
                <p>© {new Date().getFullYear()} Ghost Devs. All rights reserved.</p>
                <p className="mt-1">Not affiliated with the Kaspa Foundation.</p>
            </div>
        </footer>
    );
};

export default EnhancedFooter;
