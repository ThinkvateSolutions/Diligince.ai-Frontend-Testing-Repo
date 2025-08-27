<<<<<<< HEAD

=======
<<<<<<< HEAD
=======

>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
<<<<<<< HEAD
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
=======
<<<<<<< HEAD
      setScrolled(window.scrollY > 10);
>>>>>>> 9b0ce35 (Initial commit)
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

<<<<<<< HEAD
=======
=======
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

>>>>>>> 9b0ce35 (Initial commit)
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close mobile menu when route changes
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

<<<<<<< HEAD
=======
<<<<<<< HEAD
  const navLinkClass = (path: string) =>
    `text-white hover:text-blue-100 transition-colors ${
      location.pathname === path ? "text-blue-100 font-medium border-b border-blue-100" : ""
    }`;

>>>>>>> 9b0ce35 (Initial commit)
  return (
    <nav className={`w-full py-4 px-4 md:px-8 fixed top-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-blue-600 shadow-lg" : "bg-blue-600"
    }`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-white">
            Diligince.ai
          </Link>
        </div>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className={`text-white hover:text-blue-100 transition-colors ${location.pathname === '/' ? 'text-blue-100 font-medium border-b border-blue-100' : ''}`}>
            Home
          </Link>
          <Link to="/about" className={`text-white hover:text-blue-100 transition-colors ${location.pathname === '/about' ? 'text-blue-100 font-medium border-b border-blue-100' : ''}`}>
            About
          </Link>
          <Link to="/pricing" className={`text-white hover:text-blue-100 transition-colors ${location.pathname === '/pricing' ? 'text-blue-100 font-medium border-b border-blue-100' : ''}`}>
            Pricing
          </Link>
          <Link to="/contact" className={`text-white hover:text-blue-100 transition-colors ${location.pathname === '/contact' ? 'text-blue-100 font-medium border-b border-blue-100' : ''}`}>
            Contact
          </Link>
          <Button variant="outline" className="mr-2 bg-transparent border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-200" asChild>
            <Link to="/signin">Sign In</Link>
          </Button>
          <Button className="bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200" asChild>
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
<<<<<<< HEAD
          <Button variant="ghost" size="sm" onClick={toggleMenu} className="text-white hover:bg-blue-700">
=======
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:bg-blue-700"
          >
=======
  return (
    <nav className={`w-full py-4 px-4 md:px-8 fixed top-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-blue-600 shadow-lg" : "bg-blue-600"
    }`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-white">
            Diligince.ai
          </Link>
        </div>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className={`text-white hover:text-blue-100 transition-colors ${location.pathname === '/' ? 'text-blue-100 font-medium border-b border-blue-100' : ''}`}>
            Home
          </Link>
          <Link to="/about" className={`text-white hover:text-blue-100 transition-colors ${location.pathname === '/about' ? 'text-blue-100 font-medium border-b border-blue-100' : ''}`}>
            About
          </Link>
          <Link to="/pricing" className={`text-white hover:text-blue-100 transition-colors ${location.pathname === '/pricing' ? 'text-blue-100 font-medium border-b border-blue-100' : ''}`}>
            Pricing
          </Link>
          <Link to="/contact" className={`text-white hover:text-blue-100 transition-colors ${location.pathname === '/contact' ? 'text-blue-100 font-medium border-b border-blue-100' : ''}`}>
            Contact
          </Link>
          <Button variant="outline" className="mr-2 bg-transparent border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-200" asChild>
            <Link to="/signin">Sign In</Link>
          </Button>
          <Button className="bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200" asChild>
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button variant="ghost" size="sm" onClick={toggleMenu} className="text-white hover:bg-blue-700">
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>
<<<<<<< HEAD
      
      {/* Mobile navigation */}
=======
<<<<<<< HEAD

      {/* Mobile Menu */}
>>>>>>> 9b0ce35 (Initial commit)
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-blue-600 shadow-lg animate-fade-in border-t border-blue-500">
          <div className="flex flex-col py-4 px-4">
            <Link to="/" className={`py-2 text-white hover:text-blue-100 transition-colors ${location.pathname === '/' ? 'text-blue-100 font-medium' : ''}`}>
              Home
            </Link>
            <Link to="/about" className={`py-2 text-white hover:text-blue-100 transition-colors ${location.pathname === '/about' ? 'text-blue-100 font-medium' : ''}`}>
              About
            </Link>
            <Link to="/pricing" className={`py-2 text-white hover:text-blue-100 transition-colors ${location.pathname === '/pricing' ? 'text-blue-100 font-medium' : ''}`}>
              Pricing
            </Link>
            <Link to="/contact" className={`py-2 text-white hover:text-blue-100 transition-colors ${location.pathname === '/contact' ? 'text-blue-100 font-medium' : ''}`}>
              Contact
            </Link>
            <div className="flex flex-col space-y-2 mt-4">
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600" asChild>
                <Link to="/signin">Log In</Link>
              </Button>
<<<<<<< HEAD
              <Button className="bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700" asChild>
=======
              <Button
                className="bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                asChild
              >
=======
      
      {/* Mobile navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-blue-600 shadow-lg animate-fade-in border-t border-blue-500">
          <div className="flex flex-col py-4 px-4">
            <Link to="/" className={`py-2 text-white hover:text-blue-100 transition-colors ${location.pathname === '/' ? 'text-blue-100 font-medium' : ''}`}>
              Home
            </Link>
            <Link to="/about" className={`py-2 text-white hover:text-blue-100 transition-colors ${location.pathname === '/about' ? 'text-blue-100 font-medium' : ''}`}>
              About
            </Link>
            <Link to="/pricing" className={`py-2 text-white hover:text-blue-100 transition-colors ${location.pathname === '/pricing' ? 'text-blue-100 font-medium' : ''}`}>
              Pricing
            </Link>
            <Link to="/contact" className={`py-2 text-white hover:text-blue-100 transition-colors ${location.pathname === '/contact' ? 'text-blue-100 font-medium' : ''}`}>
              Contact
            </Link>
            <div className="flex flex-col space-y-2 mt-4">
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600" asChild>
                <Link to="/signin">Log In</Link>
              </Button>
              <Button className="bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700" asChild>
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
