// components/Navbar.tsx
import React, { useState } from "react";
import { Ticket, Menu, X } from "lucide-react";
import ConnectWallet from "./wallet-connect";
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
              <Ticket className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              StacksEvents
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              How it Works
            </a>
            <a
              href="#events"
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              Events
            </a>
          </div>

          {/* Wallet Connection - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <ConnectWallet /> {/* ✅ Use the component */}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <a
                href="#features"
                className="text-gray-700 hover:text-purple-600 transition-colors px-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-700 hover:text-purple-600 transition-colors px-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How it Works
              </a>
              <a
                href="#events"
                className="text-gray-700 hover:text-purple-600 transition-colors px-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Events
              </a>
              <div className="px-4 pt-4 border-t border-gray-200">
                <ConnectWallet /> 
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
