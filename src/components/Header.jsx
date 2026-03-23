import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          
          {/* Left Section */}
          <Link to='/'>
          <div className="flex items-center space-x-4 cursor-pointer">
            
            <div className="h-20 w-14 overflow-hidden rounded-md shadow-sm">
               <img 
                src="images/logo.png"
                alt="D Prime Assets" 
                className="h-full w-full object-cover" 
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-black text-slate-900 leading-none tracking-tight">
                D PRIME <span className="text-yellow-500">ASSETS</span>
              </h1>
              <p className="text-[10px] text-slate-500 tracking-[0.25em] font-bold uppercase mt-1">
                Real Estate Management
              </p>
            </div>
            
          </div>
          </Link>

          {/* Right Section */}
          <nav className="flex items-center space-x-12">
            <Link to='/'>
            <a href="#home" className="text-sm hidden sm:inline font-bold text-slate-700 hover:text-yellow-500 transition-all uppercase tracking-widest">
              Home
            </a>
            </Link>
            <Link to='/about'>
            <a href="#about" className="text-sm hidden sm:inline font-bold text-slate-700 hover:text-yellow-500 transition-all uppercase tracking-widest">
              About
            </a>
            </Link>
            <Link to='sign-in'>
            <a href="#sign-in" className="text-sm font-bold text-slate-700 hover:text-yellow-500 transition-all uppercase tracking-widest">
              Signin
            </a>
            </Link>
            <button className="bg-slate-900 text-white px-6 py-3 rounded-full text-xs font-bold hover:bg-yellow-500 hover:text-slate-900 transition-all shadow-lg">
              LIST PROPERTY
            </button>
          </nav>

        </div>
      </div>
    </header>
  );
};

export default Header;