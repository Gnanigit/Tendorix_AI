
import React from 'react';
import Logo from './Logo';

const NavBar = () => {
  return (
    <header className="w-full gradient-purple py-4 px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Logo />
        <nav className="hidden md:flex space-x-8">
          <a href="/" className="text-white hover:text-white/80 transition-colors">Home</a>
          <a href="/compare" className="text-white hover:text-white/80 transition-colors">Compare Files</a>
          <a href="/history" className="text-white hover:text-white/80 transition-colors">History</a>
        </nav>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-white text-brand-purple rounded-md font-medium hover:bg-opacity-90 transition-colors">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
