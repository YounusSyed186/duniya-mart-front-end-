import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, ShoppingCart, User } from 'lucide-react';
import { Notifications } from '../notifications/Notifications';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const dashboardRef = useRef(null);

  // Check if user is logged in
  const user = localStorage.getItem('user');

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dashboardRef.current && !dashboardRef.current.contains(event.target)) {
        setIsDashboardOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const handleDashboardSelect = (path) => {
    setIsDashboardOpen(false);
    navigate(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-green-600">DuniyaMart</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="text-gray-700 hover:text-green-600">Products</Link>
            <Link to="/sellers" className="text-gray-700 hover:text-green-600">Sellers</Link>
            <Link to="/about" className="text-gray-700 hover:text-green-600">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-green-600">Contact</Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart */}
            <Link to="/cart" className="p-2 rounded-lg hover:bg-gray-100">
              <ShoppingCart className="h-6 w-6" />
            </Link>

            {/* Show dashboard/profile dropdown if logged in, else show Login button */}
            {user ? (
              <div className="relative" ref={dashboardRef}>
                <button
                  className="flex items-center space-x-1 p-2 rounded-lg hover:bg-gray-100"
                  onClick={() => setIsDashboardOpen(!isDashboardOpen)}
                >
                  <User className="h-6 w-6" />
                </button>
                {isDashboardOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <button
                      onClick={() => handleDashboardSelect('/retailer/dashboard')}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => handleDashboardSelect('/profile')}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => handleDashboardSelect('/settings')}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Settings
                    </button>
                    <hr className="my-2" />
                    <button
                      onClick={() => handleDashboardSelect('/logout')}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="p-2 rounded-lg hover:bg-gray-100 text-green-600 font-semibold">
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Search className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </form>

            {/* Mobile Navigation */}
            <nav className="space-y-4">
              <Link to="/products" className="block text-gray-700 hover:text-green-600" onClick={() => setIsMenuOpen(false)}>Products</Link>
              <Link to="/sellers" className="block text-gray-700 hover:text-green-600" onClick={() => setIsMenuOpen(false)}>Sellers</Link>
              <Link to="/about" className="block text-gray-700 hover:text-green-600" onClick={() => setIsMenuOpen(false)}>About</Link>
              <Link to="/contact" className="block text-gray-700 hover:text-green-600" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              <hr className="my-2" />
              <Link to="/cart" className="block text-gray-700 hover:text-green-600" onClick={() => setIsMenuOpen(false)}>Cart</Link>
              <Link to="/notifications" className="block text-gray-700 hover:text-green-600" onClick={() => setIsMenuOpen(false)}>Notifications</Link>
              {user ? (
                <>
                  <Link to="/retailer/dashboard" className="block text-gray-700 hover:text-green-600" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                  <Link to="/profile" className="block text-gray-700 hover:text-green-600" onClick={() => setIsMenuOpen(false)}>Profile</Link>
                  <Link to="/settings" className="block text-gray-700 hover:text-green-600" onClick={() => setIsMenuOpen(false)}>Settings</Link>
                  <button className="block text-red-600 hover:text-red-700" onClick={() => { setIsMenuOpen(false); handleDashboardSelect('/logout'); }}>Logout</button>
                </>
              ) : (
                <Link to="/login" className="block text-green-600 hover:text-green-700 font-semibold" onClick={() => setIsMenuOpen(false)}>Login</Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
